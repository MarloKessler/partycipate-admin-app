import Fetch, {ResponseType} from "./Fetch"


export default class Database {
    static createSurvey = async survey => {
        console.log("Survey: ", survey)
        const response = await Fetch.post("api/survey", survey, { responseType: ResponseType.text })
        console.log("res: ", response)
        return response
    }


    static getSurveys = async () => await Fetch.get(`api/survey`)


    /*static getSurveyResults = async id => {
        const survey = {
            id: 234,
            creation_date: new Date(2020, 5, 12), 
            user_id: 6543, 
            title: "Ice Survey", 
            elements: [
                {
                    id: 123,
                    position: 1, 
                    type: "multiple-choice", 
                    question: "What are your favorite ice creams?", 
                    answer_possibilities: [
                        {
                            position: 3, 
                            answer: "Choco" 
                        },
                        {
                            position: 1, 
                            answer: "Vanilla" 
                        },
                        {
                            position: 4, 
                            answer: "Stracciatella" 
                        },
                        {
                            position: 2, 
                            answer: "Watermelon" 
                        },
                    ], 
                    may_skip: false,
                },
            ]
        }

        survey.elements.forEach(element => element.answer_possibilities.sort((a, b) => {
            if ( a.position < b.position ) return -1
            else if ( a.position > b.position ) return 1
            else return 0
        }))

        const baseResults = [
            {
                count_participants: 54,
                results: [ 14, 30, 21, 49 ]
            },
        ]

        survey.elements[0].results = baseResults[0].results
        survey.elements[0].count_participants = baseResults[0].count_participants

        const datetimeResults = [
            {
                element_id: 123,
                datetime_result: [
                    {
                        datetime: new Date(2021, 1, 12),
                        result: {
                            results: [ 1, 3, 7, 2 ],
                            participants: 9,
                        }
                    },
                    {
                        datetime: new Date(2021, 1, 13),
                        result: {
                            results: [ 6, 4, 8, 1 ],
                            participants: 12,
                        }
                    },
                    {
                        datetime: new Date(2021, 1, 14),
                        result: {
                            results: [ 4, 3, 5, 9 ],
                            participants: 11,
                        }
                    },
                    {
                        datetime: new Date(2021, 1, 15),
                        result: {
                            results: [ 5, 7, 4, 1 ],
                            participants: 10,
                        }
                    },
                    {
                        datetime: new Date(2021, 1, 16),
                        result: {
                            results: [ 3, 5, 7, 1 ],
                            participants: 9,
                        }
                    },
                ]
            },
        ]

        survey.elements[0].datetime_result = datetimeResults[0].datetime_result
        console.log("survey: ", survey)

        return survey
    }*/


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

    static async getCrossSurveyResults() {
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