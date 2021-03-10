
const acceptableStatusCodes = [200, 201, 304]


class Fetch {
    static get = async (path, header) => {
        let reqHeader = new Headers()
        reqHeader.append('Content-Type', 'application/json')
        let initObject = {
            method: 'GET', 
            headers: reqHeader,
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/${path}`, initObject)
        if (!acceptableStatusCodes.includes(response.status)) throw Error(response.statusText)
        return await response.json()
    }

    static post = async (path, header, body) => {
        let reqHeader = new Headers()
        reqHeader.append('Content-Type', 'application/json')
        let initObject = {
            method: 'POST', 
            headers: reqHeader,
            body: JSON.stringify(body),
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/${path}`, initObject)
        if (!acceptableStatusCodes.includes(response.status)) throw Error(response.statusText)
    }

    static put = async (path, header, body) => {
        let reqHeader = new Headers()
        reqHeader.append('Content-Type', 'application/json')
        let initObject = {
            method: 'PUT', 
            headers: reqHeader,
            body: JSON.stringify(body),
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/${path}`, initObject)
        if (!acceptableStatusCodes.includes(response.status)) throw Error(response.statusText)
    }

    static delete = async (path, header) => {
        let reqHeader = new Headers()
        reqHeader.append('Content-Type', 'application/json')
        let initObject = {
            method: 'DELETE',
            headers: reqHeader,
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/${path}`, initObject)
        if (!acceptableStatusCodes.includes(response.status)) throw Error(response.statusText)
    }
}


export default Fetch
