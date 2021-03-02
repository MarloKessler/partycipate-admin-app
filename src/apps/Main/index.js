import './style.css'
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"


export default App


function App() {

  function Welcome() {
    return "Choose between our xyz different survey types!"
  }

  return (
    <div className="App">
        <Navbar/>
        <Sidebar/>
        { Welcome() }
    </div>
  )
}