import { useLocation } from "react-router-dom"

function PaySuccess() {

    const query = new URLSearchParams(useLocation().search);
    const reference = query.get("reference");
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="p-10 flex flex-col gap-2 bg-white border border-gray-300 p-5 rounded shadow-md">
        <h1 className="pb-5 font-bold text-center ">Payment Successful</h1>
        <p>Your payment is successful, thank you for shopping with us</p>
        {reference && 
         <p className="border p-2 rounded-lg"><strong>Reference Id:</strong>{reference}</p>}
      </div>
    </div>
  )
}

export default PaySuccess
