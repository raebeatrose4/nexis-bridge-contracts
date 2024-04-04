# Nexis Bridge

## Steps to run locally

1. Clone the repo

```bash
git clone https://github.com/raebeatrose4/nexis-bridge-contracts
```

2. Install Dependencies

```bash
cd nexis-bridge-contracts
yarn install
```

3. Add Private Key in .env

create a file named .env in root of `nexis-bridge-contracts`
```bash
PRIVATE_KEY=YOUR_PRIVATE_KEY
```

4. Deploy all contracts

```bash
npx hardhat --network nexis-testnet deploy
```

Add more networks in `networks-testnet.json` and in HH config

5. Configure Networks

After deployment of new contract always configure the Bridge

```bash
npx hardhat --network nexis-testnet configure
```

6. Get balance on the chain

```bash
npx hardhat --network nexis-testnet get-token-balance
```

7. Send token to destination chain

```bash
npx hardhat --network fantom-testnet bridge-token --dest 2370 --amount 50
```