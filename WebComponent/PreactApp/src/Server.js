import 'regenerator-runtime/runtime'


const endpoint = "http://localhost:8088/api"


export default class Server {
    static async getSurvey(id) {
        let reqHeaders = new Headers()
        reqHeaders.append('Content-Type', 'application/json')
        const initObject = {
            method: "GET",
            headers: reqHeaders,
            //mode: "no-cors"
        }
        const response = await fetch(`${endpoint}/survey/${id}`, initObject)
        console.log("response: ", response)
        const survey = await response.json()
        return survey
        
        /*return {
            id: 1,
            cookie: "cookie",
            creation_date: "creation_date",
            title: "Random Question Survey",
            user_id: 1,
            elements: [
                {
                    id: 2,
                    may_skip: true,
                    position: 1,
                    question: "How much is the fish?",
                    type: "multiple-choice",
                    answer_possibilities:[
                        {
                            id: 1,
                            position: 1,
                            answer: "42",
                        },
                        {
                            id: 2,
                            position: 3,
                            answer: "$30000"
                        },
                        {
                            id: 3,
                            position: 2,
                            answer: "There is nothing so big to imagine…",
                        },
                    ]
                },
            ]
        }
        return survey*/
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
        /*return [
            {
                results: [10,20,6],
                count_participants: 20
            }
        ]*/
        const initObject = { method: "GET" }
        const response = await fetch(`${endpoint}/participant/results/${id}`, initObject)
        const results = await response.json()
        return results




        /*return { id: 123, title: "Random Question Survey", elements: [
            { id: 123, type: "multiple-choice", content: { 
                question: "How much is the fish?", 
                answers: [ 
                    "42", 
                    "$30000", 
                    "There is nothing so big to imagine…", 
                    "$30000", 
                    "There is nothing so big to imagine…", 
                    "$30000", 
                    "There is nothing so big to imagine…",
                    "There is nothing so big to imagine…", 
                    "$30000", 
                    "There is nothing so big to imagine…", 
                ], 
                responses: [
                    .5, 
                    .3, 
                    .2, 
                    .83, 
                    .63, 
                    .23, 
                    .87,
                    .5, 
                    .3, 
                    .2, 
                ] 
            } 
        }]}*/
    }
}
