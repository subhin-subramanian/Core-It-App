import { useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess, signOutFailure, signOutStart, signOutSuccess } from "../redux/userSlice";

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
    const {currentUser,error,loading} = useSelector(state=>state.user);
    const [imageError,setImageError] = useState(null);
    const fileRef = useRef();
    const navigate = useNavigate();
    
    // Function to store data to state while entering during signup
    const handleSignUp = (e)=>{setSignUpData({...signUpData,[e.target.id]:e.target.value})};

    // Function to store image to backend while signing up
    const handleImageChange =async(e)=>{
      setImageError(null);
      const file = e.target.files[0];
      if(!file) return;
      if(file.size > 2*1024*1024){
        return setImageError('Image size must be less than 2mb');
      }
      // Uploading image to backend
      const imageFile = new FormData();
      imageFile.append('image',file);
      try {
        const res = await fetch('/api/upload',{method:'POST',body:imageFile});
        const data = await res.json();
        if(data.imageUrl){
          setSignUpData({...signUpData,profilePic:data.imageUrl})
        } 
      } catch (error) {
        setImageError('upload error'+error)
      }
    }

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
        setSignUpData('');
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

    // Function to handle signing out from an account
    const handleSignOut = async()=>{
      dispatch(signOutStart());
      try {
        const res = await fetch('/api/user/sign-out',{method:'POST'});
        const data = await res.json();
        if(!res.ok){
          dispatch(signOutFailure(data));
          setAuthStat(error);
          setTimeout(() => {setAuthStat(null)}, 5000);
          return;
        }
        dispatch(signOutSuccess());
        setAuthStat("Signout Successfull");
        setTimeout(() => {setAuthStat(null)}, 5000);
        navigate('/');
      } catch (error) {
        dispatch(signOutFailure(error));
      }
    }

  return (
    <div>
      <div className="flex px-5 lg:px-20 py-5 shadow-md w-full md:text-[17px] justify-between items-center gap-5">

        {!navOpen &&
        <FaBars className="md:hidden text-3xl border-2 p-1  rounded-md " onClick={()=>setNavOpen(!navOpen)}/>}
        {navOpen && 
        <IoMdClose className="md:hidden text-3xl border-2 p-1  rounded-md " onClick={()=>setNavOpen(!navOpen)} />}

        <nav className="hidden md:flex gap-4 lg:gap-10 font-semibold items-center">
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
            <button className= "text-white font-bold hover:opacity-80 cursor-pointer" onClick={handleSignOut}>Sign-Out</button>
          </div> :
          <button className= "text-white font-bold hover:opacity-80 cursor-pointer" onClick={()=>setShowSignIn(true)}>Sign-In</button>}
          <FaShoppingCart  className="text-3xl hover:opacity-80 cursor-pointer"/>
        </div>
        
      </div>
      {/* Navbar for small screens*/}
      {navOpen && 
      <nav className="md:hidden flex flex-col font-semibold text-[17px] items-center gap-5 py-5 bg-gray-50">
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

        <form className="flex flex-col gap-3 text-[15px]" onSubmit={handleSignUpSubmit}>

          <input type="file" accept="image/*" ref={fileRef} hidden onChange={handleImageChange}/>
          <div className="w-32 h-32 rounded-full mt-2 self-center shadow-md border-2">
            <img src={signUpData.profilePic || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid"} alt="profile-pic" id="profilePic" className="w-full h-full rounded-full p-1"/>
          </div>
          {imageError && <span className="text-red-500 font-semibold bg-red-200 p-3 rounded-md">{imageError}</span> }

          <button onClick={()=>fileRef.current.click()} className="w-36 !bg-white !text-lime-600 border-1 hover:!bg-lime-600 hover:!text-white self-center">Select Image</button>

          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm">Username</label>
            <input placeholder="Enter a username" type="text" id="username" required onChange={handleSignUp}/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm">Email</label>
            <input placeholder="Enter an email" type="email" id="email" required onChange={handleSignUp}/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm">Password</label>
            <input placeholder="Enter a strong password" type="password" id="password" required minLength={'7'} onChange={handleSignUp}/>
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
            <input placeholder="Enter your username" id="username" type="text" required  onChange={handleSignIn}/>
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm">Password</label>
            <input placeholder="Enter your password" id="password" type="password" required onChange={handleSignIn}/>
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
      {authStat && <span className="text-green-600 font-semibold bg-green-200 p-3 rounded-md fixed top-32 right-24">{authStat}</span>}

    </div>
  )
}

export default Header
