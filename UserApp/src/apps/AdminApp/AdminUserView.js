import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { ErrorPage, UserView } from "../utilElements"
import Server from "../Server"


export function AdminUserView() {
    const history = useHistory()
    const { userID } = useParams()
    const [user, setUser] = useState()

    
    useEffect(() => {
        Server.admin().getUser(userID)
        .then(setUser)
        .catch(() => setUser(null))
    }, [])


    function handleDeletation() {
        Server.admin().deleteUser(user.user_id)
        .then(() => history.goBack())
        .catch(() => {})
    }


    if (user) return (
        <UserView
            user={user}
            onUpdateUser={Server.admin().updateUser}
            onUpdatePW={(_, newPW) => Server.admin().updatePassword(user.user_id, newPW)}
            onDeleteUser={handleDeletation}
        />
    )
    else if (user === null) return <ErrorPage message="We are sorry, the user couldn't be loaded!"/>
    else return <div/>
}