import Database from "./Database"
import Auth from "./Auth"


export default class Server {
    static database = () => Database
    static auth = () => Auth
}
