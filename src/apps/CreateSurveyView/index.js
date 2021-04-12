import './style.css'
import React from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import Server from "../Server"
import StandardPage from "../StandardPage"
import CardElement from "../CardElement"
import Notification from "../Notification"
import { SurveyProvider } from "./SurveyContext"
import SelectSurveyComponent from "./SelectSurveyComponent"
import EditSurveyComponent from "./EditSurveyComponent"
import ImplementSurveyComponent from "./ImplementSurveyComponent"


export default class CreateSurveyView extends React.Component {
    
    constructor(props) {
        super(props)
        
        const element = { position: 1, type: "", question: "", answer_possibilities: [ { position: 1, answer: "" } ], may_skip: false, }
        const survey = { 
            user_id: Server.auth().currentUser().user_id,
            creation_date: new Date().toISOString(), 
            title: "", 
            elements: [ element ]
        }
        this.state = {
            survey: survey,
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
                .then(surveyID => {
                    this.state.survey.id = surveyID
                    this.state.updateSurvey(this.state.survey)
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
        return (
            <StandardPage title={getSurveyTitle(this.state.step)} helpSection="create-survey">
                <SurveyProvider value={ this.state }>
                    <CardElement className="secondary-element">
                        <SurveyComponent step={ this.state.step } onTypeSelected={ () => this.setState(() => ({ step: 1 })) }/>
                    </CardElement>
                    <CSVToolbar step={ this.state.step } statusMessage={ this.state.statusMessage } creationErrorOccured={ this.state.creationErrorOccured } onGoBack={ this.goBack } onGoForward={ this.goForward } isSaving={ this.state.isSaving }/>
                </SurveyProvider>
            </StandardPage>
        )
    }
}


function getSurveyTitle(step) {
    switch (step) {
        case 0: return "1 - Choose your survey type"
        case 1: return "2 - Specify the details of your survey"
        case 2: return "3 - Implement your survey"
        default: throw Error("No applicable step selected.")
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


function CSVToolbar({ step, statusMessage, onGoBack, onGoForward, isSaving }) {
    return (
        <div className="csv-toolbar">
            { step === 1 && <button className="btn-light btn-icon-left" disabled={isSaving} onClick={onGoBack}><FiChevronLeft/>Back</button> }
            { step >= 1  && <button className="btn-light btn-icon-right" disabled={isSaving} onClick={onGoForward}>{ step === 1 ? "Save" : "Finish" }<FiChevronRight/></button> }
            <Notification show={statusMessage}><p>{statusMessage}</p></Notification>
        </div>
        
    )
}
