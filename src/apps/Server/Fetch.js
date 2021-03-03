
const acceptableStatusCodes = [200, 201, 304]

class Fetch {
    static get = async (path, header) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/${path}`)
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
        console.log("body: ", body)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ENDPOINT}/${path}`, initObject)
        console.log("response: ", response)
        if (!acceptableStatusCodes.includes(response.status)) throw Error(response.statusText)
        const object = await response.json()
        console.log("object: ", object)
        return object
    }
}


export default Fetch
