import "./style.css"
import { PageTitleElement } from "../PageTitleElement"


export function StandardPage({ containerClassName="", title, helpSection, className="", children }) {
    return (
        <div className={`standard-page ${containerClassName}`}>
            { title && <PageTitleElement className="sp-title" helpSection={helpSection}>{ title }</PageTitleElement> }
            <div className={`sp-body ${className}`}>
                { children }
            </div>
        </div>
    )
}