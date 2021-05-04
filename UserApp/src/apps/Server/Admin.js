import Fetch from "./Fetch"


export default class Admin {
    static getUsers = async () => await Fetch.get("api/admin/user")
    static getUser = async id => await Fetch.get(`api/admin/user/${id}`)

    static updateUser = async user => await Fetch.post(`api/admin/user`, { user_id: user.user_id, email: user.email, name: user.name })
    static updatePassword = async (uid, newPW) => await Fetch.post("api/admin/user/pw", { user_id: uid, newPw: newPW })

    static deleteUser = async uid => await Fetch.delete(`api/admin/user/${uid}`)

    static userIsAdmin = user => user && Array.isArray(user.roles) && user.roles.some(role => role.name == "ROLE_ADMIN")
}