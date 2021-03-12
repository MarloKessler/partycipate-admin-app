import "./style.css"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Doughnut } from 'react-chartjs-2'
import Server from "../Server"
import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"


export default XChoiceResults


function XChoiceResults() {
    const [ survey, setSurvey ] = useState()
    const { id } = useParams()
    
    return (

    )
}




function Chart({ survey }) {
    return (

    )
}