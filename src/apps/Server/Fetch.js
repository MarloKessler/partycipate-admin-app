import { getToken } from "./Auth"


const acceptableStatusCodes = [200, 201, 304]


export const ResponseType = {
    json: "json",
    text: "text",
}


export default class Fetch {
    static async get(path) {
        let initObject = {
            method: 'GET', 
            headers: new PAHeaders(),
        }
        const url = `${process.env.REACT_APP_BACKEND_URL}/${path}`
        const response = await fetch(url, initObject)
        if (!acceptableStatusCodes.includes(response.status)) throw await response.json()
        const responseBody = await response.text()
        const dict = JSON.parse(responseBody)
        return dict
    }

    static post = async (path, body, options = { responseType: "json" }) => {
        let initObject = {
            method: 'POST', 
            headers: new PAHeaders(),
            body: JSON.stringify(body),
        }
        const url = `${process.env.REACT_APP_BACKEND_URL}/${path}`
        const response = await fetch(url, initObject)
        if (!acceptableStatusCodes.includes(response.status)) throw await response.json()
        if (options.responseType === ResponseType.json) return await response.json()
        else if (options.responseType === ResponseType.text) return await response.text()
    }

    static put = async (path, body) => {
        let initObject = {
            method: 'PUT', 
            headers: new PAHeaders(),
            body: JSON.stringify(body),
        }
        const url = `${process.env.REACT_APP_BACKEND_URL}/${path}`
        const response = await fetch(url, initObject)
        if (!acceptableStatusCodes.includes(response.status)) throw await response.json()
        const resBody = await response.json()
        return resBody
    }

    static delete = async (path, body) => {
        let initObject = {
            method: 'DELETE',
            headers: new PAHeaders(),
        }
        if (body) initObject.body = JSON.stringify(body)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${path}`, initObject)
        if (!acceptableStatusCodes.includes(response.status)) throw await response.json()
        return response.text()
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