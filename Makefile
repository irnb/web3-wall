node:
	@echo "running anvil server"
	@echo "if you are not install foundry, check this link: https://getfoundry.sh"
	anvil 

dev:
	@echo "running developer environment"
	@echo "run 'make node' to start anvil server before running this command"
	forge install
	forge build
	forge test
	forge create ./contract/src/Wall.sol:Wall --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --constructor-args-path ./args --rpc-url http://127.0.0.1:8545
	@echo "check the anvil server consol for the account address and private key for local node"

deploy:
	@echo "Enter the contract filename and contract name (e.g., MyContract.sol:MyContract): "; \
	read contract_name ; \
	echo "Do you want to deploy on localhost? [yes/no]: " ; \
	read deploy_local ; \
	if [ "$$deploy_local" = "yes" ]; then \
		echo "Please make sure you have a local network running on port 8545 (run 'make anvil' in a separate terminal)"; \
		echo "Enter the path to the constructor arguments file (e.g., ./.args): "; \
		read args_path; \
		echo "Enter your private key: "; \
		read private_key; \
		echo "Deploying on localhost"; \
		forge create contract/src/$$contract_name --rpc-url http://localhost:8545 --private-key $$private_key --constructor-args-path $$args_path; \
	else \
		echo "Enter the RPC URL: "; \
		read rpc_url; \
		echo "Enter the Chain ID: "; \
		read chain_id; \
		echo "Enter your etherscan API key: "; \
		read etherscan_api_key; \
		echo "Enter the path to the constructor arguments file (e.g., ./args): "; \
		read args_path; \
		echo "Enter your private key: "; \
		read private_key; \
		echo "========================================================" >> deploy_history.txt; \
		echo "Deployment Date: `date` \n" >> deploy_history.txt; \
		echo "Deploying on a different network"; \
		forge create contract/src/$$contract_name --rpc-url $$rpc_url  --private-key $$private_key --constructor-args-path $$args_path --etherscan-api-key $$etherscan_api_key --verify --chain-id $$chain_id | tee -a deploy_history.txt ;\
		echo "Constructor Arguments: " >> deploy_history.txt; \
		cat $$args_path >> deploy_history.txt; \
		echo "\nEnter the deployment note: "; \
		read deployment_details; \
		echo "\nDeployment Note: $$deployment_details" >> deploy_history.txt; \
	fi
