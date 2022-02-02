import { useWeb3React } from "@web3-react/core"
import { useState } from "react"
import { UserInformation, UserInformation__factory } from "typechains"

export default function UserForm() {
  const { library } = useWeb3React()

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")

  const [userIndex, setUserIndex] = useState(0)

  async function submitUser(e: any) {
    const userInformation: UserInformation = new UserInformation__factory()
      .attach("0xEC82e87abBA96aCC9f7589Ba7Ce0627b20f0b4eA")
      .connect(library.getSigner())
    await userInformation.addUser(firstname, lastname, email)
  }

  async function removeUser(e: any) {
    const userInformation: UserInformation = new UserInformation__factory()
      .attach("0xEC82e87abBA96aCC9f7589Ba7Ce0627b20f0b4eA")
      .connect(library.getSigner())
    await userInformation.removeUser(userIndex)
  }

  return (
    <div className="flex flex-col w-1/2 p-6 space-y-16 bg-white">
      <form
        onSubmit={(e) => {
          submitUser(e)
          e.preventDefault()
        }}
      >
        <div className="mb-6 form-group">
          <label className="inline-block mb-2 text-gray-700 form-label">Firstname:</label>
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="mb-6 form-group">
          <label className="inline-block mb-2 text-gray-700 form-label">Lastname:</label>
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="mb-6 form-group">
          <label className="inline-block mb-2 text-gray-700 form-label">Email:</label>
          <input
            type="email"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded"
        >
          Submit
        </button>
      </form>
      <form
        onSubmit={(e) => {
          removeUser(e)
          e.preventDefault()
        }}
      >
        <div className="mb-6 form-group">
          <label className="inline-block mb-2 text-gray-700 form-label">User Index:</label>
          <input
            type="number"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
            placeholder="User Index"
            value={userIndex}
            onChange={(e) => setUserIndex(+e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded"
        >
          Remove
        </button>
      </form>
    </div>
  )
}
