import "./style.css"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Server from "../Server"
import StandardPage from "../StandardPage"
import ErrorPage from "../ErrorPage"
import CardElement from "../CardElement"
import { HelpSections } from "../DocsView"


export default () => {
    const history = useHistory()
    const [surveys, setSurveys] = useState()
    const [filteredSurveys, setFilteredSurveys] = useState()


    useEffect(() => {
        Server.database().getSurveys()
        .then(surveyArray => {
            surveyArray.forEach(survey => {
                console.log("delete survey res: ", Server.database().deleteSurvey(survey.id))
            })
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
        <StandardPage className = "survey-overview searching" title="Which results do you want to see?" helpSection={HelpSections.analyseSurvey}>
            { filteredSurveys
                ? <div>
                    <div className="so-search-bar-container">
                        <CardElement className="so-search-bar"><input type="text" placeholder="Search" onInput={handleSearchInput}/></CardElement>
                    </div>
                    <ul className="survey-list">
                        {
                            filteredSurveys.map( survey => (
                                <li key={survey.id}>
                                    <CardElement className="link-light primary-element so-card" onClick={() => history.push(`/surveys/${survey.id}`)}>{survey.title}</CardElement>
                                </li>
                            ))
                        }
                    </ul>
                    </div>
                : surveys === null && <ErrorPage message="We are sorry, your surveys couldn't be loaded!"/>
            }
        </StandardPage>
    )
}


