import React, { useState, useEffect ,useRef} from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import { BiSolidPhoneCall } from "react-icons/bi";
import { RiRoadMapFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { FaBrain } from "react-icons/fa6";
import { BsFillLightningFill } from "react-icons/bs";
import { GiInfinity } from "react-icons/gi";
import { LuUserSearch } from "react-icons/lu";
import { Link } from "react-router-dom";

"use client";
import { useTheme } from "next-themes";
import { HeroGeometric } from "../components/ui/shape-landing-hero"
import { Switch } from "@headlessui/react"; // Correct import for Hero UI Switch

import {GradientTextBorderDemo} from "../components/ui/demo"
import {SmoothScrollRotate} from "../components/ui/SmoothScrollRotate"
{/** below is Gsap  */}
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack"; 
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";
// import { ScrollSmoother } from "gsap/ScrollSmoother";

// gsap.registerPlugin(ScrollSmoother) 
gsap.registerPlugin(useGSAP,Flip,ScrollTrigger,Observer,ScrollToPlugin,Draggable,
  MotionPathPlugin,EaselPlugin,PixiPlugin,TextPlugin,RoughEase,ExpoScaleEase,SlowMo,CustomEase);




  
// Moon and Sun Icons for theme toggle
export const MoonIcon = (props) => (
  <svg aria-hidden="true" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" {...props}>
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunIcon = (props) => (
  <svg aria-hidden="true" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" {...props}>
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export default function First() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme(); // Hook from next-themes

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleThemeChange = (enabled) => {
    setTheme(enabled ? "dark" : "light");
  };


  
  useEffect(() => {

  
    // gsap.to(".green", {
    //   rotation: 360,
    //   duration: 2,
    //   repeat: -1,
    //   repeatDelay: 2,
    //   ease: 'none',
    // });
  
    gsap.to(".purple", {
      rotation: 360,
      duration: 2,
      repeat: -1,
      repeatDelay: 0,
      
    });
    // ScrollTrigger.create({
    //   trigger: ".purple",
    //   pin: true,
    //   start: "center center",
    //   end: "+=150",
    
    // });

    gsap.to(".purple", {
      duration: 7,
      ease: "power1.out",
      x: 450,
    });
  
    gsap.to(".green", {
      rotation: 360,
      duration: 7,
      // repeat: -1,
      // repeatDelay: 2,
      
    });
    // ScrollTrigger.create({
    //   trigger: ".green",
    //   pin: true,
    //   start: "center center",
    //   end: "+=150",
    
    // });

    gsap.to(".green", {
      duration: 7,
      ease: "power1.out",
      x: -600,
    });


    

  }, []);
  
 

  return (
    <div className={`flex flex-col min-h-screen  `}>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-purple-950 text-white p-4 transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          <FiX className="text-2xl cursor-pointer" onClick={toggleSidebar} />
        </div>
        {/* <div className="flex p-4 gap-2">
           <p className="text-lg font-bold "><i class="bi bi-sun-fill p-2"> Mode </i></p> 
           Theme Switch 
           <Switch
            checked={theme === "dark"}
            onChange={handleThemeChange}
            className={`${theme === "dark" ? "bg-blue-500" : "bg-gray-500"} relative inline-flex items-center h-7 rounded-full w-12`}
          >
            <span className="sr-only">Toggle theme</span>
            <span
              className={`${theme === "dark" ? "translate-x-6" : "translate-x-1"} inline-block w-5 h-5 transform bg-white rounded-full transition`}
            />
            {theme === "dark" ? <SunIcon className="absolute left-1.5 top-1.5 text-white" /> : <MoonIcon className="absolute left-1.5 top-1.7 text-black" />}
          </Switch> 
        </div> */}
        <ul className="space-y-4">
          <li>
            <a href="/profile" className="flex text-lg font-bold gap-1">
              <CgProfile className="m-1.5" />
              Profile
            </a>
          </li>
          <li>
            <a href="/First" className="flex text-lg font-bold gap-1">
              <FaHome className="m-1.5" />
              Dashboard
            </a>
          </li>
          <li>
           <a href="/chat" className="flex text-lg font-bold gap-1">
              <IoSettings className="mt-1.5 ml-1.5" />
              Chat
            </a>
          </li>
          <li>
           <a href="#" className="flex text-lg font-bold gap-1">
              <IoSettings className="mt-1.5 ml-1.5" />
              Setting
            </a>
          </li>
          <li>
            <a href="#" className="flex text-lg font-bold gap-1">
              <FcAbout className="m-1.5" />
              About
            </a>
          </li>
          <li>
            <a href="#" className="flex text-lg font-bold gap-1">
              <BiSolidPhoneCall className="m-1.5" />
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="flex text-lg font-bold gap-1">
              <RiRoadMapFill className="m-1.5" />
              Roadmap
            </a>
          </li>
          <li>
            <a href="#" className="flex text-lg font-bold gap-1">
              <BiSupport className="m-1.5" />
              Support
            </a>
          </li>
          <li>
            <a href="/" className="flex text-lg font-bold gap-1 text-red-700">
              <MdLogout className="m-1.5" />
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <section>
      <div>
        <button
          className="text-3xl text-purple-700 p-2 top-0 focus:outline-none cursor-pointer"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>


          <div className="ma-5 top-2 ">
            <GradientTextBorderDemo/>
          </div>
      </div>
      </section>
      <section className="m-40">
      <div className="" style={{ display: "flex", gap: "20px" }}>
     
      <div className="box purple rounded-2xl " style={{ width: "150px", height: "150px"}}>
        <img src="flower.png" alt="" />
      </div>
      <div className="box purple rounded-2xl " style={{ width: "150px", height: "150px"}}>
        <img src="flower.png" alt="" />
      </div>
      <div className="box purple rounded-2xl " style={{ width: "150px", height: "150px"}}>
        <img src="flower.png" alt="" />
      </div>
    </div>
          {/* <section>
          <div>
      <SmoothScrollRotate />
      </div>
          </section> */}
      </section>
      <section >
        <div className="flex mt-3 p-10 flex-col h-full gap-10 border-t-4 border-t-fuchsia-800">
            <div className="flex flex-col items-center w-full gap-10">
              <h1 className="font-bold text-5xl">Get ready to Launch your Startup!</h1>
              <p className="text-2xl">Tell us what’s stopping you from building the next big thing!</p>
              <p className="text-2xl">Need help with something? Describe it here...</p>
              <button className="bg-purple-700 text-white border-2 border-purple-600 shadow-lg shadow-purple-600 rounded-lg px-4 py-2 cursor-pointer">Chat With AI</button>
            </div>
            <div className="flex mt-12 flex-wrap justify-around gap-10">
          <div className="flex flex-col h-[270px] w-[270px] rounded-2xl border-2 border-fuchsia-800 shadow-lg shadow-fuchsia-700  ">
            <div>
            <FaBrain  className="mt-3 ml-3 p-2 text-fuchsia-500 border-5 border-fuchsia-700 bg-[#330342] shadow-lg shadow-fuchsia-800 rounded-4xl w-[60px] h-[60px]"/>
            </div>
            <div className="flex flex-col items-center justify-center h-full gap-2">
            <h1 className="text-2xl font-bold text-center">Idea Validator</h1>
            <p className="text-center ">I don’t know how to make a pitch deck that impresses investors</p>
            </div>
            <div className="flex mb-3 justify-center items-center">
              <button className=" m-2 bg-fuchsia-800 w-[90px] h-[40px] rounded-2xl shadow-lg shadow-fuchsia-700 cursor-pointer ">try</button>
            </div>
          </div>
          <div className="flex flex-col h-[270px] w-[270px] rounded-2xl border-2 border-fuchsia-800 shadow-lg shadow-fuchsia-700  ">
            <div>
            <BsFillLightningFill className="mt-3 ml-3 p-2 text-fuchsia-500 border-5 border-fuchsia-700 bg-[#330342] shadow-lg shadow-fuchsia-800 rounded-4xl w-[60px] h-[60px]"/>
            </div>
            <div className="flex flex-col items-center justify-center h-full gap-2">
            <h1 className="text-2xl font-bold text-center">Pitch Deck Creator</h1>
            <p className="text-center ">I don’t know how to make a pitch deck that impresses investors</p>
            </div>
            <div className="flex justify-center mb-3 items-center">
              <button className=" m-2 bg-fuchsia-800 w-[90px] h-[40px] rounded-2xl shadow-lg shadow-fuchsia-700 cursor-pointer  ">try</button>
            </div>
          </div>
          <div className="flex flex-col h-[270px] w-[270px] rounded-2xl border-2 border-fuchsia-800 shadow-lg shadow-fuchsia-700  ">
            <div>
            <GiInfinity className="mt-3 ml-3 p-2 text-fuchsia-500 border-5 border-fuchsia-700 bg-[#330342] shadow-lg shadow-fuchsia-800 rounded-4xl w-[60px] h-[60px]"/>
            </div>
            <div className="flex flex-col p-2 items-center justify-center h-full gap-2">
            <h1 className="text-2xl font-bold text-center"> Investor Connector</h1>
            <p className="text-center ">I’m looking for the right investors for my startup</p>
            </div>
            <div className="flex justify-center mb-3 items-center">
              <button className=" m-2 bg-fuchsia-800 w-[90px] h-[40px] rounded-2xl shadow-lg shadow-fuchsia-700 cursor-pointer ">try</button>
            </div>
          </div>
          <div className="flex flex-col h-[270px] w-[270px] rounded-2xl border-2 border-fuchsia-800 shadow-lg shadow-fuchsia-700  ">
            <div>
            <LuUserSearch className="mt-3 ml-3 p-2 text-fuchsia-500 border-5 border-fuchsia-700 bg-[#330342] shadow-lg shadow-fuchsia-800 rounded-4xl w-[60px] h-[60px]"/>
            </div>
            <div className="flex flex-col items-center justify-center h-full gap-2">
            <h1 className="text-2xl font-bold text-center"> Mentor Match</h1>
            <p className="text-center ">I need guidance from experienced founders and mentors</p>
            </div>
            <div className="flex justify-center mb-3 items-center">
              <button className=" m-2 bg-fuchsia-800 w-[90px] h-[40px] rounded-2xl shadow-lg shadow-fuchsia-700 cursor-pointer ">try</button>
            </div>
          </div>
        </div>
        </div>
      </section >
      <section className="p-6 mt-12 ">
            <div className="flex flex-col items-center justify-center gap-6">
              <h1 className="text-4xl font-bold">Amplify Your Startup's Voice</h1>
              <p className="text-3xl">Struggling to get eyes on your startup?</p>
              <p className="text-xl text-center">Drop your startup’s website or a short idea pitch, and we’ll match <br />  you with the right audience to help you grow faster.</p>
              <p className="text-lg">🔗 Paste your startup website or idea summary below</p>
              <button className="bg-purple-700 text-white  border-2 border-purple-600 shadow-lg shadow-purple-600 rounded-lg px-4 py-2 cursor-pointer ">Get Started</button>
            </div>
      </section>
      <section className="p-6 mt-12 mb-12">
            <div className="flex flex-col text-center justify-center gap-6">
              <h1 className="text-4xl font-bold">💬 Global Founder Chatroom</h1>
              <p className="text-xl">Have questions, need advice, or just want to vibe with like-minded builders?</p>
              <p className="text-xl">Jump into a global chat space to meet other startup founders,<br /> exchange ideas, ask questions, and grow together.</p>
              <p className="text-lg">🌐 One click to start the conversation.</p>
             </div>
             <div className="flex justify-center items-center">
              <Link rel="stylesheet" href="/chat" >
                <button className="bg-purple-700 text-white  border-2 border-purple-600 shadow-lg shadow-purple-600 rounded-lg px-4 py-2 cursor-pointer">Get Started</button>
              </Link>
               
            
             </div>
      </section>
      {/* <section className="flex justify-end m-10 ">
        <div className=" flex ">
        <div className="box green rounded-2xl " style={{ width: "100px", height: "100px", backgroundColor: "purple" ,left:"300px"}}>
       
       </div>
        </div>
      </section> */}
      

      {/* Bottom Mobile Navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around items-center md:hidden z-50 shadow-md">
        <a href="/First" className="flex flex-col items-center text-purple-700 text-sm">
          <FaHome size={20} />
          Home
        </a>
        <a href="/profile" className="flex flex-col items-center text-purple-700 text-sm">
          <CgProfile size={20} />
          Profile
        </a>
        <a href="/chat" className="flex flex-col items-center text-purple-700 text-sm">
          <IoSettings size={20} />
          Chat
        </a>
        <a href="/" className="flex flex-col items-center text-purple-700 text-sm">
          <MdLogout size={20} />
          Logout
        </a>
      </div>
    </div>
  );
}
