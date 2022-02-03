import { ethers } from "hardhat"

async function main() {
  try {
    const [deployer] = await ethers.getSigners()

    console.log("Deploying contracts with the account:", deployer.address)
    console.log("Account balance:", (await deployer.getBalance()).toString())

    const IQFirstContract = await ethers.getContractFactory("IQFirstContract")
    const contract = await IQFirstContract.deploy()

    console.log("IQFirstContract deployed!")
    console.log("IQFirstContract contract address:", contract.address)

    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
