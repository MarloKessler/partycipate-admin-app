import "./style.css"
import { useEffect } from "react"
import Faq from "react-faq-component"
import { useParams } from "react-router"
import { CopyBlock, dracula } from "react-code-blocks"
import { StandardPage, YTVideo } from "../../utilElements"


const generalFAQs = () => ({
    title: "About Partycipate",
    rows: [
        {
            id: "what-is-partycipate",
            title: "What is Partycipate?",
            content: (
                <div>
                    <p>Partycipate is an easy-to-use survey tool.<br/></p>
                    <YTVideo url={process.env.REACT_APP_INTRO_VIDEO_URL} alt="Hello, we are Partycipate!"/>
                    <p>Learn more about us <a href={process.env.REACT_APP_PATH_WHY_PARTICIPATE}>here</a>!<br/></p>
                </div>
            ),
        },
        {
            title: "Do I need to be a developer to use Partycipate?",
            content: (
                <p>
                    Absolutely not! Our goal is to make creating surveys as easy as possible.
                    <br/>
                    Learn more about creating surveys <a href={`${process.env.REACT_APP_PATH_DOCS}/${HelpSections.createSurvey}`}>here</a>!
                </p>
            ),
        },
        {
            title: "How secure is Partycipate?",
            content: <p>Partycipate is totally secure, so you can lay back and benefit from our functionalities.</p>,
        },
        {
            title: "How can I register at Partycipate?",
            content: <p>Registrating at Partycipate is easy. Just enter your e-mail address and set a password and you're good to go. You can do so  <a href={process.env.REACT_APP_PATH_SIGN_UP}>here</a>.</p>,
        },
        {
            title: "Which browsers are supported?",
            content: <p>For our Admin App, we recommend using Chrome, Safari or Edge. Survey analysis does currently not work on Firefox, but we're working hard on it to enable this feature for you. Our Web Snippet for your website works in all modern Browsers.</p>,
        },
    ],
})

const analyseSurveysFAQs = {
    title: "Analyse results",
    rows: [
        {
            id: "check-results",
            title: "How can I check the results of my survey?",
            content: <p>You can find your survey results in <a href={process.env.REACT_APP_PATH_SURVEY_OVERVIEW}>View Results</a>.</p>,
        },
        {
            title: "Who is allowed to see the results of a survey?",
            content: (
                <p>
                    Partycipants get a short overview of the survey-results after answering.
                    <br/>
                    Creators of a survey can get a full report in <a href={process.env.REACT_APP_PATH_SURVEY_OVERVIEW}>View Results</a>.
                </p>
            ),
        },
        {
            title: "Can a participant answer a question twice?",
            content: <p>No. We make use of cookies in order to prevent users from taking surveys twice and to prevent blurred results.</p>,
        },
        {
            title: "Does a participant need an account to take part in a survey?",
            content: (
                <p>
                    No. A participant can take part in a Partycipate survey without an account.
                    <br/>
                    However, if you want to create a survey, you will need an account.
                    <br/>
                    Either <a href={process.env.REACT_APP_PATH_SIGN_UP}>create an account</a> or  <a href={process.env.REACT_APP_PATH_LOGIN}>log in</a>.
                </p>
            ),
        },
    ],
}

