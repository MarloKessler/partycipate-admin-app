import "./style.css"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { ErrorPage, CardElement, StandardPage } from ".."


export function ListView({ title, helpSection, className="", header, errorMessage, listItemContent, linkForItem, onLoad, onFilter }) {
    const [listItems, setListItems] = useState()

    useEffect(() => {
        onLoad()
        .then(items => {console.log(items); setListItems(items)})
        .catch(() => setListItems(null))
    }, [])

    return (
        <StandardPage className={`list-view ${className}`} helpSection={helpSection} title={title}>    
            { header }
            { listItems
                ? <List listItems={listItems} listItemContent={listItemContent} linkForItem={linkForItem} onFilter={onFilter}/>
                : listItems === null && <ErrorPage message={errorMessage}/>
            }
        </StandardPage>
    )
}

function List({listItems, onFilter, listItemContent, linkForItem}) {
    const history = useHistory()
    const [filteredItems, setFilteredItems] = useState(listItems)

    const handleSearchInput = event => {
        const searchInput = event.target.value.toLowerCase()
        if (searchInput === "") setFilteredItems(listItems)
        else {
            const filteredArray = listItems.filter(item => onFilter(item, searchInput))
            setFilteredItems(filteredArray)
        }
    }

    return (
        <div>
            <div className="lv-search-bar-container">
                <input type="text" placeholder="Search" onInput={handleSearchInput}/>
            </div>
            <ul className="item-list">
                { Array.isArray(filteredItems) &&
                    filteredItems.map((item, index) => (
                        <li key={index}>
                            <CardElement className="link-light primary-element lv-card" onClick={() => history.push(linkForItem(item))}>{listItemContent(item)}</CardElement>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}