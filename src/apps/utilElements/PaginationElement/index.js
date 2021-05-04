import "./style.css"
import { useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"


export function PaginationElement({children}) {
    const [page, setPage] = useState(1)

    const previousePage = () => {
        console.log("previouse")
        setPage(page => page-1)
    }
    const nextPage = () => {
        console.log("next")
        setPage(page => page+1)
    }

    return (
        <div className="pagination-element">
            { children[page - 1] }
            <div>
                <button className="btn-light" disabled={page <= 1} onClick={previousePage}><FiChevronLeft/></button>
                {`${page}/${children.length}`}
                <button className="btn-light" disabled={page === children.length} onClick={nextPage}><FiChevronRight/></button>
            </div>
        </div>
    )
}