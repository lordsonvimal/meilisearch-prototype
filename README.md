## Installation

### Prerequisites
Install node
Install yarn

### Fetch the latest version of Meilisearch image from DockerHub
```
docker pull getmeili/meilisearch:v1.9
```

### Launch Meilisearch in development mode with a master key
```
docker run -it --rm -p 7700:7700 -e MEILI_ENV='development' -v $(pwd)/meili_data:/meili_data getmeili/meilisearch:v1.9

```

### Install and run Ollama
Download Ollama in your local. Following docker commands does not work now, use direct Ollama installation for now.

```
docker pull ollama/ollama
docker run -d --net=host -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

### Pull a model for Ollama
```
docker exec -it ollama ollama run llama3
```

```
launchctl setenv OLLAMA_HOST "0.0.0.0"

// To view ollama logs
tail -f ~/.ollama/logs/server.log
```


### Update semantic search embedders in meilisearch to use Ollama
Get the ip address of the ollama host (LOCALHOST for now) and update in `semanticSearch.mjs`

```
yarn semantic
```

### Install backend and frontend dependencies
```
yarn install
```

### Index the seach engine with faceted search filters
```
yarn index
```

### Run frontend server
```
yarn start
```

The meilisearch server can be accessed via `http://0.0.0.0:7700/`
The web app can be accessed via `http://localhost:5173/`


### Python venv
pyenv install 3.9.7
pyenv virtualenv 3.9.7 semantic_search
pyenv local semantic_search
pip install -r requirements.txt

Other approach:
python3.9 -m venv semantic-search
source env/bin/activate
pip list
pip freeze > requirements.txt
pip install -r requirements.txt
deactivate
