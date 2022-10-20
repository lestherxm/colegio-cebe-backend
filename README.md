# COLEGIO CEBE BACKEND

#### How can u try this API?

###### `-` Step One. Create the `docker container` (it will create both db and tables):
```
docker-compose up
```

###### `-` Step Two. Start the service:
```
npm start
```

###### If u wanna check the data directly in the PostgreSQL DB you can open a terminal on `docker desktop` and enter with the following credentials
```
psql -U root -d cebe -h localhost
```

###### You can verify the EndPoints using Thunder Client extension on VSCODE importing the collections file which is in this project as `thunder-collection_colegio-cebe-backend.json`
![Importing collections step one](https://github.com/lestherxm/colegio-cebe-backend/blob/main/docs/import-collections-1.png?raw=true)
![Importing collections step two](https://github.com/lestherxm/colegio-cebe-backend/blob/main/docs/import-collections-2.png?raw=true)