const createSurveyFAQs = {
    title: "Create surveys",
    rows: [
        {
            id: "create-survey",
            title: "How can I create a survey?",
            content: (
                <ol>
                    <li>
                        Go to <a href={process.env.REACT_APP_PATH_CREATE_SURVEY} target="blank" >"Create Survey"</a> and choose your survey type:<br/>
                        Decide between a single- or multiple-choice survey, click on "save" and you will get directed to the next step.
                    </li>
                    <li>
                        Specify the details of your survey: 
                        <ul style={{paddingTop: "10px"}}>
                            <li>Set the name for your survey first. This name is only used for storing.</li>
                            <li>Next, enter your questions of interest in an easily understandable way.</li>
                            <li>Last, define the answer possibilities. To add an additional one, click on “add answer".</li>
                            <li>To delete an answer, click on the bin-symbol right next to it.</li>
                            <li style={{paddingBottom: "0"}}>You can also change the survey type using the drop-down button on the right. When you're finished, click on "save" to get directed to the final step.</li>
                        </ul>
                    </li>
                    <li>
                        Implement your survey: <br/>
                        In the last step you get your code snippet. Copy and paste it to your website. Don't forget to also copy our privacy snippet. Congratulations, you're down and your survey is now answerable! 
                    </li>
                </ol>
            ),
        },
        {
            id: "which-survey-types-do-you-offer",
            title: "Which survey types do you offer?",
            content: <p>Currently, we offer single- and multiple-choice surveys.<br/>We are planning on extending our survey types in future, so stay tuned!</p>,
        },
        
        {
            title: "What should be considered concerning legal terms?",
            content: (
                <div>
                    <p>We recommend to insert the following text into your privacy statement under the subsection “Surveys", which is reviewed by our legal experts:</p>
                    <div style={{paddingLeft: "10px", borderLeft: "2px solid #BBD9DB"}}>
                        <h3>Partycipate</h3>
                        <p>This website uses functions of the online survey service Partycipate. The provider of this service is Partycipate AG (&bdquo;Partycipate&ldquo;), Roteb&uuml;hlplatz 41, Geb&auml;ude 1 70178 Stuttgart, Germany.</p>
                        <p>Partycipate is a tool used to conduct surveys on this website. When participating in a survey only data transmitted by the browser in use will be stored and processed.</p>
                        <p>Partycipate uses so-called cookies. Cookies are text files, which are stored on your computer and that enable an analysis of the use of the website by users. The information generated by cookies on your use of this website is usually transferred to a Partycipate server in Germany, where it is stored.</p>
                        <p>The storage of Partycipate cookies and the utilization of this survey tool are based on Art. 6 Sect. 1 lit. f GDPR. The operator of this website has a legitimate interest in the analysis of conducted user surveys to optimize both, the services offered online and the operator&rsquo;s advertising activities. If a corresponding agreement has been requested (e.g. an agreement to the storage of cookies), the processing takes place exclusively on the basis of Art. 6 para. 1 lit. a GDPR; the agreement can be revoked at any time.</p>
                        <p>You do have the option to prevent the archiving of cookies by making pertinent changes to the settings of your browser software. However, we have to point out that in this case you may not be able to use all of the functions of this website to their fullest extent.</p>
                        <h4>Processing of sensitive data</h4> 
                        <p>In some surveys we might additionally collect and analyze following sensitive data (according to Art. 9 Sect. GDPR):</p>
                        <ul> 
                            <li> Ethnicity</li>
                            <li> Political Opinions </li>
                            <li> Religious Belief</li>
                            <li> Ideology </li>
                            <li> Health Data</li>
                            <li> Party Affiliation </li>
                            <li> Trade Union Affiliation </li> 
                            <li> Sexual Orientation</li>
                        </ul> 
                        <p>However, the processing of this data only takes place, if a person answered the survey question asking for the respective content. Survey participant can always skip question or choose not to answer them. Legal Basis for the processing of sensitive data is Art. 9 Sect. 2 lit. a GDPR. Sensitive data will only be processed for the purpose of offering correct survey results.</p>
                        <p> Partycipate uses Google Analytics. For more information about the handling of user data by Partycipate, please consult Partycipate&rsquo;s Data Privacy Declaration at: <a href={`${window.location.origin}${process.env.REACT_APP_PATH_PRIVACY_STATEMENT}`}> Partycipate Data Privacy Declaration</a>.</p>
                        <h4>Archiving period</h4>
                        <p>Data on the user or incident level stored by Partycipate linked to cookies will be retained as long as needed or permitted in the light of the purpose it was obtained for and consistent with applicable law.</p>
                    </div>
                    <br/>
                    <p>Alternatively, you can also copy the following HTML code snippet:</p>
                    <CopyBlock
                        className="code-block"
                        text={
`
<h3>Partycipate</h3>
<p>This website uses functions of the online survey service Partycipate. The provider of this service is Partycipate AG (&bdquo;Partycipate&ldquo;), Roteb&uuml;hlplatz 41, Geb&auml;ude 1 70178 Stuttgart, Germany.</p>
<p>Partycipate is a tool used to conduct surveys on this website. When participating in a survey only data transmitted by the browser in use will be stored and processed.</p>
<p>Partycipate uses so-called cookies. Cookies are text files, which are stored on your computer and that enable an analysis of the use of the website by users. The information generated by cookies on your use of this website is usually transferred to a Partycipate server in Germany, where it is stored.</p>
<p>The storage of Partycipate cookies and the utilization of this survey tool are based on Art. 6 Sect. 1 lit. f GDPR. The operator of this website has a legitimate interest in the analysis of conducted user surveys to optimize both, the services offered online and the operator&rsquo;s advertising activities. If a corresponding agreement has been requested (e.g. an agreement to the storage of cookies), the processing takes place exclusively on the basis of Art. 6 para. 1 lit. a GDPR; the agreement can be revoked at any time.</p>
<p>You do have the option to prevent the archiving of cookies by making pertinent changes to the settings of your browser software. However, we have to point out that in this case you may not be able to use all of the functions of this website to their fullest extent.</p>
<h4>Processing of sensitive data</h4> 
<p>In some surveys we might additionally collect and analyze following sensitive data (according to Art. 9 Sect. GDPR):</p>
<ul> 
    <li> Ethnicity</li>
    <li> Political Opinions </li>
    <li> Religious Belief</li>
    <li> Ideology </li>
    <li> Health Data</li>
    <li> Party Affiliation </li>
    <li> Trade Union Affiliation </li> 
    <li> Sexual Orientation</li>
</ul> 
<p>However, the processing of this data only takes place, if a person answered the survey question asking for the respective content. Survey participant can always skip question or choose not to answer them. Legal Basis for the processing of sensitive data is Art. 9 Sect. 2 lit. a GDPR. Sensitive data will only be processed for the purpose of offering correct survey results.</p>
<p> Partycipate uses Google Analytics. For more information about the handling of user data by Partycipate, please consult Partycipate&rsquo;s Data Privacy Declaration at: <a href="${window.location.origin}${process.env.REACT_APP_PATH_PRIVACY_STATEMENT}"> Partycipate Data Privacy Declaration</a>.</p>
<h4>Archiving period</h4>
<p>Data on the user or incident level stored by Partycipate linked to cookies will be retained as long as needed or permitted in the light of the purpose it was obtained for and consistent with applicable law.</p>
`
                        }
                        language={"html"}
                        theme={dracula}
                    />
                </div>
            ),
        },
        {
            title: "Do you have any advice for creating a good survey?",
            content: <p>
                Make sure to use a question and answer possibilities that can be easily understood by your users. People often do not take the time to read thoroughly.<br/> 
                Think about your answer possibilites carefully. Have you included all possible options?<br/> 
                Ideally, you test your survey with someone prior to releasing it.
            </p>,
        },
    ],
}

