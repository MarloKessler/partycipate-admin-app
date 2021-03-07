import "./style.css"
import { useContext, useEffect, useState } from "react"
import { FiChevronDown, FiTrash2 } from "react-icons/fi"
import { usePopper } from 'react-popper';
import SurveyContext from "../../../../SurveyContext"


export { XCoiceBlock }


function XCoiceBlock({ elementIndex }) {
    const { survey, updateSurvey } = useContext(SurveyContext)
    const element = survey.elements[elementIndex]
    const answers = element.content.answers
    const [focusOnLastAnswer, setFocusOnLastAnswer] = useState(false)

    // Add popper to ElementTypeSelection pane
    const [etsButton, setETSButton] = useState()
    const [etsPane, setETSPane] = useState()
    const { styles, attributes, update } = usePopper(etsButton, etsPane, { modifiers: [{ name: 'offset', options: { offset: [0, 5] }}] })
    const [showETSPane, setShowETSPane] = useState(false)

    const toggleETSPane = () => {
        setShowETSPane(!showETSPane)
        update()
    }

    const updateElementType = type => {
        toggleETSPane()
        element.type = type
        survey.elements[elementIndex] = element
        updateSurvey(survey)
    }

    // Set flag to focus last answer to false after rerender rerender 
    useEffect(() => setFocusOnLastAnswer(false))
    

    const handleKeyDown = (event, index) => { if(index === answers.length - 1 && event.key === "Enter") createAnswer() }


    const createAnswer = () => {
        // Set flag to focus last answer on rerender
        setFocusOnLastAnswer(true)
        // Add new answer
        answers.push("")
        survey.elements[elementIndex].content.answers = answers
        updateSurvey(survey)
    }

    const updateAnswer = (event, index) => {
        answers[index] = event.target.value
        survey.elements[elementIndex].content.answers = answers
        updateSurvey(survey)
    }

    const deleteAnswer = index => {
        answers.splice(index, 1)
        survey.elements[elementIndex].content.answers = answers
        updateSurvey(survey)
    }


    return (
        <div className="content-block xchoice-block">
            <div className="xcb-header">
                <label>Set your answer possibilities</label>
                <button className="button btn-dark" ref={ setETSButton } onClick={ toggleETSPane }>{ getTypeLabelFor(element.type) }<FiChevronDown className="button-icon"/></button>
                <ElementTypeSelection className={ showETSPane ? "show" : "" } onChange={ updateElementType } elementRef={ setETSPane } style={ styles.popper } {...attributes.popper}/>
            </div>
            { answers.map( (answer, index) => (
                <div className="answer-option" key={ index }>
                    <input 
                        autoFocus={ index === (answers.length - 1) && focusOnLastAnswer } 
                        type="text" className="input answer-input" 
                        placeholder={ `Answer ${index + 1}` } 
                        value={ answer } 
                        onChange={ event => updateAnswer(event, index) } 
                        onKeyDown={ event => handleKeyDown(event, index)}
                    />
                    <button className="item btn-light trash-btn" title="Delete Answer" onClick={ () => deleteAnswer(index) }><FiTrash2/></button>
                </div>
            )) }
            <button className="button btn-dark create-answer-btn" title="Add Answer" onClick={ createAnswer }>Add answer</button>
        </div>
    )
}


const getTypeLabelFor = (type) => {
    switch(type) {
        case XChoiceTypes.singleChoice: return "Single Choice"
        case XChoiceTypes.multipleChoice: return "Multiple Choice"
        default: return type
    }
}


function ElementTypeSelection({ className = "", elementRef, onChange, ...props }) {
    return (
        <div className={ `xcb-element-type-selection ${className}` } ref={ elementRef } { ...props}>
            { Object.keys(XChoiceTypes).map( (key, index) => {
                const type = XChoiceTypes[key]
                return <button className="btn-light" key={ index } onClick={ () => onChange(type) }><div className="item">{ getTypeLabelFor(type) }</div></button>
            }) }            
        </div>
    )
}


const XChoiceTypes = {
    singleChoice: "single-choice", 
    multipleChoice: "multiple-choice"
}