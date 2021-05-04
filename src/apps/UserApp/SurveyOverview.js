import Server from "../Server"
import { HelpSections } from "../PublicApp"
import { ListView } from "../utilElements"


export function SurveyOverview() {
    const handleFilter = (survey, searchInput) => survey.title.toLowerCase().includes(searchInput)
    return (
        <ListView 
            title="Your Surveys"
            helpSection={HelpSections.analyseSurvey}
            errorMessage="We are sorry, your surveys couldn't be loaded!"
            listItemContent={survey => survey.title}
            linkForItem={survey => `${process.env.REACT_APP_PATH_SURVEY_OVERVIEW}/${survey.id}`}
            onLoad={Server.database().getSurveys}
            onFilter={handleFilter}
        />
    )
}