const accountFAQs = {
    title: "My account",
    rows: [
        {
            title: "How can I delete my account?",
            content: (
                <p>
                    If you want to delete your account, you can do so in the section <a href={process.env.REACT_APP_PATH_ACCOUNT_VIEW}>My Account</a>.<br/>
                    Do think twice before you delete your account, your data can't be restored afterwards.
                </p>
            ),
        },
        {
            title: "How can I change my password?",
            content: <p>If you want to change your password, you can do so in the section <a href={process.env.REACT_APP_PATH_ACCOUNT_VIEW}>My Account</a>.</p>,
        },
        {
            title: "How can I change my name and e-mail?",
            content: <p>If you want to change your name and e-mail, you can do so in the section <a href={process.env.REACT_APP_PATH_ACCOUNT_VIEW}>My Account</a>.</p>,
        },
        {
            title: "Can I restore my account after deletion?",
            content: <p>No. We work according to the highest privacy and data security standards and will therefore delete all your data, if you chose to delete your account!</p>,
        },
    ],
}

const additionalFAQs = {
    title: "Additional",
    rows: [
        {
            title: "I have an additional question?",
            content: <p>Please, don't hesitate and <a href={process.env.REACT_APP_PATH_CONTACT}>contact us!</a></p>,
        },
    ],
}

const styles = {
    titleTextColor: "#82a0aa",
    bgColor: 'transparent',
    rowTitleColor: "#82a0aa",
    arrowColor: "#82a0aa", 
}


export const HelpSections = {
    about: "about",
    createSurvey: "create-survey",
    analyseSurvey: "analyse-survey",
    account: "account",
}

export function DocsView() {
    const { id } = useParams()
    
    useEffect(() => {
        if(!id) return
        const faqSection = document.getElementById(id)
        if(!faqSection) return
        faqSection.scrollIntoView()
    }, [id])

    return (
        <StandardPage title="FAQs: 🎉" className="docs-view">
            <section id="about" className="doc-section">
                <Faq data={generalFAQs()} styles={styles}/>
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
        </StandardPage>
    )
}
