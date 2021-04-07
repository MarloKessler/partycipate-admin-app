import { getToken } from "./Auth"


const acceptableStatusCodes = [200, 201, 304]


export default class Fetch {
    static async get(path) {
        let initObject = {
            method: 'GET', 
            headers: new PAHeaders(),
        }
        const url = `${process.env.REACT_APP_BACKEND_URL}/${path}`
        const response = await fetch(url, initObject)
        //if (!acceptableStatusCodes.includes(response.status)) throw Error(response.statusText)
        const body = await response.text()
        const dict = JSON.parse(body)
        return dict
    }

    static post = async (path, body) => {
        let initObject = {
            method: 'POST', 
            headers: new PAHeaders(),
            body: JSON.stringify(body),
        }
        const url = `${process.env.REACT_APP_BACKEND_URL}/${path}`
        const response = await fetch(url, initObject)
        if (!acceptableStatusCodes.includes(response.status)) throw Error(response.statusText)
        return response
    }

    static put = async (path, body) => {
        let initObject = {
            method: 'PUT', 
            headers: new PAHeaders(),
            body: JSON.stringify(body),
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/${path}`, initObject)
        if (!acceptableStatusCodes.includes(response.status)) throw Error(response.statusText)
    }

    static delete = async (path, body) => {
        let initObject = {
            method: 'DELETE',
            headers: new PAHeaders(),
        }
        if (body) initObject.body = JSON.stringify(body)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/${path}`, initObject)
        if (!acceptableStatusCodes.includes(response.status)) throw Error(response.statusText)
    }
}



class PAHeaders extends Headers {
    constructor() {
        super()
        this.append('Content-Type', 'application/json')
        const token = getToken()
        if (token) this.append('Authorization', `Bearer ${token}`)
    }
}