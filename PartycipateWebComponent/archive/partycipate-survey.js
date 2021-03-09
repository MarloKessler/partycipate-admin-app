

window.addEventListener("load", setSurveys)


function setSurveys() {
    const scripts = document.getElementsByTagName("script")
    const surveyIDs = []

    for (let item of scripts) {
        const src = item.getAttribute("src")
        const surveyID = item.getAttribute("survey-id")
        if (src != "./partycipate-survey.js" || !surveyID) continue
        surveyIDs.push(surveyID)
    }
    
    
    for (let surveyID of surveyIDs) {
        const surveyContainerID = `partycipate-survey-${surveyID}`
        const surveyContainer   = document.getElementById(surveyContainerID)
    
        if (!surveyContainer) {
            console.error(`No div with id ${surveyContainerID} for survey ${surveyID} found`)
            continue
        }
    
        fetchSurvey(surveyID).then( survey => {
            let shadow = surveyContainer.attachShadow({ mode: 'closed' })
            const answers = { id: survey.id, elements: [{ id: 456, answers: [1,2,5] }] }
            setHTML(shadow, survey)
            setStyle(shadow)
        })
    }
}


function setHTML(shadow, survey) {
    const surveyContainer = createElement("div")
    shadow.appendChild(surveyContainer)

    surveyContainer.setAttribute("class", "survey-container")
    for (let element of survey.elements) {
        let htmlElement = SurveyElement(element)
        if (htmlElement) surveyContainer.appendChild(htmlElement)
    }
    surveyContainer.appendChild(SendButton(survey))
}


function SurveyElement(surveyElement) {
    switch (surveyElement.type) {
        case "single-choice":
        case "multiple-choice": return QuestionElement(surveyElement)    
        default: return
    }
}


function QuestionElement(surveyElement) {
    const htmlElement = createElement("div")
    htmlElement.setAttribute("class", "survey-element")

    // Append question
    const questionParagraph = createElement("h3")
    htmlElement.appendChild(questionParagraph)
    questionParagraph.setAttribute("class", "question")
    questionParagraph.innerHTML = `${surveyElement.content.question}`
    

    // Append Answers
    const answerBlock = AnswerBlock(surveyElement)
    if (answerBlock) htmlElement.appendChild(answerBlock)

    return htmlElement
}


function AnswerBlock(element) {
    switch (element.type) {
        case "single-choice":
        case "multiple-choice": return XChoiceAnswerBlock(element.id, element.content.answers, element.type)
        default: return
    }
}


function XChoiceAnswerBlock(elementID, answers, type) {
    const element = createElement("ul")
    element.setAttribute("class", "answers")
    answers.forEach((answer, index) => element.appendChild(AnswerCard(elementID, type, index, answer)))
    return element
}


function AnswerCard(elementID, type, index, answer) {
    const answerCard = createElement("li")
    answerCard.setAttribute("class", "card answer-card")

    // Add input
    const input = createElement("input")
    answerCard.appendChild(input)
    input.setAttribute("name", elementID)
    input.setAttribute("value", index)
    if (type === "single-choice") {
        input.setAttribute("type", "radio")
        answerCard.addEventListener("click", () => input.checked = true)
    }
    if (type === "multiple-choice") {
        input.setAttribute("type", "checkbox")
        answerCard.addEventListener("click", () => input.checked = !input.checked)
    }

    // Add answer text
    const answerParagraph = createElement("p")
    answerCard.appendChild(answerParagraph)
    answerParagraph.innerHTML = answer

    return answerCard
}



function SendButton() {
    const sendButton = createElement("button")
    sendButton.setAttribute("class", "item btn-dark send-button")
    sendButton.addEventListener("click", () => {

    })
    sendButton.innerHTML = "Send"
    return sendButton
}


function isSendable(survey) {
    for (let element of survey.elements) {
        document.getElementsByClassName("survey-element").forEach(element => {

        })
    }
}


const createElement = tagName => document.createElement(tagName)


function setStyle(shadow) {
    var css = `
        .survey-container {
            margin: 0;
            overflow: hidden;

            padding: 10px; 
            display: flex; 
            flex-direction: column; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        input:focus, textarea:focus, select:focus, button {
            outline: none;
        }

        /* Item */
        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            transition: .3s;
            border-radius: 5px;
        }

        .item:hover {
            transform: scale(0.95);
            transition: .3s;
        }


        /* Button */
        button {
            cursor: pointer;
            border: none;
            background-color: transparent;
        }

        .btn-dark {
            padding: 5px;
            color: white;
            background-color: #c4c4c4;
        }

        .btn-dark:hover {
            transition: .3s;
            background-color: #bbb;
        }
          
        .btn-dark:active {
            transition: .3s;
            background-color: #cfcfcf;
        }

        .send-button {
            margin: 0 10px 0 auto;
            padding: 10px;
            font-size: medium;
        }


        /* Card */
        .card {
            margin: 10px 0;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 0 5px 1px rgba(200, 200, 200, 0.5);
        }


        .question {
            margin-left: 10px;
        }

        .answers {
            padding: 0;
        }

        .answer-card {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            list-style-type: none;
            cursor: pointer;
        }

        .answer-card input {
            margin-right: 10px;
        }

        .answer-card p {
            margin: 5px 0;
        }
    `
    var style = createElement('style')
    style.appendChild(document.createTextNode(css))
    shadow.appendChild(style)
}








const fetchSurvey = async id => {
    return { 
        id: 123, 
        elements: [ 
            { 
                id: 456, 
                position: 1, 
                type: "multiple-choice", 
                content: { 
                    question: 
                    'What is 3 * 4?', 
                    answers: [ '42', '40000', '12', '7' ]
                }
            }
        ]
    }
}

const sendAnswer = async () => {}

















/*
const getSurveyElements = survey => {
    var elementsHTML = ""
    for (let element of survey.elements) elementsHTML += getElementHTML(element)
    return elementsHTML
}


const getElementHTML = element => {
    switch (element.type) {
        case "single-choice": return getSingleChoiceHTML(element)
        case "multiple-choice": return getMultipleChoiceHTML(element)
        default: return ""
    }
}


const getSingleChoiceHTML = element => `
        ${getQuestionComponentHTML(element.content.question)}
    `

const getMultipleChoiceHTML = element => `
        ${getQuestionComponentHTML(element.content.question)}
    `


const getQuestionComponentHTML = question => `<p style="margin-top: 0"><b>${question}</b></p>`

const getXChoiceComponentHTML = element => {
    const type = element.type
    `<p style="margin-top: 0"><b>${question}</b></p>`
}
*/