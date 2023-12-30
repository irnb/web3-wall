# FarmWall

### Apps and Packages

- `contract`: containing smart contract
- `web`: [Next.js](https://nextjs.org/) app
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

## 1- Smart Contract

![System Design](./media/diagram-a.png)

WallNFT is a public decentralized platform implemented as a smart contract, that allows users to post messages on a "Wall". Each message is minted as a non-fungible token (NFT) based on the ERC721 standard. This approach not only ensures the uniqueness and ownership of each message, but also empowers the users with a measurable reputation in the form of NFT balances.

The platform incorporates a feature of "Pinning" a message. Users with sufficient reputation (NFT balance) or those willing to pay a fee can pin a message, making it more prominent. The platform also integrates with an AI engine. Each time a user creates a post, the AI engine generates an image for the post, which is then used as the art for the associated NFT.

## Deployment

this is a foundry project, so you can deploy it using the foundry cli:

```bash
forge create `contract_path:contract_name` --template --rpc-url `rpc_url` --private-key `private_key`
```

## Usage

- Using website (WIP)
- Using CLI (`client/cli/main.ts`)

### dev environment

(you need install foundry first)

```bash
cd contract

# this will start a local chain (anvil)
make node

# in another terminal
# this will install contract dependencies, compile, test and deploy the contract with constructor arguments in the `./args` file
make dev
```

You can also run the project from the root
(you need to install pnpm first)

```bash
pnpm install
turbo make:node
# in another terminal
turbo make:dev
```

## High level System Design

<!-- add diagram image -->

![System Design](./media/diagram-b.png)

![Contract Doc](./media/diagram-c.png)

## 2- Frontend

Next.js `./apps/web` application with TypeScript, Shadcn-UI, and WAGMI.

### Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Environment variables

Copy environment variable examples, create .env and .env.local files, and replace values.

### Build

```
1- turbo build
2- turbo start
```

### Develop

```
turbo dev
```
