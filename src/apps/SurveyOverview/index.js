import "./style.css"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Server from "../Server"
import StandardPage from "../StandardPage"
import ErrorPage from "../ErrorPage"
import CardElement from "../CardElement"
import { HelpSections } from "../DocsView"
import CrossSurveyResultsCard from "../CrossSurveyResultsCard"


export default () => {
    
    const [surveys, setSurveys] = useState()

    useEffect(() => {
        Server.database().getSurveys()
        .then(setSurveys)
        .catch(() => setSurveys(null))
    }, [])

    return (
        <StandardPage className = "survey-overview searching" title="Which results do you want to see?" helpSection={HelpSections.analyseSurvey}>
            <CrossSurveyResultsCard className="so-csrc"/>
            { surveys
                ? <Surveys surveys={surveys}/>
                : surveys === null && <ErrorPage message="We are sorry, your surveys couldn't be loaded!"/>
            }
        </StandardPage>
    )
}


function Surveys({surveys}) {
    const history = useHistory()
    const [filteredSurveys, setFilteredSurveys] = useState(surveys)
    
    const handleSearchInput = event => {
        const searchInput = event.target.value.toLowerCase()
        if (searchInput === "") setFilteredSurveys(surveys)
        else {
            const filteredArray = surveys.filter(survey => survey.title.toLowerCase().includes(searchInput))
            setFilteredSurveys(filteredArray)
        }
    }

    return (
        <div>
            <div className="so-search-bar-container">
                <CardElement className="so-search-bar"><input type="text" placeholder="Search" onInput={handleSearchInput}/></CardElement>
            </div>
            <ul className="survey-list">
                { filteredSurveys &&
                    filteredSurveys.map( survey => (
                        <li key={survey.id}>
                            <CardElement className="link-light primary-element so-card" onClick={() => history.push(`/surveys/${survey.id}`)}>{survey.title}</CardElement>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}