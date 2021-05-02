import { useMemo } from "react"
import { UserView } from "../utilElements"
import Server from "../Server"
import { HelpSections } from "../PublicApp"


export function AccountView() {
  const user = useMemo(() => Server.auth().currentUser(), [])

  return (
    <UserView
      helpSection={HelpSections.account}
      user={user}
      validateWithOldPasswort={true}

      onUpdateUser={Server.auth().updateUser}
      onUpdatePW={Server.auth().updatePassword}
      onDeleteUser={Server.auth().deleteUser}
    />
  )
}