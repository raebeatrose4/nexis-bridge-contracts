import { task } from "hardhat/config";
const chainsConfig = require('@cryptolink/contracts/config/chains');
const networks = require("../networks-testnet.json");

const fs = require('fs');

task("configure", "")
	.addOptionalParam("signer", "Custom signer (private key)")
	.addOptionalParam("provider", "Custom provider RPC url")
	.setAction(async (args, hre:any) => {
		const ethers = hre.ethers;
		const [deployer] = await ethers.getSigners();

		let signer = deployer;
		if (args.signer) signer = new ethers.Wallet(args.signer, new ethers.providers.JsonRpcProvider(args.provider));
		
		let addresses = [];
		let chainids = [];
		let confirmations=[];
		for(let x=0; x < networks.length; x++) {
			const nexisBridge = require(process.cwd()+"/deployments/"+networks[x]+"/NexisBridge.json");
			const chainId = fs.readFileSync(process.cwd()+"/deployments/"+networks[x]+"/.chainId").toString();
			addresses.push(nexisBridge.address);
			chainids.push(chainId);
			confirmations.push(1);
		}
	
		console.log('setting remote contract addresses .. CLT message address:', chainsConfig[hre.network.config.chainId].message);
		const nexisBridge = await ethers.getContract("NexisBridge");
		await (await nexisBridge.configureClient(chainsConfig[hre.network.config.chainId].message, chainids, addresses, confirmations)).wait();
	});
