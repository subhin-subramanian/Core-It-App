import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom'

function Header() {
    const [navOpen,setNavOpen] = useState(false);
    const [showSignIn,setShowSignIn] = useState(false);
    const [showSignUp,setShowSignUp] = useState(false);


  return (
    <div>
      <div className="flex justify-between sm:px-10 lg:px-30 py-5 shadow-md w-full text-[17px] relative bg-gradient-to-r from-white to-green-50">

        {!navOpen &&
        <FaBars className="sm:hidden text-3xl border-2 p-1  rounded-md absolute left-5" onClick={()=>setNavOpen(!navOpen)}/>}
        {navOpen && 
        <IoMdClose className="sm:hidden text-3xl border-2 p-1  rounded-md absolute left-5" onClick={()=>setNavOpen(!navOpen)} />}

        <nav className="hidden sm:flex gap-10 font-semibold items-center">
            <Link to={'/'}>Home</Link>
            <Link to={'/products'}>Products</Link>
            <Link to={'/configure'}>Configure PC</Link>
            <Link to={'/about'}>About</Link>
            <Link to={'/seller'}>Become a Seller</Link>
        </nav>

        <div className="flex gap-3 items-center px-20 sm:px-0">
            <button className= "text-white font-bold hover:opacity-80" onClick={()=>setShowSignIn(true)}>Sign-In</button>
            <FaShoppingCart  className="text-3xl hover:opacity-80"/>
        </div>
        
      </div>
      {/* Navbar for small screens*/}
      {navOpen && 
      <nav className="sm:hidden flex flex-col font-semibold text-[17px] items-center gap-5 py-5 bg-gray-50">
        <Link to={'/'}>Home</Link>
        <Link to={'/products'}>Products</Link>
        <Link to={'/configure'}>Configure PC</Link>
        <Link to={'/about'}>About</Link>
        <Link to={'/seller'}>Become a Seller</Link>
      </nav>}

      {/* Sign-up popup */}
      {showSignUp &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg  max-w-md w-full">
        <IoMdClose className="text-xl cursor-pointer" onClick={()=>setShowSignUp(false)}/>
        <h2 className="text-xl font-bold text-center">Sign Up</h2>
        <form className="flex flex-col gap-5 text-[15px]">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm">Username</label>
            <input placeholder="Enter a username" type="text" id="username" required className="border border-green-600 p-2 rounded-md text-gray-700 "/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm">Email</label>
            <input placeholder="Enter an email" type="email" id="email" required className="border border-green-600 p-2 rounded-md text-gray-700 "/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm">Password</label>
            <input placeholder="Enter a strong password" type="password" id="password" required className="border border-green-600 p-2 rounded-md text-gray-700 "/>
          </div>

          <div className="flex flex-col">
            <button className="font-bold" >Sign Up</button>
            <div className=" flex justify-between font-semibold mt-1">
                <span>Already have an account?</span>
                <span onClick={()=>{setShowSignIn(true);setShowSignUp(false)}} className="cursor-pointer">Sign-in</span>
            </div>
          </div>

        </form>
     
        </div>
      </div>}

      {/* Sign-in popup */}
      {showSignIn &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg  max-w-md w-full">
        <IoMdClose className="text-xl cursor-pointer" onClick={()=>setShowSignIn(false)}/>
        <h2 className="text-xl font-bold text-center">Sign In</h2>
        <form className="flex flex-col gap-5 text-[15px]">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm">Username</label>
            <input placeholder="Enter a username" required className="border border-green-600 p-2 rounded-md text-gray-700 "/>
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm">Password</label>
            <input placeholder="Enter a strong password" required className="border border-green-600 p-2 rounded-md text-gray-700 "/>
          </div>

          <div className="flex flex-col">
            <button className="font-bold" >Sign In</button>
            <div className=" flex justify-between font-semibold mt-1">
                <span>Don't have an account?</span>
                <span onClick={()=>{setShowSignIn(false);setShowSignUp(true)}} className="cursor-pointer">Sign-Up</span>
            </div>
          </div>

        </form>
     
        </div>
      </div>}

    </div>
  )
}

export default Header
