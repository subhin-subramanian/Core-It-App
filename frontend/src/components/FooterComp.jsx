import { FaFacebook,FaInstagram,FaTwitter,FaGithub,FaDribbble,FaEnvelope,FaPhone,FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom'

function FooterComp() {
  return (
    <footer className="border-t-5 rounded-lg flex flex-col sm:flex-row gap-5 justify-between px-20 py-10">
      <div className="flex flex-col">
        <h1>Links</h1>
        <Link to={'/'}>Home</Link>
        <Link to={'/products'}>Products</Link>
        <Link to={'/configure'}>Configure PC</Link>
        <Link to={'/about'}>About</Link>
        <Link to={'/seller'}>Become a Seller</Link>
      </div>
      <div className="">
        <h1>Contact Us</h1>
        <p className="flex pt-1">42, MG Road, Near Central Mall, Bengaluru, Karnataka, India.</p>
        <span className="flex items-center gap-2 py-2"><FaEnvelope/>Sales@coreitsolutions.com</span>
        <span className="flex items-center gap-2 "><FaPhone/>+91 963258741</span>
        <span className="flex items-center gap-2 pt-2"><FaWhatsapp/>+91 987654322</span>
      </div>
      <div>
        <h1>Follow Us</h1>
        <div className="flex gap-3 mt-5">
          <FaFacebook/>
          <FaInstagram/>
          <FaTwitter/>
          <FaGithub/>
          <FaDribbble/>
        </div>
      </div>
      
    </footer>
  )
}

export default FooterComp
