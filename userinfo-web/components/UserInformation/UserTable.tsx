/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import useInterval from "hooks/useInterval"
import { useMemo, useState } from "react"
import { UserInformation, UserInformation__factory } from "typechains"
import { useTable } from "react-table"
import { useWeb3React } from "@web3-react/core"

export default function UserTable() {
  const { library } = useWeb3React()

  const [data, setData] = useState([])

  const columns = useMemo(
    () => [
      {
        Header: "Firstname",
        accessor: "firstname",
      },
      {
        Header: "Lastname",
        accessor: "lastname",
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ],
    []
  )

  async function fetchData() {
    if (library) {
      const userInformation: UserInformation = new UserInformation__factory()
        .attach("0xEC82e87abBA96aCC9f7589Ba7Ce0627b20f0b4eA")
        .connect(library.getSigner())
      const users = (await userInformation.getAllUsers()) as any

      const filteredData = users.map(({ firstname, lastname, email }: any) => ({
        firstname,
        lastname,
        email,
      }))
      setData(filteredData)
    }
  }

  useInterval(() => fetchData(), 1000)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    columns,
    data,
  })

  return (
    <table className="border-collapse table-auto" {...getTableProps}>
      <thead className="bg-white border-b">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                className="px-6 py-4 text-xl font-bold text-left text-gray-900"
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr className="bg-white border-b" {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    className="px-6 py-4 font-normal text-gray-900 text-md whitespace-nowrap"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
