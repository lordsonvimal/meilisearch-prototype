from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import AutoTokenizer, AutoModel

app = Flask(__name__)
CORS(app)

# Load the tokenizer and model from Hugging Face
model_name = "sentence-transformers/all-MiniLM-L6-v2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

def generate_embedding(text):
    inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    # Mean pooling to get the sentence embedding
    embeddings = outputs.last_hidden_state.mean(dim=1).numpy()
    return embeddings.flatten().tolist()

@app.route('/get_embedding', methods=['POST'])
def get_embedding():
    data = request.json
    if 'text' not in data:
        return jsonify({'error': 'Text field is required'}), 400

    text = data['text']
    embedding = generate_embedding(text)
    return jsonify({'embedding': embedding})

if __name__ == '__main__':
    app.run(host='localhost', port=5151)
