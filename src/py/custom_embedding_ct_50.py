import os
import json
import time
from dotenv import load_dotenv
from langchain_community.vectorstores import Meilisearch
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.schema import Document
import meilisearch
import torch
from transformers import AutoTokenizer, AutoModel

meilisearch_server = "http://localhost:7700/"
os.environ["MEILI_HTTP_ADDR"] = meilisearch_server
os.environ["MEILI_MASTER_KEY"] = "764d6db36d1a146212833f7338386929620f9e04ec7a8c6ee0d746d018036220"  
index_name = "ct_studies_50"
model_name = "sentence-transformers/all-MiniLM-L6-v2"
model_dimensions = 384
embedder_name = "custom"

client = meilisearch.Client(meilisearch_server)

index = client.index(index_name)

# Load the tokenizer and model from Hugging Face
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

start_time = time.time()

def generate_embedding(text):
    inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    # Mean pooling to get the sentence embedding
    embeddings = outputs.last_hidden_state.mean(dim=1).numpy()
    return embeddings.flatten().tolist()

index.update_filterable_attributes(["conditions", "phases", "organization_name", "lead_sponsor", "intervention_type"])

# Delete all documents
index.delete_all_documents()

with open("./data/ct-gov-50-studies.json", "r", encoding="utf-8") as file:
    data = json.load(file)

documents = []
for item in data["studies"]:
    nctId = item.get('protocolSection', {}).get('identificationModule', {}).get('nctId', '')
    org_full_name = item.get('protocolSection', {}).get('identificationModule', {}).get('organization', {}).get('fullName', "")
    official_title = item.get('protocolSection', {}).get('identificationModule', {}).get('officialTitle', '')
    phases = item.get('protocolSection', {}).get('designModule', {}).get('phases', [])
    phase_text = ','.join(phases)
    conditions = item.get('protocolSection', {}).get('conditionsModule', {}).get('conditions', [])
    condition_text = ','.join(conditions)
    eligibility_criteria = item.get('protocolSection', {}).get('eligibilityModule', {}).get('eligibilityCriteria', '')
    lead_sponsor = item.get('protocolSection', {}).get('sponsorCollaboratorsModule', {}).get('leadSponsor', {}).get('name', '')
    primary_outcomes = [outcome["measure"] for outcome in item.get('protocolSection', {}).get('outcomesModule', {}).get('primaryOutcomes', [])]
    secondary_outcomes = [outcome["measure"] for outcome in item.get('protocolSection', {}).get('outcomesModule', {}).get('secondaryOutcomes', [])]
    primary_outcomes_text = ",".join(primary_outcomes)
    secondary_outcomes_text = ",".join(secondary_outcomes)
    interventions = [intervention["name"] for intervention in item.get('protocolSection', {}).get('armsInterventionsModule', {}).get('interventions', [])]
    intervention_text = ",".join(interventions)
    intervention_types = [intervention["type"] for intervention in item.get('protocolSection', {}).get('armsInterventionsModule', {}).get('interventions', [])]
    intervention_type_text = ",".join(intervention_types)
    summary = item.get('protocolSection', {}).get('descriptionModule', {}).get('briefSummary', '')
    combined_text = f"A clinical trial study with nct id {nctId}. Orgaization of the study is {org_full_name}. The official title of the study is {official_title}.The phases of the study are {phase_text}. The study is to test the condition {condition_text}.The eligibility criteria of the study is {eligibility_criteria}. This study's lead sponsor is {lead_sponsor}. Primary outcomes of the study are {primary_outcomes_text}.Secondary outcomes of the study are {secondary_outcomes_text}. Arms interventions are {intervention_text} with type {intervention_type_text}. The summary of the study is {summary}."
    embedding = generate_embedding(combined_text)
    document = {
        "id": nctId,
        "organization_name": org_full_name,
        "title": official_title,
        "phases": phases,
        "conditions": conditions,
        "eligibility_criteria": eligibility_criteria,
        "lead_sponsor": lead_sponsor,
        "primary_outcomes": primary_outcomes,
        "secondary_outcomes": secondary_outcomes,
        "interventions": interventions,
        "intervention_types": intervention_types,
        "summary": summary,
        "_vectors": {
            "custom": embedding
        }
    }
    documents.append(document)

def add_documents_in_batches(docs, batch_size=100):
    for i in range(0, len(docs), batch_size):
        batch_docs = docs[i:i + batch_size]
        index.add_documents(batch_docs)

add_documents_in_batches(documents)

end_time = time.time()

print(f"completed in {end_time - start_time} seconds.")
