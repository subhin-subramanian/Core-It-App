import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { IDelAddress } from "../types/types";


function DeliveryAdd() {

    const [formData,setFormData] = useState <IDelAddress> ({});
    const {currentUser} = useSelector((state : RootState)=>state.user);
    const [error,setError] = useState <string | null> (null);
    const navigate = useNavigate();

    //Getting the delivery address if it exists on refresh and page loading
    useEffect(()=>{
      const getDelAdd = async()=>{
        setError(null);
        try {
          const res = await fetch(`/api/user/del-address/get/${currentUser?._id}`);
          let data = await res.json();
          if(!res.ok){
            return setError(data.message);
          }
          data = data.datafromBknd;
          setFormData({name:data.name,
              email:data.email,
              country:data.country,
              street_address:data.street_address,
              city:data.city,
              region:data.region,
              post_code:data.post_code,
              phone:data.phone
          });
        } catch (error:any) {
           setError(error.message); 
        }   
      }
      if(currentUser) getDelAdd();
    },[]);

    // Function to save formdata
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
      setFormData({...formData,[e.target.id]:e.target.value})
    }
    
    // Function to add or edit delivery address when the save button presses
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
          const res = await fetch(`/api/user/del-address/add/${currentUser?._id}`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(formData)
          });
          const data = await res.json();
          if(!res.ok){
            return setError(data.message);
          }
          navigate('/cart')
        } catch (error:any) {
           setError(error.message); 
        }   
    }

  if(!currentUser){
    return (<h1 className="flex justify-center items-center">You can't view this page</h1>)
  }else{
  return (
   
    <div className='flex flex-col m-15'>

      {error && <span className="bg-red-200 text-red-600 flex mx-auto justify-center mb-2 ">{error}</span>}

      <form className='flex flex-col w-sm sm:w-md gap-5 mx-auto' onSubmit={handleSubmit}>

        <div className="flex flex-col">
          <label htmlFor='name' className='text-sm ml-0.5'>Full Name (Give your first and last name)</label>
          <input id='name' type='text' placeholder='Fullname' defaultValue={formData.name} onChange={handleChange} required/>     
        </div>

        <div className="flex flex-col">
          <label htmlFor='email' className='text-sm ml-0.5'>Enter your email address</label>
          <input id='email' type='email' placeholder='Email' defaultValue={formData.email} onChange={handleChange} required/>     
        </div>

        <div className="flex flex-col">
          <label htmlFor='phone' className='text-sm ml-0.5'>Enter your contact phone no.</label>
          <input id='phone' type='number' placeholder='Contact Phone No.' defaultValue={formData.phone} onChange={handleChange} required/>     
        </div>

        <div className="flex flex-col w-52">
          <label htmlFor='country' className='text-sm ml-0.5'>Select your country</label>
          <select id="country" name="country" defaultValue={formData.country} autoComplete="country-name" onChange={handleChange} required>
            <option value=''>Select Country</option>
            <option value="India">India</option>
            <option value="China">China</option>
            <option value="America">America</option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option>
            <option value="Russia">Russia</option>
            <option value="Spain">Spain</option>
            <option value="Portugal">Portugal</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor='street_address' className='text-sm ml-0.5'>Street-Address</label>
          <input id='street_address' type='text' placeholder='street-address' defaultValue={formData.street_address} onChange={handleChange} required/>     
        </div>

        <div className="flex flex-col">
          <label htmlFor='city' className='text-sm ml-0.5'>City</label>
          <input id='city' type='text' placeholder='City' defaultValue={formData.city} onChange={handleChange} required/>     
        </div>

        <div className="flex flex-col">
          <label htmlFor='region' className='text-sm ml-0.5'>State / Province</label>
          <input id='region' type='text' placeholder='Specify your region' defaultValue={formData.region} onChange={handleChange} required/>     
        </div>

        <div className="flex flex-col">
          <label htmlFor='post_code' className='text-sm ml-0.5'> ZIP / Postal code</label>
          <input id='post_code' type='text' placeholder='Enter your postal code' defaultValue={formData.post_code} onChange={handleChange} required/>     
        </div>

        <button className='border border-lime-600 hover:!bg-white hover:!text-lime-600 duration-300 shadow-lg' type="submit">Save</button>
      </form>
    </div>
  )}
}
export default DeliveryAdd
