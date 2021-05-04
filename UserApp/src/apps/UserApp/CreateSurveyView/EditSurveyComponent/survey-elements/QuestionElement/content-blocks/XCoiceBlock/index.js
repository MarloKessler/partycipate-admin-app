import "./style.css"
import { useContext, useEffect, useState } from "react"
import { FiChevronDown, FiTrash2 } from "react-icons/fi"
import { MdDragHandle } from "react-icons/md"
import { usePopper } from 'react-popper'
import { v4 as uuid } from "uuid"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import SurveyContext from "../../../../../SurveyContext"


export function XCoiceBlock({ elementIndex }) {
    const { survey, updateSurvey } = useContext(SurveyContext)
    const element = survey.elements[elementIndex]
    const answer_possibilities = element.answer_possibilities
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
    

    const handleKeyDown = (event, index) => { if(index === answer_possibilities.length - 1 && event.key === "Enter") createAnswer() }


    const createAnswer = () => {
        // Set flag to focus last answer on rerender
        setFocusOnLastAnswer(true)
        // Add new answer
        answer_possibilities.push("")
        survey.elements[elementIndex].answer_possibilities = answer_possibilities
        updateSurvey(survey)
    }

    const moveAnswer = result => {
        const { destination, source } = result
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return
        const draggedAnswers = answer_possibilities.splice(source.index, 1)
        answer_possibilities.splice(destination.index, 0, draggedAnswers[0])
        updateSurvey(survey)
    }

    const updateAnswer = (event, index) => {
        answer_possibilities[index] = event.target.value
        survey.elements[elementIndex].answer_possibilities = answer_possibilities
        updateSurvey(survey)
    }

    const deleteAnswer = index => {
        answer_possibilities.splice(index, 1)
        survey.elements[elementIndex].answer_possibilities = answer_possibilities
        updateSurvey(survey)
    }


    return (
        <DragDropContext onDragEnd={moveAnswer}>
            <div className="xchoice-block">
                <div className="xcb-header">
                    <label>Set your answer possibilities</label>
                    <button className="btn-dark btn-icon-right" ref={ setETSButton } onClick={ toggleETSPane }>{ getTypeLabelFor(element.type) }<FiChevronDown/></button>
                    <ElementTypeSelection className={ showETSPane ? "show" : "" } onChange={updateElementType} elementRef={setETSPane} style={ styles.popper } {...attributes.popper}/>
                </div>
                <Droppable droppableId="answer-list">
                    { provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            { Array.isArray(answer_possibilities) && answer_possibilities.map((answer, index) => (
                                <AnswerOption
                                    answer={answer} 
                                    index={index} 
                                    focus={index === (answer_possibilities.length - 1) && focusOnLastAnswer}
                                    onUpdate={updateAnswer} 
                                    onKeyDown={handleKeyDown}
                                    onDelete={deleteAnswer}
                                    key={index}
                                />
                            ))}
                            { provided.placeholder }
                        </div>
                    )}
                </Droppable>
                <button className="button btn-dark create-answer-btn" title="Add Answer" onClick={createAnswer}>Add answer</button>
            </div>
        </DragDropContext>
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


function AnswerOption({answer, index, focus, onUpdate, onKeyDown, onDelete}) {
    return (
        <Draggable draggableId={`${index}`} index={index} key={index}>
            { provided => (
                <div className="answer-option" ref={provided.innerRef} {...provided.draggableProps}>
                    <div {...provided.dragHandleProps}><MdDragHandle/></div>
                    <input
                        autoFocus={focus} 
                        type="text" className="input answer-input" 
                        placeholder={`Answer ${index + 1}`} 
                        value={answer} 
                        onChange={event => onUpdate(event, index) } 
                        onKeyDown={event => onKeyDown(event, index)}
                    />
                    <button className="item btn-light trash-btn" title="Delete Answer" onClick={() => onDelete(index)}><FiTrash2/></button>
                </div>
            )}
        </Draggable>
    )
}


const XChoiceTypes = {
    singleChoice: "single-choice", 
    multipleChoice: "multiple-choice"
}