import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { ErrorPage, UserView } from "../utilElements"
import Server from "../Server"


export function AdminUserView() {
    const { userID } = useParams()
    const [user, setUser] = useState()

    useEffect(() => {
        Server.admin().getUser(userID)
        .then(setUser)
        .catch(error => setUser(null))
    }, [])

    if (user) return (
        <UserView
            user={user}
            onUpdateUser={Server.admin().updateUser}
            onUpdatePW={Server.admin().updatePassword}
            onDeleteUser={Server.admin().deleteUser}
        />
    )
    else if (user == null) return <ErrorPage message="We are sorry, the user couldn't be loaded!"/>
    else return <div/>
}