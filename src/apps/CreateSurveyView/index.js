import './style.css'
import React from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { SurveyProvider } from "./SurveyContext"
import SelectSurveyComponent from "./SelectSurveyComponent"
import EditSurveyComponent from "./EditSurveyComponent"
import ImplementSurveyComponent from "./ImplementSurveyComponent"


class CreateSurveyView extends React.Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            survey: { id: 123, title: "Random Question Survey", elements: [{ id: 123, type: "multiple-choice", content: { question: "How much is the fish?", answers: [ "42", "$30000", "There is nothing so big to imagine…" ] } }]},
            updateSurvey: survey => this.setState(state => ({ survey: survey })),
            step: 0,
        }

        this.goBack = () => this.setState(state => ({ step: this.state.step - 1 }))

        this.goForward = () => {
            if (this.state.step === 2) return this.props.history.push(`/survey/${this.state.survey.id}`)
            this.setState(state => ({ step: this.state.step + 1 }))
        }
    }


    render() {
        return(
            <div className="create-survey-view">
                <SurveyProvider value={ this.state }>
                    <SurveyComponent step={ this.state.step } onTypeSelected={ () => this.setState(() => ({ step: 1 })) }/>
                    <CSVToolbar step={ this.state.step } onGoBack={ this.goBack } onGoForward={ this.goForward }/>
                </SurveyProvider>
            </div>
        )
    }
}



function SurveyComponent({step, onTypeSelected}) {
    switch (step) {
        case 0: return <SelectSurveyComponent onTypeSelected={ onTypeSelected }/>
        case 1: return <EditSurveyComponent/>
        case 2: return <ImplementSurveyComponent/>
        default: throw Error("No applicable step selected.")
    }
}


function CSVToolbar({ step, onGoBack, onGoForward }) {
    return (
        <div className="csv-toolbar">
            { step === 1 && <button className="button btn-dark back-btn" onClick={ onGoBack }><FiChevronLeft/>Back</button>}
            { step >= 1  && <button className="button btn-dark next-btn" onClick={ onGoForward }>{ step === 1 ? "Save" : "Finish" }<FiChevronRight/></button>}
        </div>
    )
}


export default CreateSurveyView
