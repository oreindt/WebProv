<!--
TODO
Usage / additional information
Local development (quickest way to see the app working)
Local deployment
Structure of the software
Heroku & Netlify Deployment
 -->

# WebProv

WebProv is a web-based editor to record the provenance of simulation studies. 
The software was originally developed by Jakob Smith and Kai Budde. Please see the [original project page](https://github.com/SFB-ELAINE/WebProv).

This is an extended version of WebProv developed for the paper "Simulation Studies of Social Systems – Telling the Story Based on Provenance" by Oliver Reinhardt, Toby Prike, Martin Hinsch, Jakub Bijak, Adelinde M. Uhrmacher.

## Integrating Provenance Information into WebProv

Once all provenance information of a simulation study has been collected (or while doing so), this information can be included in WebProv. 
First, a user needs to create a study, which requires a name (usually the last name of first author and year of publication) as well as a reference to the simulation study (e.g., a journal article). 

Next, one may add nodes and connect these nodes (right click to draw a connection). The nodes can be entities or activities. Each node requires meta-information as requested by our ontology. A label is automatically assigned to a node. They are consecutively numbered within one study.

Besides creating provenance graphs and entering provenance information one can also download or upload entire graphs as JSON. The export function only exports the visible graph and not everything that is stored in the Neo4J database.

More information is available when clickling on the "+" in the lower right corner and then on the "i" ("show help").

Existing provenance data can be imported by clicking on the "+" and selecting "Import Graph from JSON".

## Environment Setup

### 1. Node

The first step to setting up your environment involves installing `Node.js` (if not already installed). The recommended way to do this is by using the `Node Version Manager` tool:

1. Install [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm#install--update-script)
1. Install `Node.js` and `npm` using nvm: `nvm install node`

### 2. Docker

Next, install `Docker` so that you can start the `Neo4j` development database. The installation instructions can be found [here](https://docs.docker.com/get-docker).

### 3. Environment File

In `packages/backend`, create a `.env` file if you don't already have one:

```
GRAPHENEDB_BOLT_URL=bolt://localhost:7687
GRAPHENEDB_BOLT_USER=neo4j
GRAPHENEDB_BOLT_PASSWORD=<PASSWORD>
```

Replace `<PASSWORD>` with the password that you want to use for development and save it for later.

### 4. NPM Dependencies

This repository uses [lerna](https://lerna.js.org/) as it is a monorepo. All packages are located within the `packages` folder. The main benefit of lerna is that it can symlink repos together when one package depends on another within the same repository. Because there is symlinking involved, you must use lerna to install dependencies. Because we have a `postinstall` script defined in the `package.json` folder, the only command that you have to run is to install and symlink everything is:

```
npm install
```

## Development

Before you can start developing, make sure that the database is running:

```
# Optionally add -d to run in the background
docker run -p7474:7474 -p7687:7687 -e NEO4J_AUTH=neo4j/<PASSWORD> neo4j:latest
```

> Be sure to replace `<PASSWORD>` with your development password that you set above.

Next, to start the hot-reload development servers, create two terminals and run the `dev` command within the `frontend` and `backend` packages:

```
# make sure to cd into `packages/frontend` or `packages/backend`
make dev
```

Now you should be able to see the app running at [`http://localhost:8080`](http://localhost:8080).

> Make sure that you have the backend server running before opening the app.

## Structure

As mentioned above, the software uses `lerna` to manage the monorepo. All code is written in `TypeScript` and is located in three packages (`frontend`, `backend` and `common`).

### Common

`common` contains the shared code between the `frontend` and `backend` packages. This includes utility functions and shared `TypeScript` type definitions. Whenever changes are made to `common`, the package needs to be rebuilt so that changes are picked up by the frontend and backend.

- **index.ts**: Exports things from the other files.
- **backend.ts**: Contains the `TypeScript` type definition for the backend API.
- **neon.ts**: Contains `TypeScript` type helpers.
- **schemas.ts**: Contains `TypeScript` schemas for `Neo4j` built using `neon.ts`. Although `Neo4j` is schemaless, I built a type system to try to validate my code during compilation.
- **utils.ts**: Just utilities.

### Backend

The backend is a fairly basic [`express`](https://expressjs.com) app with CRUD endpoints for several node types and relationships. There is no authentication for this app which makes things a lot simpler!

- **index.ts**: Contains the `express` app initialization and all of the route definitions.
- **data.ts**: Contains the definitions for all of the nodes and relationships. These are created upon initialization if they haven't been created yet.
- **cypher.ts**: Contains [`Cypher`](https://neo4j.com/developer/cypher) utility functions that play nicely with my express app.

### Frontend

Finally, the frontend is a [`Vue`](https://vuejs.org) application split across numerous files. Below, I will outline the most important files.

- **hooks.ts**: A collection of Vue.js hooks using in `Visualizer.vue`.
- **d3.ts**: A collection of types for `D3.vue`.
- **backend.ts**: The interface to the backend. Based on `axios`.
- **components/D3.vue**: A wrapper around `d3` built for `Vue`. It manages all of the visualization & animation aspects of the application.
- **Visualizer.vue**: The file where everything comes together. It's responsibilities include kicking off the initial requests to the backend, managing state and managing actions.

## Dependencies

### Frontend

- [@types/d3](https://www.npmjs.com/package/@types/d3) (MIT)
- [@types/@types/lodash.debounce](https://www.npmjs.com/package/@types/@types/lodash.debounce) (MIT)
- [buefy](https://www.npmjs.com/package/buefy) (MIT)
- [core-js](https://www.npmjs.com/package/core-js) (MIT)
- [d3](https://www.npmjs.com/package/d3) (BSD 3-Clause)
- [fuse.js](https://www.npmjs.com/package/fuse.js) (Apache-2.0)
- [lodash.debounce](https://www.npmjs.com/package/lodash.debounce) (MIT)
- [vue](https://www.npmjs.com/package/vue) (MIT)
- [vue-function-api](https://www.npmjs.com/package/vue-function-api) (MIT)
- [@vue/cli-plugin-babel](https://www.npmjs.com/package/@vue/cli-plugin-babel) (MIT)
- [@vue/cli-plugin-typescript](https://www.npmjs.com/package/@vue/cli-plugin-typescript) (MIT)
- [@vue/cli-service](https://www.npmjs.com/package/@vue/cli-service) (MIT)
- [babel-core](https://www.npmjs.com/package/babel-core) (MIT)
- [svg-pan-zoom](https://www.npmjs.com/package/svg-pan-zoom) (BSD-2-Clause)
- [typescript](https://www.npmjs.com/package/typescript) (Apache-2.0)
- [vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler) (MIT)

### Backend

- [@types/cors](https://www.npmjs.com/package/@types/cors) (MIT)
- [@types/dotenv](https://www.npmjs.com/package/@types/dotenv) (MIT)
- [body-parser](https://www.npmjs.com/package/body-parser) (MIT)
- [cors](https://www.npmjs.com/package/cors) (MIT)
- [dotenv](https://www.npmjs.com/package/dotenv) (BSD-2-Clause)
- [express](https://www.npmjs.com/package/express) (MIT)
- [neo4j-driver](https://www.npmjs.com/package/neo4j-driver) (Apache-2.0)
- [restyped-express-async](https://www.npmjs.com/package/restyped-express-async) (MIT)
- [typescript](https://www.npmjs.com/package/typescript) (Apache-2.0)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) (MIT)

### Common

- [typescript](https://www.npmjs.com/package/typescript) (Apache-2.0)
- [fp-ts](https://www.npmjs.com/package/fp-ts) (MIT)
- [io-ts](https://www.npmjs.com/package/io-ts) (MIT)

## Acknowledgement

WebProv was originally develloped by Jakob Smith and Kai Budde. Please see the [original project page](https://github.com/SFB-ELAINE/WebProv).