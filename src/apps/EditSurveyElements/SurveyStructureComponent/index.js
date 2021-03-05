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
            <ESComponentContainer title="2 - Specify the details of your survey" className="survey-structure-component">
                { this.state.survey
                    ? <SurveyProvider value={ this.state }>
                        <div className="survey-structure-body">
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




/*
import { useEffect, useRef, useState } from "react"
import "./style.css"
import ESComponentContainer from "../ESComponentContainer"
import { QuestionElement } from "./survey-elements"


export default SurveyStructureComponent

function SurveyStructureComponent({  }) {
    const [survey, setSurvey] = useState({ title: "Random Question Survey", elements: [{ id: 123, type: "multiple-choice", content: { question: "How much is the fish?", answers: [ "42", "$30000", "There is nothing so big to imagine…" ] } }]})
    const updateName = event => {
        const newSurvey = survey
        newSurvey.title = event.target.value
        console.log("Update name: ", event.target.value)
        setSurvey(newSurvey)
    }

    const updateElement = (element, index) => {
        const newSurvey = survey
        newSurvey.elements[index] = element
        setSurvey(newSurvey)
    }

    return (
        <ESComponentContainer title="2 - Specify the details of your survey" className="survey-structure-component">
            { survey
                ? <div className="survey-structure-body">
                    <label>Survey Name</label>
                    <input className="input s-name-input" type="text" value={ survey.title } onChange={ updateName }/>
                    <small>The name will not be shown to the user.</small>
                    { survey.elements.map( (element, index) => <QuestionElement element={ element } onChange={ value => updateElement(value, index) } key={ index }/> ) }
                </div>
                : <div className="loading" >Loading ...</div>
            }
        </ESComponentContainer>
    )
}

/*
function TE({ survey, onChange: setSurvey }) {
    const [title, setTitle] = useState(survey.title)
    const updateName = event => {
        const newTitle = event.target.value
        setTitle(newTitle)
        const newSurvey = survey
        newSurvey.title = newTitle
        setSurvey(newSurvey)
    }
    return <input className="input s-name-input" type="text" value={ survey.title } onChange={ updateName }/>
}
*/