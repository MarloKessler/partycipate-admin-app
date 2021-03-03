import Fetch from "./Fetch"


const dbBasePath = "database"


class Database {
    static getSurveys = async () => {
        return await Fetch.get(`${dbBasePath}/surveys`)
    }

    static getSurvey = async (id) => {
        return await Fetch.get(`${dbBasePath}/surveys/${id}`)
    }

    static createSurvey = async (survey) => {
        return await Fetch.post(`${dbBasePath}/surveys`, undefined, survey)
    }

    static updateSurvey = async (survey) => {
        const id = survey.id
        return await Fetch.post(`${dbBasePath}/surveys/${id}`, undefined, survey)
    }
}


export default Database


