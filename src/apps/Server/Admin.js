import Fetch from "./Fetch"


export default class Admin {
    static changePassword = async (uid, oldPW, newPW) => await Fetch.post("api/admin/user/pw", { user_id: uid, oldPw: oldPW, newPw: newPW })
    static deleteUser = async (uid) => await Fetch.delete(`api/admin/user/${uid}`)
}