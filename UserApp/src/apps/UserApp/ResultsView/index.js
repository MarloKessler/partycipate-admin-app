import "./style.css"
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { FiChevronRight, FiCode } from "react-icons/fi"
import { CgClose } from "react-icons/cg"
import Server from "../../Server"
import { HelpSections } from "../../PublicApp/DocsView"
import { ErrorPage, TitleElement, StandardPage, CardElement, Notification } from "../../utilElements"
import { GeoChart, ImplementSurveyComponent } from "../shared"
import QuestionResultsElement from "./QuestionResultsElement"



export function ResultsView() {
    const { id } = useParams()
    const [ survey, setSurvey ] = useState()
    
    useEffect(() => {
        Server.database().getSurveyResults(id)
        .then(setSurvey)
        .catch(() => setSurvey(null))
    }, [])

    function Content() {
        if (survey) return (
            <div>
                <TitleElement 
                    className="so-page-title" 
                    toolbar={<CodeSnippetButton survey={survey}/>} 
                    helpSection={HelpSections.analyseSurvey}>{ survey.title }
                </TitleElement>
                { Array.isArray(survey.map_results) && <GeoCard data={survey.map_results}/> }
                { Array.isArray(survey.elements) && survey.elements.map((element, index) => <QuestionResultsElement className="primary-element" element={element} key={index}/>) }
                <DeleteNotification survey={survey}/>
            </div>
        )
        else if (survey === null) return <ErrorPage message="We're sorry, the survey you requested couldn't be found."/>
        else return <h3>Loading Results…</h3>
    }

    return (
        <StandardPage className="survey-results"> 
            <Content/>
        </StandardPage>
    )
}



function GeoCard({data}) {
    return (
        <CardElement className="primary-element so-geochart geo-card">
            <GeoChart data={data}/>
        </CardElement>
    )
}



function CodeSnippetButton({survey}) {
    const [showCodeSnippet, setShowCodeSnippet] = useState()
    return (
        <div className="code-snippet">
            <button onClick={() => setShowCodeSnippet(true)}><FiCode/></button>
            <Notification show={showCodeSnippet} onClickBackgound={() => setShowCodeSnippet(false)}>
                <button className="cs-close-btn link-dark" onClick={() => setShowCodeSnippet(false)}><CgClose/></button>
                <ImplementSurveyComponent className="cs-implementation-details" survey={survey}/>
            </Notification>
        </div>
    )
}



function DeleteNotification({survey}) {
    const history = useHistory()
    const [ showDeleteSurveyNotification, setShowDeleteSurveyNotification ] = useState()
    const [ showDeleteError, setShowDeleteError ] = useState()

    function deleteSurvey() {
        Server.database().deleteSurvey(survey.id)
        .then(() => history.push(process.env.REACT_APP_PATH_SURVEY_OVERVIEW))
        .catch(() => {
            setShowDeleteSurveyNotification(false)
            setShowDeleteError(true)
        })
        .finally(() => setTimeout(() => () => setShowDeleteError(false), 5000))
    }

    return (
        <div className="delete-notification">
            <button className="sr-delete-btn link-dark" onClick={() => setShowDeleteSurveyNotification(true)}>Delete Survey<FiChevronRight/></button>
            {showDeleteError && <p><small className="error">An error occured and the survey couldn't be deleted. Please try again!</small></p>}
            <Notification show={showDeleteSurveyNotification} onClickBackgound={() => setShowDeleteSurveyNotification(false)}>
                <p>Do you really want to delete this survey? This cannot be undone!</p>
                <div className="delete-toolbar">
                    <button onClick={() => setShowDeleteSurveyNotification(false)} className="btn-dark">Cancel</button>
                    <button onClick={deleteSurvey} className="btn-dark">Delete</button>
                </div>
            </Notification>
        </div>
    )
}