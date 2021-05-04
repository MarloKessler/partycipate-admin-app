import Fetch, {ResponseType} from "./Fetch"
import Server from "./index"


export default class Database {
    static createSurvey = async survey => {
        console.log("Survey: ", survey)
        const response = await Fetch.post("api/survey", survey, { responseType: ResponseType.text })
        console.log("res: ", response)
        return response
    }


    static getSurveys = async () => await Fetch.get(`api/survey`)

    
    static getSurveyResults = async id => {
        // Fetch survey
        const survey = await Fetch.get(`api/survey/${id}`)
        survey.creation_date = new Date(survey.creation_date)
        
        // Sort survey elements
        survey.elements.sort((a,b) => a.position - b.position)
        survey.elements.forEach(element => element.answer_possibilities.sort((a, b) => a.position - b.position))
        // Fetch results
        await Promise.all([ insertBaseResults(survey), insertDatetimeResults(survey), insertMapResults(survey) ])
        console.log("survey: ", survey)

        return survey
    }

    static async getCrossSurveyTimelineResults() {
        console.log("getCrossSurveyResults")
        // Fetch survey
        const currentDate = new Date()
        const previouseDate = new Date()
        console.log("previouseDate.getDate()", previouseDate.getDate())
        previouseDate.setDate(previouseDate.getDate() - 7)
        // TODO: UNCOMMENT BEFORE FINAL
        const timeLine = { start: previouseDate.toISOString(), end: currentDate.toISOString() }
        //const timeLine = { start: previouseDate.toISOString(), end: currentDate.toISOString() }
        console.log("timeLine", timeLine)
        const csResults = await Fetch.post(`api/analytics/participants`, timeLine)
        console.log("csResults: ", csResults)
        csResults.forEach(dayResult => dayResult.datetime = new Date(dayResult.datetime))
        return csResults
    }

    static getCrossSurveyMapResults = async () => Server.admin().userIsAdmin(Server.auth().currentUser()) ? await Fetch.get(`api/analytics/countries`) : await Fetch.get(`api/analytics/countries/user/${Server.auth().currentUser().user_id}`)

    static deleteSurvey = async id => await Fetch.delete(`api/survey/${id}`)
}


async function insertBaseResults(survey) {
    // Fetch base results
    const baseResults = await Fetch.get(`api/analytics/answers/${survey.id}`)
    console.log("baseResults", baseResults)
    // Append base results to survey
    baseResults.forEach(bResult => {
        const element = survey.elements.find(element => element.id === bResult.element_id)
        if (!element) return
        element.results = bResult.results
        element.count_participants = bResult.count_participants
    })
}


async function insertDatetimeResults(survey) {
    // Fetch datetime results
    const datetimeResults = await Fetch.post(`api/analytics/timeline/${survey.id}`, { start: survey.creation_date.toISOString(), end: new Date().toISOString() })
    datetimeResults.forEach(elementResult => {
        if (!elementResult.datetime_result) return
        elementResult.datetime_result.forEach(dayResult => dayResult.datetime = new Date(dayResult.datetime))
        elementResult.datetime_result.sort((a, b) => a.datetime.getTime() - b.datetime.getTime())
    })
    
    // Append datetime results to survey
    datetimeResults.forEach(dtResult => appendDTResultToFittingElement(dtResult, survey))
}


async function insertMapResults(survey) {
    const countryResults = await Fetch.get(`api/analytics/countries/${survey.id}`)
    survey.map_results = countryResults
}


function appendDTResultToFittingElement(dtResult, survey) {
    const element = survey.elements.find(element => element.id === dtResult.element_id)
    if (!element) return
    element.datetime_result = dtResult.datetime_result
}