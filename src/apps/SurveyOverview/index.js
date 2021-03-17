import "./style.css"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Server from "../Server"
import PageTitleElement from "../PageTitleElement"
import ErrorPage from "../ErrorPage"
import CardElement from "../CardElement"

export default () => {
    const history = useHistory()
    const [surveys, setSurveys] = useState()

    useEffect(() => {
        Server.database().getSurveys()
        .then(surveys => {
            console.log("survey: ", surveys)

            setSurveys(surveys)
        })
        .catch((error) => {
            console.log("error: ", error)
            setSurveys(null)
        })
    }, [])

    return (
        <div className = "survey-overview">
            <PageTitleElement>Which results do you want to see?</PageTitleElement>
            { surveys
                ? <ul className="survey-list">
                    {
                        surveys.map( survey => (
                            <li className="item" onClick={ () => history.push(`/surveys/${survey.id}`) } key={ survey.id }>
                                <CardElement className="so-card">{ survey.title }</CardElement>
                            </li>
                        ))
                    }
                </ul>
                : surveys === null && <ErrorPage message="We are sorry, your surveys couldn't be loaded!"/>
            }
        </div>
    )
}


