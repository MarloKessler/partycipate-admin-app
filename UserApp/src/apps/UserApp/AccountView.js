import { useMemo } from "react"
import { UserView } from "../utilElements"
import Server from "../Server"
import { HelpSections } from "../PublicApp"
import { useHistory } from "react-router"


export function AccountView() {
  const history = useHistory()
  const user = useMemo(() => Server.auth().currentUser(), [])
  const handleDeletation = () => Server.auth().deleteUser().catch(() => {})

  return (
    <UserView
      helpSection={HelpSections.account}
      user={user}
      validateWithOldPasswort={true}
      onUpdateUser={Server.auth().updateUser}
      onUpdatePW={Server.auth().updatePassword}
      onDeleteUser={handleDeletation}
    />
  )
}