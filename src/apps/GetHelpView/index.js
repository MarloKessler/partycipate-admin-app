import React from "react";
import Faq from "react-faq-component";
import PageTitleElement from "../PageTitleElement"
import "./style.css"


    const data = {
        rows: [
            {
                title: "How can I create a survey?",
                content: `
                1.	<a href='/create-survey' class='FAQ_Link' >Start</a> choosing your survey type:
                <br>Decide between a single- or multiple-choice survey, click on ‘save’ and you will get directed to the next step.
                
                <br> <br> 2.	Specify the details of your survey:
                <br>Set the name for your survey first. This name is only used for storing. 
                <br>Next, enter your question of interest in an easily understandable way.
                <br>Last, define the answer possibilities. To add an additional one, click on “add answer". 
                To delete an answer, click on the bin-symbol right next to it. 
                <br>You can also change the survey type using a particular button on the right. 
                When you finished, click on "save" to get directed to the final step. 
                
                <br> <br> 3.	Implement your survey:
                <br>In the last step you get your code snippet. Copy and paste it to your website. Congratulations, you're down and your survey is now answerable! `,
            },
            {
                title: "How can I check the results of my survey?",
                content: "You can find your survey results in <a href='/surveys' class='FAQ_Link'>View Results</a>." ,
            },
            {
                title: "What is Partycipate?",
                content: `Partycipate is an easy-to-use survey tool. <br>Learn more about us <a href='/why-partycipate' class='FAQ_Link'>here</a>! `,
            },
            {
                title: "Do I need to be a developer to use Partycipate?",
                content: `Absolutely not! Our goal is to make creating surveys as easy as possible. <br>Learn more about creating surveys <a href='/create-survey' class='FAQ_Link'>here</a>!`,
            },
            {
                title: "Who is allowed to see the results of a survey?",
                content: `Partycipants get a short overview of the survey-results after answering. <br>Creators of a survey can get a full report in <a href='/surveys' class='FAQ_Link'>View Results</a>.`,
            },
            {
                title: "Can I answer a question twice?",
                content: `No. We make use of cookies in order to prevent users from taking surveys twice. <br>After all you don’t want to get blurred results, do you? `,
            },
            {
                title: "Which survey types do you offer?",
                content: `Currently, we offer single- and multiple-choice surveys. <br>We are planning on extending our survey types in future, so stay tuned! `,
            },
            {
                title: "Do I need an account to take part in a survey?",
                content: `No. Everyone can take part in a Partycipate survey. <br>However, if you want to create a survey, you will need an account.
                        <br>Either  <a href='/create-account' class='FAQ_Link'>create</a> an account or  <a href='/log-in' class='FAQ_Link'>log in</a>.`,
            },
            {
                title: "How can I delete my account?",
                content: `If you want to delete your account, you can do so in the section <a href='/my-account' class='FAQ_Link'>My Account</a>. <br>Do think twice before you delete your account, your data can't be restored afterwards.`,
            },
            {
                title: "How secure is Partycipate?",
                content: `Partycipate is totally secure, so you can lay back and benefit from our functionalities.`,
            },
            {
                title: "I have an additional question?",
                content: `Please, don't hesitate and <a href='/contact' class='FAQ_Link'>contact</a> us!`,
            },
        ],
    };

    const styles = {
        bgColor: '#F5F5F5',
        rowTitleColor: "#82a0aa",
        rowContentColor: '#647374',
        arrowColor: "#82a0aa", 
        rowTitleTextSize: 'x-large',          
    }

export default function GetHelpView() {
    return (
        <div className="level">
            <PageTitleElement>FAQs: 🎉</PageTitleElement>
            <div className="faqs">
            <Faq data={data} styles={styles}/>
            </div>
        </div>
    );
}