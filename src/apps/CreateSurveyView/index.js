import './style.css'
import React from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import Server from "../Server"
import { SurveyProvider } from "./SurveyContext"
import SelectSurveyComponent from "./SelectSurveyComponent"
import EditSurveyComponent from "./EditSurveyComponent"
import ImplementSurveyComponent from "./ImplementSurveyComponent"


class CreateSurveyView extends React.Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            survey: { title: "", elements: [{ type: "", content: { question: "", answers: [ "" ] } }]},
            updateSurvey: survey => this.setState(() => ({ survey: survey })),
            step: 0,
        }



        this.goBack = () => this.setState(state => ({ step: this.state.step - 1 }))

        this.goForward = () => {
            if (this.state.step === 1) {
                Server.database().createSurvey(this.state.survey)
                .then(survey => {
                    this.state.updateSurvey(survey)
                    this.setState(() => ({ step: this.state.step + 1 }))
                })
                .catch(() => this.setState(() => ({ creationErrorOccured: true })))
            } else if (this.state.step === 2) return this.props.history.push(`/survey/${this.state.survey.id}`)
            else this.setState(() => ({ step: this.state.step + 1 }))
        }
    }


    render() {
        return(
            <div className="create-survey-view">
                <SurveyProvider value={ this.state }>
                    <SurveyComponent step={ this.state.step } onTypeSelected={ () => this.setState(() => ({ step: 1 })) }/>
                    <CSVToolbar step={ this.state.step } creationErrorOccured={ this.state.creationErrorOccured } onGoBack={ this.goBack } onGoForward={ this.goForward }/>
                </SurveyProvider>
            </div>
        )
    }
}



function SurveyComponent({ step, onTypeSelected }) {
    switch (step) {
        case 0: return <SelectSurveyComponent onTypeSelected={ onTypeSelected }/>
        case 1: return <EditSurveyComponent/>
        case 2: return <ImplementSurveyComponent/>
        default: throw Error("No applicable step selected.")
    }
}


function CSVToolbar({ step, creationErrorOccured, onGoBack, onGoForward }) {
    return (
        <div className="csv-toolbar">
            { creationErrorOccured && <p className="error-message">Your survey couldn't be saved. Please try again in some minutes.</p> }
            { step === 1 && <button className="button btn-dark back-btn" onClick={ onGoBack }><FiChevronLeft/>Back</button>}
            { step >= 1  && <button className="button btn-dark next-btn" onClick={ onGoForward }>{ step === 1 ? "Save" : "Finish" }<FiChevronRight/></button>}
        </div>
        
    )
}


export default CreateSurveyView
