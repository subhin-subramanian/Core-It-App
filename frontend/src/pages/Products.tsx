import { BiSearchAlt2 } from "react-icons/bi";
import { cards } from '../assets/assets'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { IProducts } from "../types/types";


type Category = "All" | "Laptop" | "Printer" | "Accessories";

function Products() {

  const [category,setCategory] = useState <Category> ('All');
  const {currentUser} = useSelector((state : RootState)=>state.user);
  const [cartError,setCartError] = useState <string> ('');
  const [searchTerm,setSearchTerm] = useState <string> ('');
  const [pdtcards,setPdtCards] = useState <IProducts[]> (cards);
  const navigate = useNavigate();
  
  // Useeffect to set timeout for error messages
  useEffect(()=>{
      setTimeout(() => {setCartError('')}, 8000);
    },[cartError]);
  
  // Function for adding an item to the cart
  const handleAddToCart = async(cardId:number)=>{
    if(!currentUser) return setCartError('Login to your account first to add items to the cart');
    setCartError('');
    try {
      const res = await fetch(`/api/cart/add/${currentUser._id}`,{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({cardId}),
        });
      const data = await res.json();
      if(!res.ok){
        return setCartError(data.message);
      }
      navigate('/cart');
    } catch (error:any) {
      setCartError(error.message);
    }
  }

  // Function to filter cards as per search
  const handleSearchSubmit =  async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setPdtCards(cards.filter(
      (card) => 
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        card.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
        card.specifications.toLowerCase().includes(searchTerm.toLowerCase()
    )));
  }

  return (
    <div className="flex flex-col min-h-screen">

      {/* The top search section */}
      <div className='flex flex-col gap-5 py-5 px-10 lg:flex-row lg:gap-25 items-center'>

        <div className="flex gap-3">
          <label htmlFor="category" className='sm:text-xl'>Category</label>
          <select id="category" className="!p-3" value={category} onChange={(e)=>setCategory(e.target.value as Category)}>
            <option value="All">All</option>
            <option value="Laptop">Laptops</option>
            <option value="Printer">Printers</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <form className="relative" onSubmit={handleSearchSubmit}>
          <input type="text" placeholder="Search..." className="w-72" onChange={(e)=>setSearchTerm(e.target.value)}/>
          <BiSearchAlt2 type="submit" className="text-gray-500  cursor-pointer text-xl absolute left-65 top-1/2 -translate-y-1/2"/>
        </form>

        <p className="">(Select a category of product or type a keyword of the product.)</p>

      </div>

      {/* Divider */}
      <div className="h-0.5 bg-lime-300"></div>

      {cartError && <span className='bg-red-200 text-red-600'>{cartError}</span>}

      {/* Category icons */}
      <div className="flex gap-5 mt-5 mx-auto">
        <span className={`select-category ${category === 'All' && 'bg-lime-600 text-white'}`} onClick={()=>setCategory('All')}>All</span>
        <span className={`select-category ${category === 'Laptop' && 'bg-lime-600 text-white'}`} onClick={()=>setCategory('Laptop')}>Laptops</span>
        <span className={`select-category ${category === 'Printer' && 'bg-lime-600 text-white'}`} onClick={()=>setCategory('Printer')}>Printers</span>
        <span className={`select-category ${category === 'Accessories' && 'bg-lime-600 text-white'}`} onClick={()=>setCategory('Accessories')}>Accessories</span>
      </div>
   
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
        {pdtcards.map(card=>{
          if(category === 'All' || category === card.category){
            return(
              <div className="p-3 border rounded-lg flex flex-col gap-4 " key={card.id}>
                <img src={card.image} alt="pdt-img" className="w-60 md:w-100 md:h-45 self-center"/>
                <h1>{card.title}</h1>
                <span className="text-black">{card.category}</span>
                <span className="bg-lime-400 rounded-2xl text-white font-semibold w-32 text-center">{card.quantity >0 ? 'In Stock' : 'Out of Stock'}</span>
                <p className="text-sm flex-grow">{card.specifications}</p>
                <div className="flex gap-4  items-center font-bold text-black pb">
                  <span>{card.price}</span>
                  <span className="bg-orange-500 rounded-full text-white px-3">{card.discount} off</span>
                </div>
                <button className="border border-lime-600 font-bold w-full hover:!bg-white hover:!text-lime-600 duration-300" onClick={()=>handleAddToCart(card.id)}>Add to cart</button>
              </div>
            )}
           })}
      </div>
      
    </div>
  )
}

export default Products
