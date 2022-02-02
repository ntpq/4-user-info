import { ethers } from "hardhat"

async function main() {
  try {
    const [deployer] = await ethers.getSigners()

    console.log("Deploying contracts with the account:", deployer.address)
    console.log("Account balance:", (await deployer.getBalance()).toString())

    const UserInformation = await ethers.getContractFactory("UserInformation")
    const userInformation = await UserInformation.deploy()

    console.log("UserInformation deployed!")
    console.log("UserInformation contract address:", userInformation.address)

    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
