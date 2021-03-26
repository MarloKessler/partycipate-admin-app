import "./style.css"
import { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import Server from "../Server"
import PageTitleElement from "../PageTitleElement"
import ErrorPage from "../ErrorPage"
import CardElement from "../CardElement"
import { HelpSections } from "../GetHelpView"

export default () => {
    const history = useHistory()
    const [surveys, setSurveys] = useState()
    const [filteredSurveys, setFilteredSurveys] = useState()


    useEffect(() => {
        Server.database().getSurveys()
        .then(surveyArray => {
            setSurveys(surveyArray)
            setFilteredSurveys(surveyArray)
        })
        .catch(() => {
            setSurveys(null)
            setFilteredSurveys(null)
        })
    }, [])


    const handleSearchInput = event => {
        const searchInput = event.target.value.toLowerCase()
        if (searchInput === "") setFilteredSurveys(surveys)
        else {
            const filteredArray = surveys.filter(survey => survey.title.toLowerCase().includes(searchInput))
            setFilteredSurveys(filteredArray)
        }
    }


    return (
        <div className = "survey-overview searching">
            <PageTitleElement helpSection={ HelpSections.analyseSurvey }>Which results do you want to see?</PageTitleElement>
            { filteredSurveys
                ? <div>
                    <div className="so-search-bar-container">
                        <CardElement className="so-search-bar"><input type="text" placeholder="Search" onInput={ handleSearchInput }/></CardElement>
                    </div>
                    <ul className="survey-list">
                        {
                            filteredSurveys.map( survey => (
                                <li className="item" onClick={ () => history.push(`/surveys/${survey.id}`) } key={ survey.id }>
                                    <CardElement className="so-card">{ survey.title }</CardElement>
                                </li>
                            ))
                        }
                        {
                            filteredSurveys.map( survey => (
                                <li className="item" onClick={ () => history.push(`/surveys/${survey.id}`) } key={ survey.id }>
                                    <CardElement className="so-card">{ survey.title }</CardElement>
                                </li>
                            ))
                        }
                        {
                            filteredSurveys.map( survey => (
                                <li className="item" onClick={ () => history.push(`/surveys/${survey.id}`) } key={ survey.id }>
                                    <CardElement className="so-card">{ survey.title }</CardElement>
                                </li>
                            ))
                        }
                        {
                            filteredSurveys.map( survey => (
                                <li className="item" onClick={ () => history.push(`/surveys/${survey.id}`) } key={ survey.id }>
                                    <CardElement className="so-card">{ survey.title }</CardElement>
                                </li>
                            ))
                        }
                    </ul>
                  </div>
                : surveys === null && <ErrorPage message="We are sorry, your surveys couldn't be loaded!"/>
            }
        </div>
    )
}


