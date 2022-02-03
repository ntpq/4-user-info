import { useWeb3React } from "@web3-react/core"
import useInterval from "hooks/useInterval"
import { last } from "lodash"
import moment from "moment"
import React, { useState } from "react"
import { IQFirstContract, IQFirstContract__factory } from "typechains"
import MessageArea from "./MessageArea"

function Content() {
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
          const time = moment.unix(parseInt(timestamp._hex, 16)).format("HH:mm:ss - MM/DD/YYYY ")
          return {
            time,
            theAddress,
            name,
          }
        }
      )
      // console.log(filteredData)
      setData(filteredData)
    }
  }

  useInterval(() => fetchData(), 1000)
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-5">
        <MessageArea data={last(data)} />
      </div>
      {/* <div className="col-span-1">small</div> */}
    </div>
  )
}

export default Content
