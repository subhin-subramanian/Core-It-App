import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Configure from "./pages/Configure"
import Header from "./components/Header"
import FooterComp from "./components/FooterComp"
import Products from "./pages/Products"
import Seller from "./pages/Seller"
import Profile from "./pages/Profile"
import Cart from "./pages/Cart"
import DeliveryAdd from "./pages/DeliveryAdd"
import PaySuccess from "./pages/PaySuccess"

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/configure" element={<Configure/>}/>
      <Route path="/seller" element={<Seller/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/del-add" element={<DeliveryAdd/>}/>
      <Route path="/payment_success" element={<PaySuccess/>}/>
    </Routes>
    <FooterComp/>
    </BrowserRouter>
  )
}
export default App
