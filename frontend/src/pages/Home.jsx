import { Link } from 'react-router-dom'
import logo from '../assets/images/Logo.jpg'

function Home() {
  return (
    <div className='flex flex-col md:flex-row p-10 sm:px-25 gap-10 lg:gap-15 min-h-screen justify-center items-center'>
      
      <img src={logo} alt="logo" className='w-60 lg:w-80 h-60 lg:h-80 rounded-full shadow-2xl' />

      <div className="flex flex-col gap-4">
        <p className='text-[15px] lg:text-xl '><i className='font-semibold'>Welcome to Core It Solutions,<br/></i> your trusted destination for cutting-edge laptops and comprehensive IT solutions. Whether you're a student, a professional, a business, or a tech entusiast, we provide the tools you need to stay connected, productive, and ahead of the curve. <br />
        At <i>Core It Solutions,</i> we offer a curated selection of top-brand laptops - from ultrabooks and gaming rigs to business workstations - designed to fit every need and budget. Beyond readymade hardwares, we specialize in tailored PC solutions. You can configure your own PC and got a sample quotation and suggestions by clicking the button below.
        </p>
        <div className="font-semibold flex flex-col lg:flex-row gap-5 lg:gap-10  w-full">
          <button className=' flex justify-center items-center'>Configure Your Own PC</button> 
          <Link to={'/cart'}>
            <button className='flex justify-center !bg-white !text-lime-600 border-2'>Go to Your Cart</button>  
          </Link>

        </div>
     </div>

    </div>
   
  )
}

export default Home
