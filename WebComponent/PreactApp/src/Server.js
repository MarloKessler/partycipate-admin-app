import 'regenerator-runtime/runtime'


export default class Server {
    static async getSurvey(id) {
        return { id: 123, title: "Random Question Survey", elements: [{ id: 123, type: "multiple-choice", content: { question: "How much is the fish?", answers: [ "42", "$30000", "There is nothing so big to imagine…" ] } }]}
    }

    static async sendResponse(response) {
        console.log("Send response", response)
    }

    static async getSurveyResults(id) {
        return { id: 123, title: "Random Question Survey", elements: [
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
        }]}
    }
}