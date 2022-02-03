import { useWeb3React } from "@web3-react/core"
import Content from "components/Content"
// import UserInformation from "components/UserInformation"
import MetaMask from "components/wallet/Connectors/MetaMask"

export default function Home() {
  const { active, chainId } = useWeb3React()

  return (
    <div className="flex flex-col mx-auto my-16 space-y-20 lg:container lg:px-12">
      <div className="mx-auto">
        <MetaMask />
      </div>
      <hr />
      {!active ? (
        <span>Please connect to wallet. (@IoTeX Testnet)</span>
      ) : !(chainId == 4690) ? (
        <span>Please change network to IoTeX Testnet.</span>
      ) : (
        // <UserInformation />
      <Content/>
      )}
    </div>
  )
}
