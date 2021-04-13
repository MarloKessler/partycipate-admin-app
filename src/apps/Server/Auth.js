import { v4 as uuid } from "uuid" 
import Fetch from "./Fetch"
import Cookies from 'js-cookie'


var token
var user


export const getToken = () => token


export default class Auth {
    static init() {
        restoreSession()
    }

    
    static async signup(email, password, name) {
        console.log("signup")
        const result = await Fetch.put("api/auth/signup", { username: email, email: email, password: password, role: ["user"] })
        console.log("signup result: ", result)
        await Auth.login(email, password)
    }


    static async login(email, password) {
        const result = await Fetch.post("api/auth/signin", { username: email, password: password })
        console.log("login result: ", result)
        if (result.token) {
            token = result.token
            Cookies.set("partycipate-session-token", token, { expires: 1 })
            await loadUser()
        }
    }


    static async updateUser(email, name) {
        await Fetch.post("", { email: email, name: name })
        const oldUser = JSON.parse(JSON.stringify(user))
        user.name = name
        user.email = email
        AuthStateListeners.callListeners(user, oldUser)
    }


    static updatePassword = async (oldPW, newPW) => await Fetch.post("api/user/pw", { oldPw: oldPW, newPw: newPW })


    static async logout() {
        Cookies.remove("partycipate-session-token")
        token = null
        const oldUser = user
        user = null
        AuthStateListeners.callListeners(user, oldUser)
    }


    static async deleteUser() {
        await Fetch.delete(`api/user`)
        await Auth.logout()
    }


    static onAuthStateChanged(authStateChangedHandler) {
        const listenerID = AuthStateListeners.addListener(authStateChangedHandler)
        return () => AuthStateListeners.removeListener(listenerID)
    }


    static currentUser = () => user
}



async function restoreSession() {
    token = Cookies.get("partycipate-session-token")
    if (token) await loadUser()
    else {
        user = null
        AuthStateListeners.callListeners(user, undefined)
    }
    
await loadUser() // REMOVE IF USER LOADING WORKS
}



async function loadUser() {
    //try {
    //    const u = await Fetch.get("api/user")
    //    console.log("user: ", u)
    //    u.token = token
    //    user = u
    //} catch (error) {
    //    user = null
    //}
user = {name: "truth", email: "truth.s.gatsby@email.com", token: "1234567890"} // REMOVE IF USER LOADING WORKS
    AuthStateListeners.callListeners(user, undefined)
}



class AuthStateListeners {
    static listeners = []

    static callListeners = (newUser, oldUser) => AuthStateListeners.listeners.forEach(listener => listener.callback(newUser, oldUser))

    static addListener(callback) {
        const id = uuid()
        AuthStateListeners.listeners.push({ id: id, callback: callback })
        return id
    }

    static removeListener(id) {
        const index = AuthStateListeners.listeners.findIndex(listener => listener.id === id)
        if (index) AuthStateListeners.listeners.splice(index, 1)
    }
}