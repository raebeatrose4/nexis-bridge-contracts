import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@typechain/hardhat";

import "./tasks/get-token-balance";
import "./tasks/bridge-token";
import "./tasks/configure";

const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const accounts = [
	process.env.PRIVATE_KEY
];

const config: any = {
	gasReporter: {
		enabled: true,
		token: "ETH",
		coinmarketcap: process.env.CMC_API_KEY || "",
	},
	networks: {	
		"fantom-testnet": {
			chainId: 4002,
			url: "https://rpc.testnet.fantom.network",
			live: false,
			accounts: accounts,
		},
		"nexis-testnet": {
			chainId: 2370,
			url: "https://evm-testnet.nexis.network",
			live: false,
			accounts: accounts,
		},
		"bnb-testnet": {
			chainId: 97,
			url: "https://data-seed-prebsc-1-s1.binance.org:8545",
			live: false,
			accounts: accounts,
		},
		"eth-sepolia": {
			chainId: 11155111,
			url: "https://ethereum-sepolia-rpc.publicnode.com",
			live: false,
			accounts: accounts,
		},
		hardhat: {
			live: false,
			deploy: ["deploy/hardhat/"],
		},
	},
	namedAccounts: {
		deployer: 0,
		accountant: 1,
	},
	solidity: {
		compilers: [
			{
				version: "0.8.17",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200,
					},
				},
			},
		],
	},
};

export default config;
