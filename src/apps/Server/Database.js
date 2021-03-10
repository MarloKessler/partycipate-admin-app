import Fetch from "./Fetch"


const dbBasePath = "database"


class Database {
    static createSurvey = async survey => {
        const  s = {
            title: "",
            elements: [
                {
                    type: "single-choice",
                    content: { 
                        question: 'String', 
                        answers: [ '42', '$300', 'There is no applicable answer which might solve this question…' ]
                    },
                }
            ],
        }
        return await Fetch.post(`${dbBasePath}/surveys`, undefined, survey)
    }

    static getSurveys = async () => {
        //await Fetch.get(`${dbBasePath}/surveys`)
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
    }
    
    /*static getSurvey = async id => {
        await Fetch.get(`${dbBasePath}/surveys/${id}`)
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
                        answers: [ '42', '$300', 'There is no applicable answer which might solve this question…' ]
                    },
                }
            ]
        }
    }*/

    static getSurveyResults = async id => {
        await Fetch.get(`${dbBasePath}/survey-results/${id}`)
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
    }

    static deleteSurvey = async id => await Fetch.delete(`${dbBasePath}/surveys/${id}`)
}


export default Database


