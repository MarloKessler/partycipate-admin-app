import './style.css'
import React from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import Server from "../Server"
import Notification from "../Notification"
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
            isSaving: false,
            statusMessage: null,
        }



        this.goBack = () => this.setState(state => ({ step: this.state.step - 1 }))

        this.goForward = () => {
            if (this.state.step === 1) {
                this.setState(() => ({ statusMessage: "Saving Survey…", isSaving: true }))
                Server.database().createSurvey(this.state.survey)
                .then(survey => {
                    this.state.updateSurvey(survey)
                    this.setState(() => ({ step: this.state.step + 1 }))
                    this.setState(() => ({ statusMessage: null }))
                })
                .catch(() => {
                    this.setState(() => ({ creationErrorOccured: true, statusMessage: "Your survey couldn't be saved. Please try again in some minutes." }))
                    setTimeout(() => this.setState(() => ({ statusMessage: null })), 5000)
                })
                .finally(() => this.setState(() => ({ isSaving: false })))
            } else if (this.state.step === 2) return this.props.history.push(`/surveys/${this.state.survey.id}`)
            else this.setState(() => ({ step: this.state.step + 1 }))
        }
    }


    render() {
        return(
            <div className="create-survey-view">
                <SurveyProvider value={ this.state }>
                    <SurveyComponent step={ this.state.step } onTypeSelected={ () => this.setState(() => ({ step: 1 })) }/>
                    <CSVToolbar step={ this.state.step } statusMessage={ this.state.statusMessage } creationErrorOccured={ this.state.creationErrorOccured } onGoBack={ this.goBack } onGoForward={ this.goForward } isSaving={ this.state.isSaving }/>
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


function CSVToolbar({ step, statusIcon, statusMessage, creationErrorOccured, onGoBack, onGoForward, isSaving }) {
    return (
        <div className="csv-toolbar">
            { step === 1 && <button className="button btn-dark back-btn" disabled={ isSaving } onClick={ onGoBack }><FiChevronLeft/>Back</button> }
            { step >= 1  && <button className="button btn-dark next-btn" disabled={ isSaving } onClick={ onGoForward }>{ step === 1 ? "Save" : "Finish" }<FiChevronRight/></button> }
            
            <Notification show={ statusMessage }><p className="status-message">{ statusMessage }</p></Notification>
        </div>
        
    )
}


export default CreateSurveyView
