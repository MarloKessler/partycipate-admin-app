import { render, screen } from '@testing-library/react'
import App from '../apps/App'
import ReactDOM from "react-dom"

/*test('renders learn react link', () => {
  render(<App/>)
  const linkElement = screen.queryByText(/Here/i)
  expect(linkElement).toBeInTheDocument()
})*/

it("Renders App without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<App/>, div)
  ReactDOM.unmountComponentAtNode(div)
})