import { h, Component } from "preact"
import Cookies from 'js-cookie'
import { SurveyProvider } from "./SurveyContext"
import { QuestionElement } from "./survey-elements"
import Server from "../Server"


export default class SurveyComponent extends Component {
    constructor(props) {
        super(props)
        Server.getSurvey(props.surveyID).then(survey => this.setState(() => {
            const response = { id: survey.id, elements: [] }
            survey.elements.forEach(element => response.elements.push({ id: element.id, type: element.type, participateAnswer: [] }))
            return {
                survey: survey,
                response: response
            }
        }))
        
        this.state = {
            updateResponse: response => this.setState(state => ({ response: response })),
            isSendDisabled: false,
        }

        this.sendResponse = () => {
            Server.sendResponse(this.state.response)
            Cookies.set(`partycipate-survey-${this.state.survey.id}-partycipated`, true)
            props.responseSent()
        }
    }


    render() {
        return (
            <div className="survey-component">
                { this.state.survey && 
                    <div>
                        <SurveyProvider value={ this.state }>
                            { this.state.survey.elements.map( (element, index) => <SurveyElement element={ element } index={ index } key={ index }/> ) }
                        </SurveyProvider>
                        <button className="item btn-dark send-button" disabled={ this.state.isSendDisabled } onClick={ this.sendResponse }>Send</button>
                    </div>
                }
            </div>
        )
    }
}


function SurveyElement({ element, index }) {
    switch (element.type) {
        case "single-choice":
        case "multiple-choice": return <QuestionElement className="survey-element" index={ index }/>
        default: <div></div>
    }
}
