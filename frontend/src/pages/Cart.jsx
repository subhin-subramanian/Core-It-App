import {cards} from '../assets/assets';
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { Link} from 'react-router-dom'

function Cart() {
  const [cartItems,setCartItems] = useState([]);
  const [del_Address,setDel_Address] = useState({});
  const {currentUser} = useSelector(state=>state.user);
  const [cartError,setCartError] = useState('');
  const [successMsg,setSuccessMsg] = useState('');
  
  
  
  // Useeffect to get the cart while loading
  useEffect(()=>{
    const fetchCart = async()=>{
      setCartError('');
      try {
        const res = await fetch(`/api/cart/get-cart/${currentUser._id}`);
        const data = await res.json();
        if(!res.ok){
          return setCartError(data.message);
        }
        setCartItems(data)       
      } catch (error) {
        setCartError(error.message); 
      }
    }
    if(currentUser){
      fetchCart();
    }
  },[currentUser],[cartItems]);

  // Useeffect to get the delivery address
  useEffect(()=>{
    const fetchDel_Add = async()=>{
      try {
        const res = await fetch(`/api/user/del-address/get/${currentUser._id}`);
        const data = await res.json();
        setDel_Address({name:data.name,
            email:data.email,
            country:data.country,
            street_address:data.street_address,
            city:data.city,
            region:data.region,
            post_code:data.post_code,
            phone:data.phone
        });
      } catch (error) {
          console.log(error.message);
      }
  }
  if(currentUser) fetchDel_Add();
  },[currentUser]);

  // Function to update qty in the cart
  const handleUpdate = async(id,qty)=>{
    setCartError('');
    try {
      const res = await fetch(`/api/cart/update/${currentUser._id}`,{
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({id,qty})
      });
      const data = await res.json();
      if(!res.ok){
        return setCartError(data.message);
      }
      setCartItems(data);
      setSuccessMsg('Cart item quantity updated successfully');   
      setTimeout(() => {
        setSuccessMsg('');
      }, 5000);    
    } catch (error) {
      setCartError(error.message); 
    }
  }

  // Function to remove an item from cart
  const handleRemove = async(id)=>{
    setCartError('');
    try {
      const res = await fetch(`/api/cart/remove/${currentUser._id}`,{
        method:'DELETE',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({id})
      });
      const data = await res.json();
      if(!res.ok){
        return setCartError(data.message);
      }
      console.log(data);
      
      setCartItems(data); 
      setSuccessMsg('Cart item removed');   
      setTimeout(() => {
        setSuccessMsg('');
      }, 5000); 
    } catch (error) {
      setCartError(error.message); 
    }
  }

  // Function to seperate each row of the cart, so that it doesn't violate hook rules of react.
  function CartRow({item,product,onUpdate}){
     const [qty,setQty] = useState(item.quantity);
     return(
        <tr key={product.id} className='border-b border-gray-300'>
          <td><img src={product.image} alt='product' className='w-8 sm:w-16 h-4 sm:h-10 object-contain m-3'/></td>
          <td className='hidden sm:table-cell'><p>{product.title}</p></td>
          <td><p>{product.price}</p></td>
          <td className=' gap-2'>
            {product.quantity > 0 ? 
            <>
            <input type="number" className='w-12 h-7 mr-2 text-sm' value={qty}  min={'1'} onChange={(e)=>setQty(e.target.value)}/>
            <button className='!py-1 !text-sm' onClick={()=>onUpdate(product.id,parseInt(qty))}>Update</button>
            </> : <span className='text-orange-500'>Out of Stock</span>}
          </td>
          <td><p>₹{product.quantity > 0 ? (parseFloat(product.price.replace(/[^\d.]/g, '').replace(/,/g, ''))* item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}</p></td>
          <td><IoMdClose className='flex mx-auto sm:mx-5 text-red-600 font-bold sm:text-2xl cursor-pointer' onClick={()=>handleRemove(product.id)}/></td>
        </tr>
      )
  }

  // Function to calculate the total cost of items in the cart
  const totalCost = useMemo(()=>{
    return cartItems.reduce((acc,item)=>{
      const product = cards.find(card=>String(card.id) === String(item.id));
      if(!product) return acc;
      const price = parseFloat(product.price.replace(/[^\d.]/g, '').replace(/,/g, ''));
      return acc + price *(product.quantity > 0 ? item.quantity : 0);
    },0);
  },[cartItems]);

  // Function to payment process page
  const handlePaymentProcess = async()=>{
    const amount =Math.round(totalCost + (0.1 * totalCost)+(totalCost > 1000 ? 0 : 100));
    let order,key;

    try {
      const res = await fetch('/api/payment/process',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({amount})
      })
      const orderData= await res.json();
      order = orderData.order;
      if(!res.ok){
        return console.log('Payment process error: ' + order.message);
      }
    } catch (error) {
      console.log('Payment process error: ' + error); 
    }

    try {
      const res = await fetch('/api/payment/get-key')
      const keyData = await res.json();
      key = keyData.key;
    } catch (error) {
      console.log('Payment process error: ' + error);
    }
    // Razorpay payment verification
    const options = {
        key,
        amount,
        currency: 'INR',
        name: 'Core It Solutions',
        description: 'Test Transaction',
        order_id: order.id, // This is the order_id created in the backend
        callback_url: '/api/payment/verification', // Your success URL
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();  
  }

  if(!currentUser){
    return( <h1 className="min-h-screen flex justify-center items-center text-orange-500">You must login to view this page</h1>)
  }else{
    return(
      <div className="min-h-screen w-xl sm:w-full">
        <h1 className='text-center !text-4xl py-15 text-gray-800 text-shadow-lg text-shadow-green-300'>Your Cart</h1>
        {cartError && <span className='bg-red-200 text-red-600'>{cartError}</span>}

        {successMsg && <span className='bg-green-200 text-green-600 flex mx-auto justify-center mb-2 p-4 w-md rounded-lg'>{successMsg}</span>}

        {cartItems.length === 0 ? <p className='flex justify-center items-center'>Your Cart is empty</p>:(
        
        <div className="overflow-x-auto sm:px-10">
          {/* Table for cart items */}
          <table className='w-full text-left text-xs sm:text-[15px]'>
            <thead className='bg-gray-100'>
              <tr className='border-b border-gray-400'>
                <th className='p-1 sm:p-3'>Pdt Image</th>
                <th className='hidden sm:table-cell'>Title</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Total Cost</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody className=''>
              {cartItems.map(item=>{
              const product = cards.find(card=>String(card.id)===String(item.id));
              if(!product) return null;
              return(
                <CartRow key={product.id} item={item} product={product} onUpdate={handleUpdate}/>
              )
              })}
            </tbody>

          </table>
          <span className='text-orange-500 italic  my-5 flex'>NB:Some items in your cart is may be out of stock. But if you want, you can checkout the items available right now. When the items comes in our stock your cart will be updated automatically. Sorry for your inconvenience.</span>
        </div>)}

        <div className="flex flex-col md:flex-row">
          {/* Final Bill */}
          <div className="p-10 flex flex-col gap-5 w-xl">
            <h1 className='underline underline-offset-8'>Your Bill</h1>

            <div className="grid grid-cols-2 mt-2">
              
              <span>Total Item Cost</span>
              <span>: ₹ {totalCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>

              <span>GST (10%)</span>
              <span>: ₹ {(0.1 * totalCost).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>

              <span>Delivery Charges <span className='italic'>(Free shipping for orders above 10,000 Rs/-)</span></span>
              <span>: ₹ {totalCost > 10000 ? 0 : ((0.1 * totalCost).toLocaleString('en-IN', { minimumFractionDigits: 2 }))}</span>

              <span className='font-bold mt-2 text-xl'>Sum Total</span>
              <span  className='font-bold text-xl'>: ₹{(totalCost + (0.1 * totalCost)+(totalCost > 1000 ? 0 : 100)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <button onClick={handlePaymentProcess} className='flex mt-3 w-sm justify-center shadow-lg'>Proceed to Payment</button>
          </div>
          {/* Delivery Address */}
          <div className="p-10 flex flex-col gap-3 w-sm">
            <h1 className='underline underline-offset-8'>Delivery Address</h1>
            <div className="grid grid-cols-2 mt-2">
              <span>Name</span>
              <span>: {del_Address.name}</span>

              <span>Country</span>
              <span>: {del_Address.country}</span>

              <span>Street Address</span>
              <span>: {del_Address.street_address}</span>

              <span>City</span>
              <span>: {del_Address.city}</span>

              <span>State/Province</span>
              <span>: {del_Address.region}</span>

              <span>Post Code</span>
              <span>: {del_Address.post_code}</span>

              <span>Email</span>
              <span>: {del_Address.email}</span>

              <span>Contact Phone</span>
              <span>: {del_Address.phone}</span>
            </div> 
            <Link to={'/del-add'} className='hover:!scale-[1.0]'>
              <button className='flex mt-3 w-80 justify-center shadow-lg'>Change/Edit Delivery Address</button>
            </Link>   
          </div>
        </div>

      </div>
    )
  }
}
export default Cart
