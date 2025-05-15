import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";




export default function Login() {
  const { theme } = useTheme();
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  // Google login
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
      .then(async (resp) => {
        const userData = resp.data;

        // Save user to MongoDB via backend
        try {
          await axios.post("http://localhost:5000/api/google-auth", {
            id: userData.id,
            name: userData.name,
            email: userData.email,
          });
          localStorage.setItem("user", JSON.stringify(userData));
          navigate("/First");
        } catch (err) {
          console.error("❌ Error saving Google user:", err);
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching user profile:", error);
      });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
    onError: (error) => console.log("Login Failed", error),
  });

  // Manual email/password login
  const handleManualLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      setError("");
      navigate("/First");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Error logging in. Please try again.");
      }
      console.error("❌ Login failed:", err);
    }
  };

  return (
    <div>
      <Form
        className={`m-auto mt-10 p-10 max-w-md flex flex-col gap-6  rounded-xl shadow-md shadow-fuchsia-600 bg-[#180828]
          justify-center items-center `}
        onSubmit={(e) => {
          e.preventDefault();
          let data = Object.fromEntries(new FormData(e.currentTarget));
          handleManualLogin(data.email, data.Password);
        }}
      >
        <h2 className="text-3xl font-bold">Log In</h2>

        <Input
          name="email"
          isRequired
          className="max-w-md m-2"
          color="primary"
          errorMessage="Please enter a valid Email"
          placeholder="Enter your email"
          type="email"
        />

        <Input
          name="Password"
          isRequired
          className="max-w-md m-2"
          errorMessage="Please enter a valid Password"
          placeholder="Enter your Password"
          type="password"
        />

        {error && <p className="text-red-500">{error}</p>}

        <h3>
          Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
        </h3>

        <span>------------------- or --------------------</span>

        <Button
          onClick={() => login()}
          className="flex justify-center items-center w-[250px] p-2 m-2 bg-fuchsia-600 rounded-lg shadow-lg shadow-fuchsia-600 cursor-pointer"
        >
          <FcGoogle /> Continue With Google
        </Button>

        <div  className="flex m-2">
          <Button
            type="submit"
            
            color="secondary"
            className="w-[120px] p-2 rounded-lg shadow-md cursor-pointer shadow-fuchsia-600 bg-fuchsia-700 hover:bg-[#5f344f] hover:text-white"
          >
            Log IN
          </Button>
          
        </div>
      </Form>
    </div>
  );
}
