import UserForm from "./UserForm"
import UserTable from "./UserTable"

export default function UserInformation() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <UserTable />
      <UserForm />
    </div>
  )
}
