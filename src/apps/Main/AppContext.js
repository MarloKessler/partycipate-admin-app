
const backendPaths = ["dashboard", "create-survey", "surveys", "my-account", "users"]

export default class App {
    static userIsInBackend()  {
        const basePath = window.location.pathname.split("/")[1]
        const fittingPath = backendPaths.find(path => path === basePath)
        return fittingPath !== undefined
    }
}