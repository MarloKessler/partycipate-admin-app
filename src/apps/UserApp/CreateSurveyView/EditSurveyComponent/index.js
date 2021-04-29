import "./style.css"
import { useContext } from "react"
import { v4 as uuid } from "uuid"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import SurveyContext from "../SurveyContext"
import SurveyElement from "./SurveyElement"
import CreateSurveyError from "../CreateSurveyError"


export default function EditSurveyComponent({errors}) {
    const { survey, updateSurvey } = useContext(SurveyContext)

    const updateName = event => {
        survey.title = event.target.value
        updateSurvey(survey)
    }

    function addElement() {
        const elements = survey.elements
        if (!Array.isArray(elements)) return
        elements.push({ id: uuid(), type: "single-choice", question: "", answer_possibilities: [""], may_skip: false, })
        updateSurvey(survey)
    }

    function duplicateElement(index) {
        const elements = survey.elements
        if (!Array.isArray(elements)) return
        const newElement = Object.assign({}, elements[index])
        elements.push(newElement)
        updateSurvey(survey)
    }

    function moveElement(result) {
        const { destination, source } = result
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return
        const elements = survey.elements
        const draggedElements = elements.splice(source.index, 1)
        elements.splice(destination.index, 0, draggedElements[0])
        console.log("survey: ", survey)
        updateSurvey(survey)
    }

    function deleteElement(index) {
        const elements = survey.elements
        if (!Array.isArray(elements)) return
        elements.splice(index, 1)
        elements.forEach((element, index) => element.position = index)
        updateSurvey(survey)
    }
    
    return (
        <div className="edit-survey-component">
            <label>Survey name</label>
            <input className="s-name-input" type="text" value={ survey.title } placeholder="Name" onChange={ updateName }/>
            { (Array.isArray(errors) && errors.includes(CreateSurveyError.titleIsEmpty))
                ? <small className="error">The name is empty.</small>
                : <small>The name will not be shown to the user.</small>
            }
            
            <DragDropContext onDragEnd={moveElement}>
                <div>
                    <Droppable droppableId="element-list">
                        { provided => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {survey.elements.map((element, index) => <SurveyElement element={element} index={index} onDuplicate={duplicateElement} onDelete={deleteElement} key={element.id}/>)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
            <button className="btn-dark" onClick={addElement}>Add Question</button>
        </div>
    )
}