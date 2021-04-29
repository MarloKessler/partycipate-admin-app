import 'regenerator-runtime/runtime'
import Cookies from "js-cookie"


const endpoint = "http://localhost:8088/api"


export default class Server {
    static async getSurvey(id) {
        const initObject = {
            method: "GET",
            headers: getHeaders(),
        }
        const response = await fetch(`${endpoint}/survey/${id}`, initObject)
        const survey = await response.json()
        if (!Array.isArray(survey.elements)) throw Error("No Elements provided.")
        // Sort Elements
        survey.elements.sort((a, b) => a.position - b.position)
        // Sort Answers within Elements
        survey.elements.forEach(element => element.answer_possibilities.sort((a, b) => a.position - b.position))
        return survey
    }


    static async sendResponse(participantResponse) {        
        const promisses = []
        participantResponse.elements.forEach(elementResponse => {
            let initObject = { 
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(elementResponse),
            }
            promisses.push(fetch(`${endpoint}/participant/answer`, initObject))
        })

        return await Promise.all(promisses)
    }


    static async getSurveyResults(id) {
        const initObject = { method: "GET" }
        const response = await fetch(`${endpoint}/participant/results/${id}`, initObject)
        const results = await response.json()
        return results
    }


    static async setParticipant(surveyID) {
        const participant_cookie_name = "partycipate-ppc"
        // Get participant cookie
        const participantCookie = Cookies.get(participant_cookie_name)
        // Send participant
        const participant = {
            "survey_id": surveyID,
            "participant_cookie": participantCookie,
            "language": window.navigator.language
        }

        const response = await fetch(`${endpoint}/participant`, { method: "POST", headers: getHeaders(), body: JSON.stringify(participant) })
        const responseBody = await response.json()

        // Handle response
        const newParticipant = responseBody.participant_cookie
        if (newParticipant) Cookies.set(participant_cookie_name, responseBody.participant_cookie)
        return responseBody.participant_id
    }
}



function getHeaders() {
    let reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')
    return reqHeaders
}