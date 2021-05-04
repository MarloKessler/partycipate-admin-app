import "./style.css"
import { FiTrash2 } from "react-icons/fi"
import { IoDuplicateOutline } from "react-icons/io5"
import { MdDragHandle } from "react-icons/md"
import { Draggable } from "react-beautiful-dnd"
import { QuestionElement } from "../survey-elements"
import { CardElement } from "../../../../utilElements"


export default function SurveyElement({element, index, onDuplicate, onDelete}) {
    return (
        <Draggable draggableId={element.id} index={index}>
            { provided => (
                <div className="survey-element-container" ref={provided.innerRef} {...provided.draggableProps}>
                    <div>
                        <div {...provided.dragHandleProps}><MdDragHandle/></div>
                    </div>
                    <CardElement className="primary-element">
                        <QuestionElement className="survey-element" index={index} key={index}/>
                    </CardElement>
                    <div>
                        <button className="btn-dark" title="Duplicate Answer" onClick={() => onDuplicate(index)}><IoDuplicateOutline/></button>
                        <button className="btn-dark" title="Delete Element" onClick={() => onDelete(index)}><FiTrash2/></button>
                    </div>
                </div>
            )}
        </Draggable>
    )
}