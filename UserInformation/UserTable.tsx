/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import useInterval from "hooks/useInterval"
import { useEffect, useMemo, useState } from "react"
import { IQFirstContract, IQFirstContract__factory } from "typechains"
import { useTable } from "react-table"
import { useWeb3React } from "@web3-react/core"
import moment from "moment"
export default function UserTable() {
  const { library } = useWeb3React()

  const [data, setData] = useState([])

  async function fetchData() {
    if (library) {
      const IQFirstContract: IQFirstContract = new IQFirstContract__factory()
        .attach("0xE53517b2Dde7556F80F3Db71a5f2EeEe97f7647d")
        .connect(library.getSigner())
      const message = (await IQFirstContract.getAllMessage()) as any

      const filteredData = message.map(
        ({ timestamp, theAddress, name }: IQFirstContract.MessageStructOutput) => {
          const time = moment.unix(parseInt(timestamp._hex, 16)).format("HH:mm:ss - MM/DD/YYYY ")
          console.log(time)
          return {
            time,
            theAddress,
            name,
          }
        }
      )
      console.log(filteredData)
      setData(filteredData)
    }
  }

  useInterval(() => fetchData(), 1000)
  useEffect(() => {
    // submitUser()
  }, [])

  async function submitUser() {
    const IQFirstContract: IQFirstContract = new IQFirstContract__factory()
      .attach("0xE53517b2Dde7556F80F3Db71a5f2EeEe97f7647d")
      .connect(library.getSigner())
    await IQFirstContract.addMessage("hello world !")
  }

  return <></>
}
