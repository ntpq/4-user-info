import { useWeb3React } from "@web3-react/core"
import ChartsLine from "components/Charts"
import Content from "components/Content"
import Modal from "components/Content/Modal"
import MetaMask from "components/wallet/Connectors/MetaMask"
import useInterval from "hooks/useInterval"
import { last } from "lodash"
import moment from "moment"
import React, { useState } from "react"
import { IQFirstContract, IQFirstContract__factory } from "typechains"
export default function Home() {
  const { active, chainId } = useWeb3React();
  const [data, setData] = useState([])
  const { library } = useWeb3React()
  async function fetchData() {
    if (library) {
      const IQFirstContract: IQFirstContract = new IQFirstContract__factory()
        .attach("0xE53517b2Dde7556F80F3Db71a5f2EeEe97f7647d")
        .connect(library.getSigner())
      const message = (await IQFirstContract.getAllMessage()) as any

      const filteredData = message.map(
        ({ timestamp, theAddress, name }: IQFirstContract.MessageStructOutput) => {
          const time = moment.unix(parseInt(timestamp._hex, 16)).format("HH:mm:ss - DD/MM/YYYY");
          const date = moment.unix(parseInt(timestamp._hex, 16)).format("MM/DD/YYYY")
          return {
            time,
            theAddress,
            name,
            date
          }
        }
      )
      setData(filteredData)
    }
  }

  useInterval(() => fetchData(), 1000)
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
        <>
         <div className="flex justify-center">
           <Modal/>
         </div>
          <Content data={last(data)}/>
          <ChartsLine info={data}/>
        </>
      )}
    </div>
  )
}
