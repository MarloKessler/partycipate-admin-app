import Fetch from "./Fetch"


export default class Admin {
    static getUsers = async () => await Fetch.get("api/admin/user")
    static getUser = async id => await Fetch.get(`api/admin/user/${id}`)

    static updateUser = async user => await Fetch.post(`api/admin/user/${user.id}`, { user_id: user.id, email: user.email, name: user.name })
    static updatePassword = async (uid, oldPW, newPW) => await Fetch.post("api/admin/user/pw", { user_id: uid, oldPw: oldPW, newPw: newPW })

    static deleteUser = async (uid) => await Fetch.delete(`api/admin/user/${uid}`)
}