import { Link } from 'react-router-dom'
import logo from '../assets/images/Logo.jpg'

function Home() {
  return (
    <div className='flex flex-col p-10 gap-15 min-h-screen items-center'>

      <p className='text-xl font-semibold text-red-500 italic'>(Important Note:This is a demo site, but you can sign-up and login to checkout the features. In the payment or bank-details sections, don't enter your real payment or banking details)</p>
      
      <div className="flex flex-col md:flex-row gap-15 items-center">
        <img src={logo} alt="logo" className='w-60 lg:w-80 h-60 lg:h-80 rounded-full shadow-2xl' />
        <div className="flex flex-col gap-4">
          <p className='text-[15px] lg:text-xl '><i className='font-semibold'>Welcome to Core It Solutions,<br/></i> your trusted destination for cutting-edge laptops and comprehensive IT solutions. Whether you're a student, a professional, a business, or a tech entusiast, we provide the tools you need to stay connected, productive, and ahead of the curve. <br />
          At <i>Core It Solutions,</i> we offer a curated selection of top-brand laptops - from ultrabooks and gaming rigs to business workstations - designed to fit every need and budget. Beyond readymade hardwares, we specialize in tailored PC solutions. You can configure your own PC and got a sample quotation and suggestions by clicking the button below.
          </p>
          <div className="font-semibold flex flex-col sm:flex-row items-center gap-5 lg:gap-10  ">
            <Link to={'/configure'} className='w-56'>
              <button className=''>Configure Your Own PC</button> 
            </Link>
            <Link to={'/cart'} className='w-44'>
              <button className='!bg-white !text-lime-600 border-2'>Go to Your Cart</button>  
            </Link>

          </div>
        </div>
      </div>

    </div>
   
  )
}

export default Home
