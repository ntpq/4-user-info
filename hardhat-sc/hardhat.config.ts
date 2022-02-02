/* eslint-disable @typescript-eslint/no-var-requires */
import { HardhatUserConfig, task } from "hardhat/config"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"

const target_network = process.env.NETWORK || "localhost"

task("accounts", "Prints the list of accounts", async (_, { ethers }) => {
  const accounts = await ethers.provider.listAccounts()
  accounts.forEach((account: any) => console.log(account))
})

const config: HardhatUserConfig = {
  defaultNetwork: target_network,
  solidity: "0.8.6",
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    iotexTestnet: {
      url: "https://babel-api.testnet.iotex.io",
      accounts: [`${process.env["NETWORK_PRIVATE_KEY"]}`],
      chainId: 4690,
      gas: 8500000,
      gasPrice: 1000000000000,
    },
  },
  typechain: {
    outDir: "../userinfo-web/typechains",
    target: "ethers-v5",
    alwaysGenerateOverloads: false,
  },
}

export default config
