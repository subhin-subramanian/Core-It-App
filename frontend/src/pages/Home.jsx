import logo from '../assets/images/Logo.jpg'

function Home() {
  return (
    <div className='flex flex-col md:flex-row py-15 px-10 sm:px-25 gap-25'>
      
      <img src={logo} alt="logo" className='w-full h-full rounded-full shadow-2xl' />

      <div className="flex flex-col gap-4">
        <p className='text-[15px] sm:text-xl '><i className='font-semibold'>Welcome to Core It Solutions,<br/></i> your trusted destination for cutting-edge laptops and comprehensive IT solutions. Whether you're a student, a professional, a business, or a tech entusiast, we provide the tools you need to stay connected, productive, and ahead of the curve. <br />
        At <i>Core It Solutions,</i> we offer a curated selection of top-brand laptops - from ultrabooks and gaming rigs to business workstations - designed to fit every need and budget. Beyond readymade hardwares, we specialize in tailored PC solutions. You can configure your own PC and got a sample quotation and suggestions by clicking the button below.
        </p>
        <button className='w-md mx-auto font-semibold'>Configure Your Own PC</button>   
     </div>

    </div>
   
  )
}

export default Home
