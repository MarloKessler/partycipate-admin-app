import { h, Component } from "preact"
import Cookies from 'js-cookie'
import { SurveyProvider } from "./SurveyContext"
import { QuestionElement } from "./survey-elements"
import Server from "../Server"


export default class SurveyComponent extends Component {
    constructor(props) {
        super(props)
        const survey = props.survey
        const response = { id: survey.id, elements: [] }
        // Prepare response
        survey.elements.forEach(element => response.elements.push({ survey_element_id: element.id, answer: [] }))
        
        this.state = {
            survey: survey,
            response: response,
            updateResponse: response => this.setState(() => ({ response: response })),
            isSendDisabled: false,
        }
    }

    sendResponse() {
        Server.setParticipant(this.state.response.id)
        .then(participantID => {
            this.state.response.elements.forEach(element => element.participant_id = participantID)
            return Server.sendResponse(this.state.response)
        })
        .then(() => {
            Cookies.set(`partycipate-survey-${this.state.survey.id}-partycipated`, true)
            this.props.responseSent()
        })
    }


    render() {
        return (
            <div className="survey-component">
                <div>
                    <SurveyProvider value={ this.state }>
                        { this.state.survey.elements.map( (element, index) => <SurveyElement type={ element.type } index={ index } key={ index }/> ) }
                    </SurveyProvider>
                    <button className="item btn-dark send-button" disabled={ this.state.isSendDisabled } onClick={ this.sendResponse.bind(this) }>Send</button>
                </div>
            </div>
        )
    }
}


function SurveyElement({ type, index }) {
    switch (type) {
        case "single-choice":
        case "multiple-choice": return <QuestionElement className="survey-element" index={index}/>
        default: <div></div>
    }
}
