# WarGamePlanner

Refer to the [Notion Doc](https://www.notion.so/hamgames/Warhammer-Gameplan-44f28933c8e04718b88b9a04ef6f4670) for more information.

## Running this repo

This is a monorepo using [Lerna](https://lerna.js.org/).
`npm i` in the root directory then run `npm run [fe|be|all]` will spin up parts/all of the project.
Both packages have `.env.example` that needs to be copied and edited to either `.env` on the BE and `.env.development.local` on the FE.

## Tests

Currently tests are implemented in the backend via `mocha` and `mongodb-memory-server`.
Frontend uses jest.

Run tests via `npm run [test|fe-test|be-test]`
