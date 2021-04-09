import Fetch from "./Fetch"


export default class Database {
    static createSurvey = async survey => {
        survey.user_id = 1
        const response = await Fetch.post("api/survey", undefined, survey)
        return await response.text()
    }


    static getSurveys = async () => await Fetch.get(`api/survey`)


    static getSurveyResults = async id => {
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
            if ( a.position < b.position ){
                return -1
              }
              if ( a.position > b.position ){
                return 1
              }
              return 0
        }))

        const baseResults = [
            {
                count_participants: 20,
                results: [ 14, 30, 21, 69 ]
            },
        ]

        survey.elements[0].results = baseResults[0].results
        survey.elements[0].count_participants = baseResults[0].count_participants

        const datetimeResults = [
            {
                datetime_results: [
                    {
                        datetime: new Date(2021, 1, 12),
                        results: [ 1, 3, 7, 2 ],
                    },
                    {
                        datetime: new Date(2021, 1, 13),
                        results: [ 6, 4, 8, 1 ],
                    },
                    {
                        datetime: new Date(2021, 1, 14),
                        results: [ 4, 3, 5, 9 ],
                    },
                    {
                        datetime: new Date(2021, 1, 15),
                        results: [ 5, 7, 4, 1 ],
                    },
                    {
                        datetime: new Date(2021, 1, 16),
                        results: [ 3, 5, 7, 1 ],
                    },
                ]
            },
        ]

        survey.elements[0].datetime_results = datetimeResults[0].datetime_results
        console.log("survey: ", survey)

        return survey
    }


    /*static getSurveyResults = async id => {
        // Fetch survey
        const survey = await Fetch.get(`api/survey/${id}`)

        // Sort survey elements
        survey.elements.forEach(element => element.answerPossibilities.sort((a, b) => {
            if ( a.position < b.position ){
                return -1
              }
              if ( a.position > b.position ){
                return 1
              }
              return 0
        }))


        console.log("Fetched survey: ", survey)
        // Fetch base results
        const baseResults = await Fetch.get(`api/participant/results/${id}`)
        console.log("BaseResults: ", baseResults)
        
        // Append base results to survey
        survey.elements[0].results = baseResults[0].results
        survey.elements[0].count_participants = baseResults[0].count_participants

        // Fetch datetime results
        const datetimeResults = // await Fetch.get(`api/analyticts/results/${id}`)
        console.log("Datetime results: ", datetimeResults)
        // Append datetime results to survey
        survey.elements[0].datetime_results = datetimeResults[0].datetime_results
        console.log("survey: ", survey)

        return survey
    }*/


    static deleteSurvey = async id => true //await Fetch.delete(`${dbBasePath}/surveys/${id}`)
}
