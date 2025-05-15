import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { LuTwitter } from "react-icons/lu";
import { TbBrandWhatsapp } from "react-icons/tb";

function footer() {
  return (
    <section className='flex flex-col border-t-4 border-t-fuchsia-700 text-white py-4 gap-10'>
        <div className='flex flex-wrap gap-25 justify-center items-center'>

       
        <div className='flex flex-col '>
            <div className='flex m-2'>
                <img src="LaunchSphere2.png" alt=""  className='w-[70px] h-[60px]'/>
                <h2 className=' text-2xl mt-2'>𝕃𝕒𝕦𝕟𝕔𝕙𝕊𝕡𝕙𝕖𝕣𝕖</h2>
            </div>
            <div className='flex flex-col m-2'>
                <h2 className='text-lg'>Join the LaunchSphere Community</h2>
                <p className=' text-sm'>Connect with us on social media and stay <br/> updated with the latest news and events.</p>              
            </div>            
             <div className='flex m-1'>
                 <a href="https://www.facebook.com/LaunchSphere" target="_blank" rel="noopener noreferrer">
                     
                     <FiFacebook className='w-[30px] h-[30px] mx-2' />
                 </a>
                 <a href="https://twitter.com/LaunchSphere" target="_blank" rel="noopener noreferrer">
                     
                     <LuTwitter className='w-[30px] h-[30px] mx-2' />
                 </a>
                 <a href="https://www.instagram.com/LaunchSphere" target="_blank" rel="noopener noreferrer">
                     
                     <FaInstagram className='w-[30px] h-[30px] mx-2' />
                 </a>
                 <a href="https://wa.me/LaunchSphere" target="_blank" rel="noopener noreferrer">
                     
                     <TbBrandWhatsapp className='w-[30px] h-[30px] mx-2' />
                 </a>
             </div>        
        </div>
        
         <div className='flex flex-col m-2'>
            <h2 className='text-lg m-2'>Quick Links</h2>
            <ul className='flex flex-col'>
                <li className='m-2'><a href="#">Home</a></li>
                <li className='m-2'><a href="#">About Us</a></li>
                <li className='m-2'><a href="#">Services</a></li>
                <li className='m-2'><a href="#">Contact Us</a></li>
            </ul>
        </div>
        <div className='flex flex-col m-2'>
            <h2 className='text-lg m-2'>Resourses</h2>
            <ul className='flex flex-col'>
                <li className='m-2'><a href="#">Blog</a></li>
                <li className='m-2'><a href="#">Tutorials</a></li>
                <li className='m-2'><a href="#">Help Center</a></li>
                <li className='m-2'><a href="#">support</a></li>
            </ul>
        </div>
         <div className='flex flex-col m-2'>
            <h2 className='text-lg m-2'>Legal</h2>
            <ul className='flex flex-col'>
                <li className='m-2'><a href="#">Return policy</a></li>
                <li className='m-2'><a href="#">FAQs</a></li>
                <li className='m-2'><a href="#">privacy policy</a></li>
                <li className='m-2'><a href="#">Terms</a></li>
            </ul>
        </div>
        <div className='flex flex-col m-2 gap-3'>
            <h2 className='text-lg m-2'>Office</h2>
             <p> KIT Collage of Engineering Kolhapur, <br /> Gokul Shirgaon Maharashtra, <br /> PIN 416234, India</p>
                <p> Email:launchsphere@gamil.com</p>
                <p> Phone: +91 1234567890</p>   
        </div>
         </div>
        <div className='flex flex-col items-center'>
            <p className='text-center text-sm'>© 2023 LaunchSphere. All rights reserved.</p>
            <p className='text-center text-sm'>Made with ❤️ by LaunchSphere Team</p>
        </div>
        
    </section>
  )
}

export default footer