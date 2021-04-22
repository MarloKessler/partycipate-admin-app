import Database from "./Database"
import Auth from "./Auth"
import Admin from "./Admin"


export default class Server {
    static init() {
        Auth.init()
    }
    
    static database = () => Database
    static auth = () => Auth
    static admin = () => Admin
}
