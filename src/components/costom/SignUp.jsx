import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../service/firebaseConfig"; // update path based on your structure

export default function SignUp() {
  const [action, setAction] = React.useState(null);


  const SaveData = async (userData) => {
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log("User saved successfully!", result);
      } else {
        console.error("Signup failed:", result.error);
      }
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };
  
  // const SaveData = async (userData) => {
  //   const Id = Date.now().toString();
  //   try {
  //     await setDoc(doc(db, "Users", Id), {
  //       id: Id,
  //       name: userData.name,
  //       email: userData.email,
  //       password: userData.password, // ⚠️ Not recommended to store plain passwords
  //     });
  //     console.log("User saved successfully!");
  //   } catch (err) {
  //     console.error("Error saving user:", err);
  //   }
  // };

  return (
    <Form
      className="m-auto mt-10 p-9 max-w-md flex flex-col gap-4  rounded-xl shadow-md shadow-fuchsia-600 justify-center items-center"
      onReset={() => setAction("reset")}
      onSubmit={(e) => {
        e.preventDefault();
        let formData = Object.fromEntries(new FormData(e.currentTarget));

        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.Password,
        };

        SaveData(userData);
        setAction(`Submitted: ${JSON.stringify(userData)}`);
      }}
    >
      <h2 className="text-3xl font-bold">Sign Up</h2>

      <Input
        isRequired
        name="name"
        className="max-w-md m-2"
        color="primary"
        errorMessage="Please enter your Name"
        
        placeholder="Enter your name"
        type="text"
      />

      <Input
        isRequired
        name="email"
        className="max-w-md m-2"
        color="primary"
        errorMessage="Please enter a valid Email"
        
        placeholder="Enter your email"
        type="email"
      />

      <Input
        isRequired
        name="Password"
        errorMessage="Please enter a valid Password"
        
        className="max-w-md m-2"
        placeholder="Enter your Password"
        type="password"
        variant="bordered"
      />

      <h3>
        Already have an account? <a href="/" className="text-blue-600">Log in</a>
      </h3>

      <div className="flex m-2">
        <Button
          color="secondary"
          type="submit"
          className="w-[120px] p-2 rounded-lg shadow-md cursor-pointer shadow-fuchsia-600 bg-fuchsia-700 hover:bg-[#5f344f] hover:text-white"
        >
          Sign Up
        </Button>
      </div>
    </Form>
  );
}
