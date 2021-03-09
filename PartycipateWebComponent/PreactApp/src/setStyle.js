import "./dev-style.css" // Remove before build

export default element => {
    const style = document.createElement('style')
    style.appendChild(document.createTextNode(css))
    element.appendChild(style)
}

const css = `

`
