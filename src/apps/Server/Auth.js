import { v4 as uuid } from "uuid" 

var user


export default class Auth {
    static init() {
        const oldUser = user
        user = {name: "truth"}
        AuthStateListeners.callListeners(user, oldUser)
        /*setTimeout(() => {
            const oldUser = user
            user = undefined
            AuthStateListeners.callListeners(user, oldUser)
        }, 5000)*/
    }

    static login() {}

    static onAuthStateChanged(authStateChangedHandler) {
        const listenerID = AuthStateListeners.addListener(authStateChangedHandler)
        return () => AuthStateListeners.removeListener(listenerID)
    }

    static currentUser = () => user
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