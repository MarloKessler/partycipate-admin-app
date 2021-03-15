import Fetch from "./Fetch"


const dbBasePath = "database"


class Database {
    static createSurvey = async survey => {
        await new Promise((res, rej) => setTimeout(res, 5000))
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
                    id: 124,
                    type: "multiple-choice",
                    content: { 
                        question: 'How much is the fish?', 
                        answers: [ '42', '$300', 'There is no applicable answer which might solve this question…' ],
                        results: [ 40, 30, 10 ],
                        participants: 61,
                    },
                },
                {
                    id: 123,
                    type: "single-choice",
                    content: { 
                        question: 'How much is the fish?', 
                        answers: [ '42', '$300', 'There is no applicable answer which might solve this question…', '42', '$300', 'There is no applicable answer which might solve this question…' ],
                        results: [ 50, 30, 10, 50, 30, 10 ],
                        participants: 180,
                    },
                },
            ]
        }
        return await Fetch.get(`${dbBasePath}/survey-results/${id}`)
    }


    static deleteSurvey = async id => true //await Fetch.delete(`${dbBasePath}/surveys/${id}`)
}


export default Database


