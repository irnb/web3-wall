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
	forge create ./src/Wall.sol:Wall --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --constructor-args-path ./args --rpc-url http://127.0.0.1:8545
	@echo "check the anvil server consol for the account address and private key for local node"