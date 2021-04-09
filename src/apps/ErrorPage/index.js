import "./style.css"
import { useHistory } from "react-router-dom"


export default function ErrorPage({ message = "We are sorry, an error occured." }) {
    const history = useHistory()
    return (
        <div className="error-page">
            <h2>{ message }</h2>
            <div className="ep-options">
                <button className="btn-dark" onClick={ () => history.push("/") }>Home</button>
                <button className="btn-dark" onClick={ () => history.goBack() }>Go back</button>
            </div>
        </div>
    )
}