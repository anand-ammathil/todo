# Todo CRUD APP

This a simple Todo list app, with two type of users ("ADMIN", "REGULAR").

Regular user is only capable of views the todos while Admin have the full CRUD capability.

for the sake of testing you can register as a ADMIN or REGULAR from fronted

# Running project for testing

Directory backend contain the node-express backend app
Directory fronted contain the react fronted app

## Backend

### Config

Database connection setting is in

**./backend/config/config.json**

Default port is 8080 you can change though 'SERVER_PORT' environment value or directly at

**./backend/bin/www**

### Running backend

```bash
cd backend
yarn install
npx sequelize-cli db:migrate
yarn run dev
```

## Frontend

### API config

api link is assigned though 'API_SERVER' environment value or directly at

**./frontend/src/utils/api.js**

### Running frontend

```bash
cd frontend
yarn install
yarn start
```
