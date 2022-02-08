import { useWeb3React } from "@web3-react/core"
import { injected } from "components/wallet/connectors"
import { useEffect } from "react";

export default function MetaMask() {
  const { active, activate, deactivate } = useWeb3React()
  useEffect(() => {
    connect()
  }, []);
  
  async function connect() {
    try {
      await activate(injected)
    } catch (e) {
      console.error(e)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <button
      onClick={active ? disconnect : connect}
      className="w-64 h-10 text-xl text-black bg-white border border-black rounded-lg hover:bg-gray-300"
    >
      {active ? <span>Disconnect</span> : <span>Connect MetaMask</span>}
    </button>
  )
}
