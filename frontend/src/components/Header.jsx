import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from "../redux/userSlice";

function Header() {
    const [navOpen,setNavOpen] = useState(false);
    const [showSignIn,setShowSignIn] = useState(false);
    const [showSignUp,setShowSignUp] = useState(false);
    const [signInData,setSignInData] = useState({});
    const [signUpData,setSignUpData] = useState({});
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [signUpError,setSignUpError] = useState(null);
    const [authStat,setAuthStat] = useState(null);
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state=>state.user);
    

    // Function to store data to state while entering during signup
    const handleSignUp = (e)=>{setSignUpData({...signUpData,[e.target.id]:e.target.value})};

    // Function to handle signup 
    const handleSignUpSubmit = async(e)=>{
      e.preventDefault();
      setSignUpLoading(true);
      setSignUpError(null);
      try {
        const res = await fetch('/api/user/sign-up',{
          method: "POST",
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(signUpData)
        });
        const data = await res.json();
        if(!res.ok){
          setSignUpError(data);
          setSignUpLoading(false);
          return;
        }
        setSignUpLoading(false)
        setShowSignUp(false);
        setAuthStat('Signup Successfull, now sign-in with your details');
        setTimeout(() => {
          setAuthStat(null);
        }, 5000);
      } catch (error) {
        setSignUpError(error.message);
        setSignUpLoading(false);
      }
    }

    // Function to store data to state while entering during signup
    const handleSignIn = (e)=>{setSignInData({...signInData,[e.target.id]:e.target.value})};
 
    // Function to handle SignIn
    const handleSignInSubmit = async(e)=>{
      e.preventDefault();
      dispatch(signInStart());
      try {
        const res = await fetch('/api/user/sign-in',{
          method: "POST",
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(signInData)
        });
        const data = await res.json();
        if(!res.ok){
          dispatch(signInFailure(data));
          return;
        }
        dispatch(signInSuccess(data.rest));
        setShowSignIn(false);
        setAuthStat('Successfully signed in');
        setTimeout(() => {
          setAuthStat(null);
        }, 5000);
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    }

  return (
    <div>
      <div className="flex justify-between sm:px-10 lg:px-30 py-5 shadow-md w-full text-[17px] relative">

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
          {currentUser ? 
          <div className="flex gap-3">
            <Link to={'/profile'}>
              <img src={currentUser.profilePic} className="w-10 h-10 cursor-pointer"/>
            </Link>
            <button className= "text-white font-bold hover:opacity-80 cursor-pointer">Sign-Out</button>
          </div> :
          <button className= "text-white font-bold hover:opacity-80 cursor-pointer" onClick={()=>setShowSignIn(true)}>Sign-In</button>}
          <FaShoppingCart  className="text-3xl hover:opacity-80 cursor-pointer"/>
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
        <form className="flex flex-col gap-5 text-[15px]" onSubmit={handleSignUpSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm">Username</label>
            <input placeholder="Enter a username" type="text" id="username" required className="border border-lime-600 p-2 rounded-md text-gray-700" onChange={handleSignUp}/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm">Email</label>
            <input placeholder="Enter an email" type="email" id="email" required className="border border-lime-600 p-2 rounded-md text-gray-700" onChange={handleSignUp}/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm">Password</label>
            <input placeholder="Enter a strong password" type="password" id="password" required className="border border-lime-600 p-2 rounded-md text-gray-700" onChange={handleSignUp}/>
          </div>

          <div className="flex flex-col">
            <button className="font-bold" type="submit" >{signUpLoading ? 'Loading...':'Sign Up'}</button>
            <div className=" flex justify-between font-semibold mt-1">
                <span>Already have an account?</span>
                <span onClick={()=>{setShowSignIn(true);setShowSignUp(false)}} className="cursor-pointer">Sign-in</span>
            </div>
          </div>
          {signUpError && <span className="text-red-500 font-semibold bg-red-200 p-3 rounded-md">{signUpError}</span>}

        </form>
        </div>
      </div>}

      {/* Sign-in popup */}
      {showSignIn &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg  max-w-md w-full">
        <IoMdClose className="text-xl cursor-pointer" onClick={()=>setShowSignIn(false)}/>
        <h2 className="text-xl font-bold text-center">Sign In</h2>
        <form className="flex flex-col gap-5 text-[15px]" onSubmit={handleSignInSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm">Username</label>
            <input placeholder="Enter a username" id="username" required className="border border-green-600 p-2 rounded-md text-gray-700" onChange={handleSignIn}/>
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm">Password</label>
            <input placeholder="Enter a strong password" id="password" required className="border border-green-600 p-2 rounded-md text-gray-700" onChange={handleSignIn}/>
          </div>

          <div className="flex flex-col">
            <button className="font-bold" type="submit">Sign In</button>
            <div className=" flex justify-between font-semibold mt-1">
                <span>Don't have an account?</span>
                <span onClick={()=>{setShowSignIn(false);setShowSignUp(true)}} className="cursor-pointer">Sign-Up</span>
            </div>
          </div>

        </form>
     
        </div>
      </div>}

      {/* Authentication status */}
      {authStat && <span className="text-green-600 font-semibold bg-green-200 p-3 rounded-md">{authStat}</span>}

    </div>
  )
}

export default Header
