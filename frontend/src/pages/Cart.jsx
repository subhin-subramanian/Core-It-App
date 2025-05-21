import { useParams } from "react-router-dom";
import {cards} from '../assets/assets';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Cart() {
  const {cardId} = useParams();
  const [cartItems,setCartItems] = useState([]);
  const {currentUser} = useSelector(state=>state.user);

  useEffect(()=>{setCartItems(cards.find(card=>String(card.id) === cardId))},[cardId]);



  if(!currentUser){
    return( <h1 className="">You must login to view this page</h1>)
  }else{
    return(
      <div className=""></div>
    )
  }
}
export default Cart
