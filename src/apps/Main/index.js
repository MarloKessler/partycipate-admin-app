import './style.css'
import Navbar from "../Navbar"


export default App


function App() {

  function getHelloWorld() {
    return "Hello World!"
  }

  const getHello = () => {
    return "Hello!"
  }

  return (
    <div className="App">
        <Navbar/>
        { getHelloWorld() }
        { getHello() }
    </div>
  )
}