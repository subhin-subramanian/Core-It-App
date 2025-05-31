import { useState } from "react"
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


function Configure() {
    const {currentUser} = useSelector(state=>state.user);
    const [error,setError] = useState(null);
    const [subPlan,setSubPlan] = useState(null);
    const navigate = useNavigate();
    const [formData,setFormData] = useState({userId:currentUser._id});
    
    // Function to save formdata
    const handleChange = (e)=>{
      setFormData({...formData,[e.target.id]:e.target.value})
    }
    
    // Function to add or edit delivery address when the save button presses
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError(null);
        try {
          const res = await fetch(`/api/user/quote-rqst`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData)
          });
          const data = await res.json();
          if(!res.ok){
            return setError(data.message);
          }
          navigate('/');  
        } catch (error) {
          setError(error.message);
        }
    }

  if(!currentUser){
    return (<h1 className="flex justify-center items-center">To configure your own PC. Create an account first, then sign in and subscribe.</h1>)
  }
  // else if(currentUser && !currentUser.subscription){
  //   return (
  //   <div className="min-h-screen flex flex-col  m-3 sm:m-25 gap-5 sm:gap-10">
      
  //     <p className="font-semibold text-xl md:text-2xl italic">To configure your own PC, you must have a subscription. These are our subscription plans. Select a plan and proceed to payment for subscription. Once you're done, you can come back to this page and configure your PC.</p>

  //     <div className="flex flex-col gap-5">
  //       <div className="flex gap-2 items-center">
  //         <input type="radio" name="plan" value='basic' onChange={(e)=>setSubPlan(e.target.value)}/>
  //         <label htmlFor="radio" className="font-bold">BASIC</label> 
  //         <span className="italic">100.00 Rs/- for 1 Month (You can request 10 quotes max.)</span>
  //       </div>
  //       <div className="flex gap-2 items-center">
  //         <input type="radio" name="plan" value='standard' onChange={(e)=>setSubPlan(e.target.value)}/>
  //         <label htmlFor="radio" className="font-bold">STANDARD</label> 
  //         <span className="text-orange-400">(SAVE 100.00 Rs/-)</span>
  //         <span className="italic">500.00 Rs/- for 6 Months (You can request 20 quotes/month)</span>
  //       </div>
  //       <div className="flex gap-2 items-center">
  //         <input type="radio" name="plan" value='premium' onChange={(e)=>setSubPlan(e.target.value)}/>
  //         <label htmlFor="radio" className="font-bold">PREMIUM</label>
  //         <span className="text-orange-400">(SAVE 200.00 Rs/-)</span>
  //         <span className="italic">1,000.00 Rs/- for 1 year (You can request unlimited quotes/month)</span> 
  //       </div>
  //     </div>
  //     <Link className="mx-auto ">
  //       <button className="w-sm font-bold !bg-blue-950">SUBSCRIBE</button>
  //     </Link>
  //   </div>)
  // }
  else{
  return (
    <div className='flex flex-col m-10'>

      {error && <span className="bg-red-200 text-red-600 mb-2 ">{error}</span>}

      {/* {(currentUser && currentUser.subscription) && } */}

      <form className='flex flex-col gap-10' onSubmit={handleSubmit}>

        {/* CPU */}
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="flex flex-col">
            <label htmlFor='cpu' className='text-sm ml-0.5'>Select your CPU</label>
            <select id="cpu" name="cpu" onChange={handleChange}>
              <option value=''>Select CPU</option>
              <option value="Intel Core i3">Intel Core i3</option>
              <option value="AMD Ryzen 3">AMD Ryzen 3</option>
              <option value="Intel Core i5">Intel Core i5</option>
              <option value="AMD Ryzen 5">AMD Ryzen 5</option>
              <option value="Intel Core i7">Intel Core i7</option>
              <option value="AMD Ryzen 7">AMD Ryzen 7</option>
              <option value="Intel Core i9">Intel Core i9</option>
              <option value="AMD Ryzen 9">AMD Ryzen 9</option>
            </select>
          </div>
          <p className="border-orange-400 text-orange-400">✅ For basic tasks, light development, office work : use core i3 or Ryzen 3<br/>✅ For programming, multitasking, gaming, content creation : use core i5 or Ryzen 5<br/>✅ For gaming, video editing, heavy development, VMs : use core i7 or Ryzen 7<br/>✅ For Heavy content creation, simulations, large software builds: use core i9 or Ryzen 9</p>
        </div>

        {/* RAM */}
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div>
            <label htmlFor='ram' className='text-sm ml-0.5'>Select your RAM</label>
            <select id="ram" name="ram" onChange={handleChange}>
              <option value=''>Select RAM</option>
              <option value="Corsair Vengeance LPX DDR4">Corsair Vengeance LPX DDR4</option>
              <option value="Corsair Vengeance DDR5">Corsair Vengeance DDR5</option>
              <option value="G.Skill Ripjaws V DDR4">G.Skill Ripjaws V DDR4</option>
              <option value="ADATA XPG Gammix D30 DDR4">ADATA XPG Gammix D30 DDR4</option>
              <option value="Crucial Ballistix DDR4">Crucial Ballistix DDR4</option>
              <option value="G.Skill Ripjaws S5 DDR5">G.Skill Ripjaws S5 DDR5</option>
              <option value="Kingston Fury Beast DDR5">Kingston Fury Beast DDR5</option>
              <option value="ADATA Lancer DDR5 RGB">ADATA Lancer DDR5 RGB</option>
            </select>            
          </div>
          <div>  
            <label htmlFor='ram_size' className='text-sm ml-0.5'>Size</label>             
            <select id="ram_size" name="ram_size" onChange={handleChange}>
              <option value=''>size</option>
              <option value="8 GB">8 GB</option>
              <option value="16 GB">16 GB</option>
              <option value="32 GB">32 GB</option>
            </select>       
          </div>
          <p className="border-orange-400 text-orange-400">( DDR4 is best paired with AMD Ryzen 3000/5000 or Intel 10th–12th gen CPUs, DDR5 is compatible with newer platforms: AMD Ryzen 7000 series and Intel 12th/13th/14th gen.<br/> ✅ Budget builds (basic dev & home use): 8GB DDR4 3200 MHz<br/>✅ Standard development, multitasking: 16GB DDR4 3200–3600 MHz<br/>✅ Gaming or heavy dev work (e.g. VMs, Docker): 32GB DDR4/DDR5)</p>

        </div>

        {/* Storage */}
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="flex flex-col">
            <label htmlFor='storage' className='text-sm ml-0.5'>Select your Storage</label>
            <select id="storage" name="storage" onChange={handleChange}>
              <option value=''>Select Storage</option>
              <option value="WD Black SN770	1TB	NVMe Gen4">WD Black SN770	1TB	NVMe Gen4</option>
              <option value="Samsung 980	500GB	NVMe Gen3">Samsung 980	500GB	NVMe Gen3</option>
              <option value="Crucial P3 Plus	1TB	NVMe Gen4">Crucial P3 Plus	1TB	NVMe Gen4</option>
              <option value="Kingston NV2	1TB	NVMe Gen4">Kingston NV2	1TB	NVMe Gen4</option>
              <option value="Samsung 990 Pro	1TB	NVMe Gen4">Samsung 990 Pro	1TB	NVMe Gen4</option>
              <option value="Crucial MX500	500GB	SATA">Crucial MX500	500GB	SATA</option>
              <option value="Samsung 870 EVO	500GB	SATA">Samsung 870 EVO	500GB	SATA</option>
              <option value="WD Green / Blue	240GB–1TB	SATA">WD Green / Blue 240GB–1TB	SATA</option>
              <option value="WD Blue 7200RPM	1TB HDD">WD Blue 7200RPM	1TB HDD</option>
              <option value="Seagate Barracuda	2TB HDD">Seagate Barracuda	2TB HDD</option>
              <option value="Toshiba P300	1TB HDD">Toshiba P300	1TB HDD</option>
            </select>            
          </div>
          <p className="border-orange-400 text-orange-400">.<br/> ✅ Use NVMe for: OS drive, software development (IDE, compilers), high-speed data loading.<br/>✅ Use SATA SSDs for: Secondary storage, budget systems, general apps.<br/>✅ Use HDDs for: Non-critical storage — NOT recommended for OS or dev tools.</p>
        </div>

        {/* GPU */}
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="flex flex-col">
            <label htmlFor='GPU' className='text-sm ml-0.5'>Select your GPU</label>
            <select id="GPU" name="GPU" onChange={handleChange}>
              <option value=''>Select GPU</option>
              <option value="NVIDIA GT 1030">NVIDIA GT 1030</option>
              <option value="AMD Radeon RX 6400">AMD Radeon RX 6400</option>
              <option value="Intel Arc A380">Intel Arc A380</option>
              <option value="NVIDIA GTX 1650">NVIDIA GTX 1650</option>
              <option value="AMD Radeon RX 6600">AMD Radeon RX 6600</option>
              <option value="Intel Arc A750">Intel Arc A750</option>
              <option value="NVIDIA RTX 3050">NVIDIA RTX 3050</option>
              <option value="NVIDIA RTX 3060">NVIDIA RTX 3060</option>
              <option value="AMD Radeon RX 6700 XT">AMD Radeon RX 6700 XT</option>
              <option value="NVIDIA RTX 4060 Ti">NVIDIA RTX 4060 Ti</option>
              <option value="NVIDIA RTX 4070">NVIDIA RTX 4070</option>
              <option value="NVIDIA RTX 4070 Ti">NVIDIA RTX 4070 Ti</option>
              <option value="AMD Radeon RX 7900 XT">AMD Radeon RX 7900 XT</option>
            </select>            
          </div>
          <p className="border-orange-400 text-orange-400">• If you're not gaming or doing GPU-heavy development (e.g., 3D, ML), iGPU (integrated graphics) like those on Ryzen G-series (5600G, 8700G) or Intel Core i5/i7 with UHD/IRIS Xe might be sufficient.<br/>• NVIDIA GPUs are preferred for CUDA or machine learning.<br/>• AMD GPUs offer better value for raw performance, especially at 1080p.</p>
        </div>

        {/* Motherboard */}
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="flex flex-col">
            <label htmlFor='motherboard' className='text-sm ml-0.5'>Select your Motherboard</label>
            <select id="motherboard" name="motherboard" onChange={handleChange}>
              <option value=''>Select Motherboard</option>
              <option value="Gigabyte H610M H DDR4">Gigabyte H610M H DDR4</option>
              <option value="MSI PRO B660M-A DDR4">MSI PRO B660M-A DDR4</option>
              <option value="ASUS TUF Gaming B660-Plus DDR4">ASUS TUF Gaming B660-Plus DDR4</option>
              <option value="Gigabyte Z690 UD DDR4">Gigabyte Z690 UD DDR4</option>
              <option value="ASRock A320M-HDV R4.0">ASRock A320M-HDV R4.0</option>
              <option value="MSI B450M PRO-VDH MAX">MSI B450M PRO-VDH MAX</option>
              <option value="ASUS TUF B550M-PLUS WiFi">ASUS TUF B550M-PLUS WiFi</option>
              <option value="MSI MAG B550 Tomahawk">MSI MAG B550 Tomahawk</option>
              <option value="ASRock B650M-HDV/M.2">ASRock B650M-HDV/M.2</option>
              <option value="MSI B650M Mortar WiFi">MSI B650M Mortar WiFi</option>
              <option value="ASUS TUF Gaming X670E-PLUS">ASUS TUF Gaming X670E-PLUS</option>
            </select>            
          </div>
          <p className="border-orange-400 text-orange-400">• For Budget build :	A320 (AM4), H610 (Intel)<br/>• Mainstream dev/gaming : B450/B550, B660/B760<br/>• Future-proofing :	B650/X670 (AM5), Z690+<br/>• Overclocking & PCIe 5 : Z690/Z790, X670E</p>
        </div>

        {/* PSU */}
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="flex flex-col">
            <label htmlFor='PSU' className='text-sm ml-0.5'>Select your PSU</label>
            <select id="PSU" name="PSU" onChange={handleChange}>
              <option value=''>Select PSU</option>
              <option value="Ant Esports VS500L">Ant Esports VS500L</option>
              <option value="Zebronics Zeb-VS550">Zebronics Zeb-VS550</option>
              <option value="Corsair CV450">Corsair CV450</option>
              <option value="Cooler Master MWE 450">Cooler Master MWE 450</option> 
              <option value="Corsair CV550">Corsair CV550</option>
              <option value="Antec CSK 550">Antec CSK 550</option>
              <option value="Deepcool PK650D">Deepcool PK650D</option>
              <option value="Cooler Master MWE 650 Bronze">Cooler Master MWE 650 Bronze</option>
              <option value="Corsair RM750">Corsair RM750</option>
              <option value="Seasonic Focus GX-750">Seasonic Focus GX-750</option> 
              <option value="ASUS TUF Gaming 850W Gold">ASUS TUF Gaming 850W Gold</option>
              <option value="Corsair RM850x">Corsair RM850x</option>
            </select>            
          </div>
          <p className="border-orange-400 text-orange-400 items-center">• <i>The number shown in the model is the wattage rating, select by checking this.</i><br/>• If you have no dedicated GPU : use 400–450W.<br/>• If you have GTX 1650 / RX 6400 : use 450–500W.<br/>• If you have RTX 3060 / RX 6600 / Arc A750 : 550–650W.<br/>• If you have RTX 4070 / RX 7900 XT : 750–850W</p>
        </div>

        {/* Casing */}
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="flex flex-col">
            <label htmlFor='casing' className='text-sm ml-0.5'>Select your Case</label>
            <select id="casing" name="casing" onChange={handleChange}>
              <option value=''>Select Case</option>
              <option value="Zebronics Zeb-Cronus">Zebronics Zeb-Cronus</option>
              <option value="Ant Esports ICE-200TG">Ant Esports ICE-200TG</option>
              <option value="Chiptronex MX1 RGB">Chiptronex MX1 RGB</option>
              <option value="Circle Gaming Phoenix">Circle Gaming Phoenix</option>
              <option value="Ant Esports ICE-511MT">Ant Esports ICE-511MT</option>
              <option value="Cooler Master MasterBox Q300L">Cooler Master MasterBox Q300L</option>
              <option value="NZXT H510">NZXT H510</option>
              <option value="Corsair 4000D Airflow">Corsair 4000D Airflow</option>
              <option value="Lian Li LANCOOL 216">Lian Li LANCOOL 216</option>
              <option value="Fractal Design Meshify C">Fractal Design Meshify C</option>
              <option value="NZXT H7 Flow">NZXT H7 Flow</option>
              <option value="Corsair iCUE 4000X RGB">Corsair iCUE 4000X RGB</option>            
            </select>            
          </div>
          <p className="border-orange-400 text-orange-400 items-center"><i>Consider these factors while choosing the case:-</i><br/>• ATX/mATX Support (Match your motherboard size (ATX, Micro-ATX, etc.)).<br/>• Front Mesh (Panel	Improves airflow and cooling)<br/>• Fan Slots / Fans	(More pre-installed fans = better cooling)<br/>• Cable Management	Clean build, easier airflow GPU Clearance	Some cases don't fit longer GPUs<br/>• PSU Shroud	Hides cables and improves airflow</p>
        </div>

        {/* Cooling System */}
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="flex flex-col">
            <label htmlFor='cooling' className='text-sm ml-0.5'>Select the Cooling System</label>
            <select id="cooling" name="cooling" onChange={handleChange}>
              <option value=''>Select the Cooling System</option>
              <option value="Deepcool GAMMAXX 400 V2">Deepcool GAMMAXX 400 V2</option>
              <option value="Cooler Master Hyper H410R">Cooler Master Hyper H410R</option>
              <option value="Ant Esports ICE-C612">Ant Esports ICE-C612</option>
              <option value="Thermaltake UX100 ARGB">Thermaltake UX100 ARGB</option>
              <option value="Cooler Master Hyper 212 Black Edition">Cooler Master Hyper 212 Black Edition</option>
              <option value="be quiet! Pure Rock 2">be quiet! Pure Rock 2</option>
              <option value="Noctua NH-U12S Redux">Noctua NH-U12S Redux</option>
              <option value="Deepcool AK400">Deepcool AK400</option>  
              <option value="Deepcool LE520 240mm AIO">Deepcool LE520 240mm AIO</option>
              <option value="Cooler Master MasterLiquid">Cooler Master MasterLiquid</option>
              <option value="Corsair H100i RGB Elite">Corsair H100i RGB Elite</option>
              <option value="NZXT Kraken 240 RGB">NZXT Kraken 240 RGB</option>       
            </select>            
          </div>
          <p className="border-orange-400 text-orange-400 items-center">• For Basic office / dev builds : Stock cooler or 120mm air cooler<br/>• For Gaming / multitasking : Hyper 212, AK400, Pure Rock 2<br/>• For Overclocked CPUs / silence : Noctua, 240mm AIO<br/>• For RGB aesthetics builds : AIO like Deepcool, NZXT Kraken</p>
        </div>

        {/* Software specs */}
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="flex flex-col">
            <label htmlFor="software" className='text-sm ml-0.5'>Softwares you want</label>
            <textarea id="software" placeholder="Enter the softwares you want" className="w-sm sm:w-md h-40" onChange={handleChange}/>
          </div>
          <p className="border-orange-400 text-orange-400">(Since you selected all the required hardwares form above, now select the softwares you need. For OS you can choose Linux or Windows varients. If you want any other apps or softwares pre-installed, you can specify that too.)</p>
        </div>

        {/* Email */}
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="flex flex-col">
            <label htmlFor='email' className='text-sm ml-0.5'> Enter the email to recieve the quote</label>
            <input id='email' type='email' name="email" placeholder='Enter your Email' className="w-sm sm:w-md" onChange={handleChange} required/>     
          </div>
          <p className="border-orange-400 text-orange-400">(We will sent a detailed quote, assembly and installation help (pdf installation guide and Video links if available) and pointers to improve your choices - to your specified email)</p>
        </div>

        <button className='border border-lime-600 hover:!bg-white hover:!text-lime-600 duration-300 shadow-lg w-sm sm:w-md' type="submit">SUBMIT REQUEST</button>
      </form>
    </div>
  )}
}

export default Configure
