import 'regenerator-runtime/runtime'
import Cookies from "js-cookie"


const endpoint = "http://localhost:8088/api"


export default class Server {
    static async getSurvey(id) {
        let reqHeaders = new Headers()
        reqHeaders.append('Content-Type', 'application/json')
        const initObject = {
            method: "GET",
            headers: reqHeaders,
        }
        const response = await fetch(`${endpoint}/survey/${id}`, initObject)
        console.log("response: ", response)
        const survey = await response.json()
        console.log("unsorted survey: ", survey)
        if (!Array.isArray(survey.elements)) throw Error("No Elements provided.")
        // Sort Elements
        survey.elements.sort((a, b) => a.position - b.position)
        // Sort Answers within Elements
        survey.elements.forEach(element => element.answer_possibilities.sort((a, b) => a.position - b.position))
        console.log("survey: ", survey)
        return survey
    }


    static async sendResponse(participantResponse) {
        let reqHeaders = new Headers()
        reqHeaders.append('Content-Type', 'application/json')
        console.log("Send response", participantResponse)
        
        const promisses = []
        participantResponse.elements.forEach(elementResponse => {
            console.log("elementResponse: ", elementResponse)
            let initObject = { 
                method: 'POST',
                headers: reqHeaders,
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
        const participant = {
            "survey_id": surveyID,
            "participant_cookie": participantCookie,
            "language": window.navigator.language
        }

        // Send participant
        const response = await fetch(`${endpoint}/participant`, { method: "POST", body: participant })
        const responseBody = await response.json()

        // Handle response
        const newParticipant = responseBody.participant_cookie
        if (newParticipant) {
            Cookies.set(participant_cookie_name, responseBody.participant_cookie)
            return responseBody.participant.id
        } else return responseBody.participant_id
    }
}
