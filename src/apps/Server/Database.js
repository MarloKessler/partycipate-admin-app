import Fetch from "./Fetch"


const dbBasePath = "database"


class Database {
    static getSurveys = async () => await Fetch.get(`${dbBasePath}/surveys`)

    
    static getSurvey = async id => await Fetch.get(`${dbBasePath}/surveys/${id}`)

    static createSurvey = async survey => await Fetch.post(`${dbBasePath}/surveys`, undefined, survey)

    static updateSurvey = async survey => {
        const id = survey.id
        return await Fetch.put(`${dbBasePath}/surveys/`, undefined, survey)
    }

    static deleteSurvey = async id => await Fetch.delete(`${dbBasePath}/surveys/${id}`)
}


export default Database


