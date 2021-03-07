import "./style.css"
import { useHistory } from "react-router-dom"


export default ErrorPage


function ErrorPage({ message = "Hello there" }) {
    const history = useHistory()
    return (
        <div className="error-page">
            <h2>{ message }</h2>
            <div className="ep-options">
                <button className="item button btn-dark" onClick={ () => history.push("/") }>Home</button>
                <button className="item button btn-dark" onClick={ () => history.goBack() }>Go back</button>
            </div>
        </div>
    )
}