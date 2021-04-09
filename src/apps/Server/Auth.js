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
        await loadUser()
    }


    static async updatePassword(oldPW, newPW) {
        await Fetch.post("", { oldpw: oldPW, newpw: newPW })
    }


    static async logout() {
        Cookies.remove("partycipate-session-token")
        token = undefined
        const oldUser = user
        user = undefined
        AuthStateListeners.callListeners(user, oldUser)
    }


    static async deleteUser() {
        const result = await Fetch.delete("")
        await Auth.logout()
    }


    static onAuthStateChanged(authStateChangedHandler) {
        const listenerID = AuthStateListeners.addListener(authStateChangedHandler)
        return () => AuthStateListeners.removeListener(listenerID)
    }


    static currentUser = () => user
}



async function restoreSession() {
    /*token = Cookies.get("partycipate-session-token")
    if (token) await loadUser()*/
await loadUser() // REMOVE IF USER LOADING WORKS
}



async function loadUser() {
    /*const u = await Fetch.get("api/user")
    console.log("user: ", u)
    u.token = token
    user = u*/
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