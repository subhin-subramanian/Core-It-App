import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Configure from "./pages/Configure"
import About from "./pages/About"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/configure" element={<Configure/>}/>
      <Route path="/about" element={<About/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
