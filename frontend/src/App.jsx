import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Configure from "./pages/Configure"
import About from "./pages/About"
import Header from "./components/Header"
import FooterComp from "./components/FooterComp"
import Products from "./pages/Products"
import Seller from "./pages/Seller"
import Profile from "./pages/Profile"

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/configure" element={<Configure/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/seller" element={<Seller/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    <FooterComp/>
    </BrowserRouter>
  )
}
export default App
