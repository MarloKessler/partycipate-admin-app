import Fetch from "./Fetch"


class Database {
    static createSurvey = async survey => {
        /*{
            "cookie": "cookie",
            "creation_date": "creation_date",
            "title": "title",
            "user_id": 1,
            "survey_elements": [
                {
                    "may_skip": true,
                    "position": 1,
                    "question": "question",
                    "type": "type",
                    "answer_possibilities":[
                        {
                            "position": 1,
                            "answer": "answer?"
                        },
                        {}
                    ]
                    
                },
                {}
            ]
        }*/
        console.log("createSurvey: ", survey)
        survey.user_id = 1
        const response = await Fetch.post("api/survey", undefined, survey)
        return await response.text()
    }


    static getSurveys = async () => await Fetch.get(`api/survey`)
    /*{
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
    }*/


    static getSurveyResults = async id => {
        const survey = await Fetch.get(`api/survey/${id}`)
        console.log("Survey: ", survey)
        const elementResults = await Fetch.get(`api/participant/results/${id}`)
        console.log("ElementResults: ", elementResults)
        /*const survey = {
            id: 1,
            cookie: "cookie",
            creation_date: "creation_date",
            title: "Random Question Survey",
            user_id: 1,
            elements: [
                {
                    id: 23,
                    may_skip: true,
                    position: 1,
                    question: "How much is the fish?",
                    type: "multiple-choice",
                    answer_possibilities:[
                        {
                            id: 51,
                            position: 1,
                            answer: "42",
                        },
                        {
                            id: 51,
                            position: 3,
                            answer: "$30000"
                        },
                        {
                            id: 51,
                            position: 2,
                            answer: "There is nothing so big to imagine…",
                        },
                    ]
                },
            ]
        } 

        const elementResults = [
            {
                results: [10,20,6],
                count_participants: 20
            }
        ]
        */
        survey.elements[0].answerPossibilities.sort((a, b) => {
            if ( a.position < b.position ){
                return -1;
              }
              if ( a.position > b.position ){
                return 1;
              }
              return 0;
        })
        survey.elements[0].results = elementResults[0].results
        survey.elements[0].count_participants = elementResults[0].count_participants
        console.log("survey: ", survey)
        return survey


        /*return {
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
        }*/
    }


    static deleteSurvey = async id => true //await Fetch.delete(`${dbBasePath}/surveys/${id}`)
}


export default Database


