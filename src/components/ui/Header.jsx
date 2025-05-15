import React from 'react'
import {Avatar, AvatarIcon} from "@heroui/react";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdNotifications } from "react-icons/io";
import {Popover, 
  PopoverTrigger, 
  PopoverContent,
   Button} from '@heroui/react'
import { useTheme } from "next-themes";
import { IoSettings } from "react-icons/io5";
import { Switch } from "@headlessui/react"; 
import { FaSignalMessenger } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../service/firebaseConfig";
import { useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import axios from "axios";
// import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import {Link} from "@heroui/react";

function Header() {
   const { theme, setTheme } = useTheme();
  const user=JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = React.useState("");
 

  useEffect(()=>{
    console.log(user)
    
  },[])

 

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        const userData = resp.data;
        localStorage.setItem("user", JSON.stringify(userData));
        SaveData(userData);
       
      })
      .catch((error) => {
        console.error("❌ Error fetching user profile:", error);
      });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      GetUserProfile(tokenResponse);
    },
    onError: (error) => console.log("Login Failed", error),
  });

  const handleManualLogin = async (email, password) => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const users = querySnapshot.docs.map(doc => doc.data());

      const matchedUser = users.find(user => user.email === email && user.password === password);

      if (matchedUser) {
        localStorage.setItem("user", JSON.stringify(matchedUser));
        console.log("✅ Login successful");
        setError("");
        
      } else {
        setError("Invalid email or password");
        console.warn("❌ Login failed: invalid credentials");
      }
    } catch (err) {
      console.error("❌ Error during login:", err);
      setError("Error logging in. Please try again.");
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "cf03a24f-9a32-4628-ac10-4e015d3b19b5");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };

  return (
   
      <div className={`flex p-2 justify-between w-100% h-[100px] bg-[#271439] border-b-fuchsia-900 rounded-2xl shadow-md shadow-fuchsia-800 `}>
        <img src="LaunchSphere1.png" alt="" className='m-3 p-4 w-[120px] h-[100px]' class='logo' />
        {/* <h1 className='text-3xl color-red'>Welcome to my first React App</h1> */}
        
        <div>
       {
        user?
       
        <div className='flex mt-3 m-3 align-middle gap-5 items-center'>
            <div>
            <IoMdNotifications className='mt-3 w-[35px] h-[35px] text-fuchsia-400 '/>
            </div>
            <div className=''>
            
            <Dialog>
              <DialogTrigger>
              <FaSignalMessenger className='mt-3 w-[50px] h-[50px] text-fuchsia-400 '/>
              </DialogTrigger>
              <DialogContent className='w-full h-[500px] bg-fuchsia-950 border-2 border-fuchsia-600 rounded-xl shadow-lg shadow-fuchsia-700' >
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription >
                    <div className='flex flex-col gap-5'>                     
                    <div className="text-center mb-6"> 
                      <h2 className="text-2xl font-bold text-fuchsia-600">hey..! {user?.name}</h2>
                    <h2 className="text-2xl font-semibold text-white">Need Help? Get in Touch!</h2>
                      <p className="text-white mt-2">
                        If you have any questions, feedback, or need assistance,<br /> feel free to reach out. I'm here to help you!
                      </p>
                    </div>
                    <div>
                      <form onSubmit={onSubmit} className="flex flex-col gap-5 justify-center items-center ">
                      <input type="text" name="name" placeholder='Enter Name Here' className='bg-fuchsia-900 rounded-xl border-2 border-fuchsia-500 shadow-md shadow-fuchsia-500'/>
                      <input type="email" name="email" placeholder='Enter Email Here' className='bg-fuchsia-900 rounded-xl border-2 border-fuchsia-500 shadow-md shadow-fuchsia-500'/>
                      <textarea name="message" placeholder='Type message Here' className='bg-fuchsia-900 w-[300px] h-[70px] rounded-xl border-2 border-fuchsia-700 shadow-md shadow-fuchsia-500'></textarea>
                      <button type="submit" className='w-[120px] h-[50px] bg-fuchsia-600 rounded-xl border-b-fuchsia-400 shadow-xl shadow-fuchsia-600 cursor-pointer'>Submit Form</button>
                      </form>
                    </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            </div>
          
          <Popover placement="bottom" >
          <PopoverTrigger>
          {/* <img src={user?.picture} alt="profile"  className='rounded-full h-[30px] w-[30px]'/> */}
          {/* <Avatar
          src={user?.photo}
        classNames={{
          base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]  border-fuchsia-800 rounded-full h-[53px] w-[53px] cursor-pointer",
          icon: "text-black/80",
          
        }}
        icon={<AvatarIcon />}
      /> */}
          <img src={user?.photo} alt="" className='bg-gradient-to-br from-[#FFB457] to-[#FF705B] border-3 border-fuchsia-500 rounded-full h-[53px] w-[53px] cursor-pointer shadow-md shadow-fuchsia-500 hover:shadow-lg hover:shadow-fuchsia-500' />
          </PopoverTrigger>
          <PopoverContent className="w-[250px] h-[250px] ">
            
            <div className="w-full  bg-fuchsia-950 border-2 border-fuchsia-600 rounded-2xl shadow-lg shadow-fuchsia-700">
              <div className="   p-2 rounded-t-2xl bg-fuchsia-800">
                <h3 className="p-1 text-lg text-white font-bold">{user?.name}</h3>
                <p className="pl-1 pr-2 text-white text-tiny">{user?.email}</p>
              </div>
            <div className="pt-2 pl-2 text-small text-white font-bold "><a href="/profile" className="flex text-lg font-bold gap-1">
                        <CgProfile className="m-1.5" />
                        Profile
                      </a></div>
          <div className="p-2 text-small font-bold text-white border-b-1 shadow-2xl"> <a href="#" className="flex text-lg font-bold gap-1">
                        <IoSettings className="mt-1.5 ml-1.5" />
                        Setting
                      </a></div>
          <div className="text-tiny "><h2 className='cursor-pointer flex p-3 text-lg  text-red-600' onClick={()=>{
              googleLogout();
              localStorage.clear();
             window.location.reload();
             
            }}> <MdLogout className="m-1.5" /><a href="/">Logout</a></h2></div>
          </div>
          </PopoverContent>
          </Popover>

        </div>
          :
          <Link href="/"><Button className=' mt-7 p-3 bg-fuchsia-800 align-middle rounded-2xl text-[#383232]'>Sign In</Button></Link>
          
       }  
       </div>
       
       
      </div>
      
  )
}

export default Header 