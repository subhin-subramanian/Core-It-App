import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { editProfileFailure, editProfileStart, editProfileSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure} from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
    const {currentUser,error,loading} = useSelector(state=>state.user);
    const [showProfileEdit,setShowProfileEdit] = useState(false);
    const [showDelete,setShowDelete] = useState(false);
    const [editProfileData,setEditProfileData] = useState({username:currentUser.username, email:currentUser.email,profilePic:currentUser.profilePic});
    const [imageError,setImageError] = useState(null);
    const fileRef = useRef();
    const dispatch = useDispatch();
    const [editProfSuccess,setEditProfSuccess] = useState('');
    const navigate = useNavigate();
    

    // Funciton to store the data of the update form
    const handleChange = (e)=>{setEditProfileData({...editProfileData,[e.target.id]:e.target.value})}

    // Function to handle profile image change in edit profile
    const handleImageChange = async(e)=>{
      setImageError(null);
      const file = e.target.files[0];
      if(!file) return;
      if(file.size > 2*1024*1024){
        return setImageError('Image size must be less than 2mb');
      }
      const imageFile = new FormData();
      imageFile.append('image',file);
      try {
        const res = await fetch('/api/upload',{method:"POST",body:imageFile});
        const data = await res.json();
        if(!res.ok){
          return setImageError(data.message);
        }
        if(data.imageUrl){
          setEditProfileData({...editProfileData,profilePic:data.imageUrl});
        }
      } catch (error) {
        setImageError('Upload error'+error.message)
      }
    }

    // Funciton to handle the submission of the update form
    const handleEditSubmit = async(e)=>{
      e.preventDefault();
      dispatch(editProfileStart());
      if(editProfileData.password.length < 7){
        return 
      }
      try { 
        const res = await fetch(`/api/user/edit/${currentUser._id}`,{
          method:'PUT',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(editProfileData)
        });
        const data = await res.json();
        if(!res.ok){
          return dispatch(editProfileFailure(data.message));
        }
        dispatch(editProfileSuccess(data));
        setShowProfileEdit(false);
        setEditProfSuccess('Profile edited successfully');
        setTimeout(() => { setEditProfSuccess(null)}, 5000);
      } catch (error) {
        dispatch(editProfileFailure(error.message));
      }
    }

    // Function to handle the deleting of an account
    const handleDelete = async(e)=>{
      dispatch(deleteUserStart());
      try {
        const res = await fetch(`/api/user/delete/${currentUser._id}`,{
          method:'DELETE'})
        if(!res.ok){
          return dispatch(deleteUserFailure(data.message));
        }
        dispatch(deleteUserSuccess());
        navigate('/');
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    }
  
  if (currentUser){
   return (
    <div className="">
      {editProfSuccess && <span className="text-green-600 font-semibold bg-green-200 p-3 rounded-md fixed left-24 top-24 ">{editProfSuccess}</span> }
    
      <div className="flex flex-col gap-20 md:flex-row px-5 py-20 justify-center">
        {/*Left side*/}
        <div className="border border-lime-400 rounded-md flex flex-col p-5">
            <h1 className="text-center underline">Profile Details</h1>
            <div className="flex gap-5 items-center mt-5">
                <img src={currentUser.profilePic} alt="ProfileImg" className="w-10 h-10 sm:h-20 sm:w-20 rounded-full" />
                <div className="flex flex-col">
                <span>Username : {currentUser.username}</span>
                <span>Email: {currentUser.email}</span>
                </div>
            </div>
            <div className="flex gap-5 mt-3 ">
                <button onClick={()=>setShowProfileEdit(true)}>Edit Profile</button>
                <button onClick={()=>setShowDelete(true)}>Delete Account?</button>
            </div>
        </div>

        {/* Right Side */}
        <div className="border border-lime-400 rounded-md flex flex-col p-5">
            <h1 className="text-center underline">Delivery Information</h1>
            <div className="flex flex-col gap-2 mt-2">
               <span>Delivery Address:{currentUser.del_Address.name}, {currentUser.del_Address.country}, {currentUser.del_Address.street_address}, {currentUser.del_Address.city}, {currentUser.del_Address.region}, {currentUser.del_Address.post_code}</span>
               <span>Email: {currentUser.del_Address.email}</span>
               <span>Contact phone: {currentUser.del_Address.phone}</span>  
            </div>
            <Link to={'/del-add'} className="hover:!scale-[1.0]">
              <button className="w-sm mt-3">Edit / Change Delivery Informations</button>
            </Link>
         </div>
      </div>

      {/* Profile Edit popup */}
      {showProfileEdit &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg  max-w-md w-full">
        <IoMdClose className="text-xl cursor-pointer justify-self-end" onClick={()=>setShowProfileEdit(false)}/>
        <h2 className="text-xl font-bold text-center">Edit Profile</h2>

        <form className="flex flex-col gap-2 text-[15px]" onSubmit={handleEditSubmit}>

          <input type="file" accept="image/*" ref={fileRef} hidden onChange={handleImageChange}/>
          <div className="w-32 h-32 rounded-full mt-2 self-center shadow-md border-2">
            <img src={editProfileData.profilePic || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid"} alt="profile-pic" id="profilePic" className="w-full h-full rounded-full p-1"/>
          </div>
          {imageError && <span className="text-red-500 font-semibold bg-red-200 p-3 rounded-md">{imageError}</span> }
          
          <button onClick={()=>fileRef.current.click()} className="w-36 !bg-white !text-lime-600 border-1 hover:!bg-lime-600 hover:!text-white self-center">Select Image</button>

          <div className="flex flex-col">
              <label htmlFor="username" className="text-sm">Username</label>
              <input placeholder="Enter a username" type="text" id="username" required  defaultValue={currentUser.username} onChange={handleChange}/>
          </div>
          <div className="flex flex-col">
              <label htmlFor="username" className="text-sm">Email</label>
              <input placeholder="Enter an email" type="email" id="email" required  defaultValue={currentUser.email} onChange={handleChange}/>
          </div>
          <div className="flex flex-col">
              <label htmlFor="password" className="text-sm">Password</label>
              <input placeholder="Enter a strong password" type="password" id="password" required minLength={'7'} onChange={handleChange}/>
          </div>
          
          <button className="font-bold" type="submit" >{loading ? 'Loading...':'Save Changes'}</button>

          {error && <span className="text-red-500 font-semibold bg-red-200 p-3 rounded-md">{error}</span>}
        </form>
        </div>
      </div>}

      {/* Delete account popup */}
      {showDelete && 
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg  max-w-md w-full text-center">
            <IoMdClose className="text-xl cursor-pointer justify-self-end" onClick={()=>setShowDelete(false)}/>
            <h1>Delete Account</h1>
            <p className="py-5">Are you sure you want to delete your account? This cannot be undone! All your subscriptions will be gone!</p>
            <div className="flex justify-center gap-4">
                <span className="bg-red-500 p-2 rounded-md text-white cursor-pointer" onClick={handleDelete}>Yes I'm sure</span>
                <span className="bg-green-800 p-2 rounded-md text-white cursor-pointer" onClick={()=>setShowDelete(false)}>No, I'm Not</span>
            </div>
        </div>
      </div>}
      
    </div>
  )}
}
export default Profile
