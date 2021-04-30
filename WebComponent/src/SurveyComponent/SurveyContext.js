import { createContext } from "preact"

const SurveyContext  = createContext(undefined)
export default SurveyContext
export const SurveyProvider = SurveyContext.Provider