import React from "react"
import "./style.css"
import ESComponentContainer from "../ESComponentContainer"
import { SurveyProvider } from "./SurveyContext"
import { QuestionElement } from "./survey-elements"


class SurveyStructureComponent extends React.Component {
    constructor(props) {
        super(props)

        this.updateName = event => {
            const newSurvey = this.state.survey
            newSurvey.title = event.target.value
            this.state.updateSurvey(newSurvey)
        }
        
        this.state = {
            survey: { title: "Random Question Survey", elements: [{ id: 123, type: "multiple-choice", content: { question: "How much is the fish?", answers: [ "42", "$30000", "There is nothing so big to imagine…" ] } }]},
            updateSurvey: survey => this.setState(state => ({ survey: survey })),
        }
    }


    
    render() {
        return (
            <ESComponentContainer title="2 - Specify the details of your survey">
                { this.state.survey
                    ? <SurveyProvider value={ this.state }>
                        <div className="edit-survey-component-body">
                            <label>Survey Name</label>
                            <input className="input s-name-input" type="text" value={ this.state.survey.title } placeholder="Name" onChange={ this.updateName }/>
                            <small>The name will not be shown to the user.</small>
                            { this.state.survey.elements.map( (element, index) => <QuestionElement className="survey-element" index={ index } key={ index }/> ) }
                        </div>
                    </SurveyProvider>
                    : <div className="loading" >Loading ...</div>
                }
            </ESComponentContainer>
        )
    }
}


export default SurveyStructureComponent