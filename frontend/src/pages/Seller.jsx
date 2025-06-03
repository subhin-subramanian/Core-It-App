import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Seller() {

  const [formdata,setFormdata] = useState({});
  const [error,setError] = useState(null);
  const {currentUser} = useSelector(state=>state.user);
  const navigate = useNavigate();

  // Function to submit the form to backend
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setFormdata({...formdata,userId:currentUser._id});
    setError(null);
    try {
      const res = await fetch('/api/seller/add-request',{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formdata)
      });
      const data = await res.json();
      if(!res.ok) return setError(data.message);
      navigate('/',{state:{message:'Your seller request is submitted successfully our agent will contact you soon via email/phone'}});
    } catch (error) {
      setError(error.message);
    }
  }
  
  return (
    <div className='flex flex-col items-center m-3 sm:m-5 md:m-10 gap-5'>

      <h1 className='!text-4xl text-shadow-sm text-shadow-green-300'>Make Money With Us</h1>
      <h3 className='text-xl text-orange-400 italic'>(Fill out the form below and submit, to become one of our esteemed sellers and start making money with us.)</h3>
      <p className="text-red-500">(Important Warning: This is a demo site don't enter your real banking details or anything. Please enter some demo details just to checkout the app.)</p>

      {error && <span className="text-red-500 justify-center mx-auto my-5 bg-red-200">{error}</span>}

      <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
          <label htmlFor="name" className="min-w-64" >Enter the company/person name :</label>
          <input type="text" id="name" placeholder="Company name" required className="w-sm sm:w-md" onChange={(e)=>setFormdata({...formdata,[e.target.id]:e.target.value})}/>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
          <label htmlFor="email" className="min-w-64" >Enter your contact email :</label>
          <input type="email" id="email" placeholder="Contact Email" required className="w-sm sm:w-md" onChange={(e)=>setFormdata({...formdata,[e.target.id]:e.target.value})}/>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
          <label htmlFor="phone" className="min-w-64">Enter your contact Phone No. :</label>
          <input type="text" id="phone" placeholder="Contact Phone No." required className="w-sm sm:w-md" onChange={(e)=>setFormdata({...formdata,[e.target.id]:e.target.value})}/>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
          <label htmlFor="address" className="min-w-64">Enter full delivery pick-up address :</label>
          <textarea name="address"  id="address" placeholder="Address" required className="h-48 w-sm sm:w-md" onChange={(e)=>setFormdata({...formdata,[e.target.id]:e.target.value})}/>
        </div>
        <div className="flex flex-col   gap-3">

          <h2 className="text-xl font-semibold underline underline-offset-4 whitespace-nowrap ">BANK ACCOUNT DETAILS</h2>
          <p className="italic">(Enter your banking details to which you would like to receive the payment,<span className="text-orange-500"> (Don't enter your real banking details, this is a demo app)</span>)</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
          <label htmlFor="Bank Name" className="w-48">Enter name of the Bank :</label>
          <input type="text" id="Bank_Name" placeholder="Bank Name" className="w-sm sm:w-md" onChange={(e)=>setFormdata({...formdata,[e.target.id]:e.target.value})}/>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
          <label htmlFor="Bank Branch" className="w-48">Enter the Branch:</label>
          <input type="text" id="Bank_branch" placeholder="Bank Branch" className="w-sm sm:w-md" onChange={(e)=>setFormdata({...formdata,[e.target.id]:e.target.value})}/>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
          <label htmlFor="accnt_no" className="w-48">Enter your Account No. :</label>
          <input type="text" id="Bank_accnt_no" placeholder="Account Number" className="w-sm sm:w-md" onChange={(e)=>setFormdata({...formdata,[e.target.id]:e.target.value})}/>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
          <label htmlFor="code" className="w-48">Enter the IFSC Code :</label>
          <input type="text" id="Bank_code" placeholder="IFSC Code" className="w-sm sm:w-md" onChange={(e)=>setFormdata({...formdata,[e.target.id]:e.target.value})}/>
        </div>

        <h2 className="text-xl font-semibold underline underline-offset-4 whitespace-nowrap ">PRODUCT DETAILS</h2>
        <div className="flex flex-col sm:items-center sm:gap-5">
          <label htmlFor="pdt_details">Enter the details of the products you want to sell. Try to follow the format Product-Category, Product, Expected Price, No. of pieces in stock (Eg:1.Printer, Hp- Desktop Jet, 12000 Rs/piece, 3 No.s)</label>
          <textarea name="pdt_details" className="h-48 w-full" id="pdt_details" placeholder="" required onChange={(e)=>setFormdata({...formdata,[e.target.id]:e.target.value})}/>
        </div>
        <button type="submit" className="w-sm sm:w-md mx-auto">SUBMIT</button>

      </form>
    </div> 
  )
}
export default Seller
