## Installation
### Fetch the latest version of Meilisearch image from DockerHub
```
docker pull getmeili/meilisearch:v1.9
```

### Launch Meilisearch in development mode with a master key
```
docker run -it --rm -p 7700:7700 -e MEILI_ENV='development' -v $(pwd)/meili_data:/meili_data getmeili/meilisearch:v1.9

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
