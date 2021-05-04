import "./style.css"
import { TitleElement } from "../TitleElement"


export function StandardPage({ containerClassName="", title, helpSection, className="", children }) {
    return (
        <div className={`standard-page ${containerClassName}`}>
            { title && <TitleElement className="sp-title" helpSection={helpSection}>{ title }</TitleElement> }
            <div className={`sp-body ${className}`}>
                { children }
            </div>
        </div>
    )
}