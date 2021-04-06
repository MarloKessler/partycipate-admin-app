import "./style.css"
import { useEffect } from "react"
import Faq from "react-faq-component"
import { useParams } from "react-router"
import PageTitleElement from "../PageTitleElement"


const generalFAQs = {
    title: "About Partycipate",
    rows: [
        {
            id: "what-is-partycipate",
            title: "What is Partycipate?",
            content: `Partycipate is an easy-to-use survey tool. <br>Learn more about us <a href='/why-partycipate' class='FAQ_Link'>here</a>! `,
        },
        {
            title: "Do I need to be a developer to use Partycipate?",
            content: `Absolutely not! Our goal is to make creating surveys as easy as possible. <br>Learn more about creating surveys <a href='/create-survey' class='FAQ_Link'>here</a>!`,
        },
        {
            title: "How secure is Partycipate?",
            content: `Partycipate is totally secure, so you can lay back and benefit from our functionalities.`,
        },
        {
            title: "How can I register at Partycipate?",
            content: `Registrating at Partycipate is easy. Just enter your e-mail address and set a password and you're good to go. You can do so  <a href=' /signup' class='FAQ_Link'>here </a>.`,
        },
    ],
}

const analyseSurveysFAQs = {
    title: "Analyse Results",
    rows: [
        {
            id: "check-results",
            title: "How can I check the results of my survey?",
            content: "You can find your survey results in <a href='/surveys' class='FAQ_Link'>View Results</a>." ,
        },
        {
            title: "Who is allowed to see the results of a survey?",
            content: `Partycipants get a short overview of the survey-results after answering. <br>Creators of a survey can get a full report in <a href='/surveys' class='FAQ_Link'>View Results</a>.`,
        },
        {
            title: "Can a participant answer a question twice?",
            content: `No. We make use of cookies in order to prevent users from taking surveys twice and to prevent blurred results.`,
        },
        {
            title: "Does a participant need an account to take part in a survey?",
            content: `No. A participant can take part in a Partycipate survey without an account. <br>However, if you want to create a survey, you will need an account.
                    <br>Either  <a href='/create-account' class='FAQ_Link'>create</a> an account or  <a href='/log-in' class='FAQ_Link'>log in</a>.`,
        },
    ],
}

const createSurveyFAQs = {
    title: "Create Surveys",
    rows: [
        {
            id: "create-survey",
            title: "How can I create a survey?",
            content: `
            1.	<a href='/create-survey' class='FAQ_Link' >Start</a> choosing your survey type:
            <br>Decide between a single- or multiple-choice survey, click on ‘save’ and you will get directed to the next step.
            
            <br> <br> 2.	Specify the details of your survey:
            <br>Set the name for your survey first. This name is only used for storing. 
            <br>Next, enter your question of interest in an easily understandable way.
            <br>Last, define the answer possibilities. To add an additional one, click on “add answer". 
            To delete an answer, click on the bin-symbol right next to it. 
            <br>You can also change the survey type using the drop-down button on the right. 
            When you're finished, click on "save" to get directed to the final step. 
            
            <br> <br> 3.	Implement your survey:
            <br>In the last step you get your code snippet. Copy and paste it to your website. Don't forget to also copy our privacy snippet. Congratulations, you're down and your survey is now answerable! `,
        },
        {
            id: "which-survey-types-do-you-offer",
            title: "Which survey types do you offer?",
            content: `Currently, we offer single- and multiple-choice surveys. <br>We are planning on extending our survey types in future, so stay tuned! `,
        },
        
        {
            title: "Do you offer any help concerning privacy documentation?",
            content: `Of course we do. You can copy the following snippet to your website: `,
        },
        {
            title: "Do you have any advice for creating a good survey?",
            content: `Make sure to use a question and answer possibilities that can be easily understood by your users. People often do not take the time to read thoroughly.
            <br> Think about your answer possibilites carefully. Have you included all possible options?
            <br> Ideally, you test your survey with someone prior to releasing it.`,
        },
    ],
}

const accountFAQs = {
    title: "My Account",
    rows: [
        {
            title: "How can I delete my account?",
            content: `If you want to delete your account, you can do so in the section <a href='/my-account' class='FAQ_Link'>My Account</a>. <br>Do think twice before you delete your account, your data can't be restored afterwards.`,
        },
        {
            title: "How can I change my password?",
            content: `If you want to change your password, you can do so in the section <a href='/my-account' class='FAQ_Link'>My Account</a>.`,
        },
        {
            title: "Can I restore my account after deletion?",
            content: `No. We work according to the highest privacy and data security standards and will therefore delete all your data, if you chose to delete your account!`,
        },
    ],
}



const additionalFAQs = {
    title: "Additional",
    rows: [
        {
            title: "I have an additional question?",
            content: `Please, don't hesitate and <a href='/contact' class='FAQ_Link'>contact</a> us!`,
        },
    ],
}

const styles = {
    titleTextColor: "#82a0aa",
    bgColor: '#F5F5F5',
    rowTitleColor: "#82a0aa",
    rowContentColor: '#647374',
    arrowColor: "#82a0aa", 
    rowTitleTextSize: 'x-large',          
}


export const HelpSections = {
    general: "general",
    createSurvey: "create-survey",
    analyseSurvey: "analyse-survey",
}


export default function GetHelpView() {
    const { id } = useParams()
    
    useEffect(() => {
        if(!id) return
        const faqSection = document.getElementById(id)
        if(!faqSection) return
        faqSection.scrollIntoView()
    }, [id])

    return (
        <div className="docs-view">
            <PageTitleElement>FAQs: 🎉</PageTitleElement>
            <div className="dv-section-container">
                <section id="general" className="doc-section">
                    <Faq data={generalFAQs} styles={styles}/>
                </section>
                <section id="create-survey" className="doc-section">
                    <Faq data={createSurveyFAQs} styles={styles}/>
                </section>
                <section id="analyse-survey" className="doc-section">
                    <Faq data={analyseSurveysFAQs} styles={styles}/>
                </section>
                <section id="account" className="doc-section">
                    <Faq data={accountFAQs} styles={styles}/>
                </section>
                <section className="doc-section">
                    <Faq data={additionalFAQs} styles={styles}/>
                </section>
            </div>
        </div>
    )
}
