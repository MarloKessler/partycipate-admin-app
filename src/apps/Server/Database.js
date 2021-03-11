import Fetch from "./Fetch"


const dbBasePath = "database"


class Database {
    static createSurvey = async survey => {
        return survey
        return await Fetch.post(`${dbBasePath}/surveys`, undefined, survey)
    }


    static getSurveys = async () => {
        return [
            {
                id: 1,
                creation_date: new Date("2021-02-28T18:25:43.511Z"),
                title: "Website Satisfaction Survey"
            },
            {
                id: 2,
                creation_date: new Date("2021-02-28T18:25:43.511Z"),
                title: "Car Survey"
            },
            {
                id: 3,
                creation_date: new Date("2021-02-28T18:25:43.511Z"),
                title: "Best IT Survey"
            },
        ]
        return await Fetch.get(`${dbBasePath}/surveys`)
    }


    static getSurveyResults = async id => {
        return {
            id: 1,
            creation_date: new Date("2021-02-28T18:25:43.511Z"),
            title: "Website Satisfaction Survey",
            elements: [
                {
                    id: 123,
                    type: "single-choice",
                    content: { 
                        question: 'String', 
                        answers: [ '42', '$300', 'There is no applicable answer which might solve this question…' ],
                        results: [ '50', '30', '10' ]
                    },
                }
            ]
        }
        return await Fetch.get(`${dbBasePath}/survey-results/${id}`)
    }


    static deleteSurvey = async id => true //await Fetch.delete(`${dbBasePath}/surveys/${id}`)
}


export default Database


