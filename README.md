# Warhammer Gameplan

Refer to the [Notion Doc](https://www.notion.so/hamgames/Warhammer-Gameplan-44f28933c8e04718b88b9a04ef6f4670) for more information.

## Running this repo

This is a monorepo using [Lerna](https://lerna.js.org/).
`lerna bootstrap` should install front and back end dependencies.

From the root folder, running `npm run [fe|be|all]` will spin up parts/all of the project.

## Tests

Currently tests are implemented in the backend via mocha and mockgoose. `npm run be-test` will run those tests.
