import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/Card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";

export default function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    bio: '',
  });
  const [submittedData, setSubmittedData] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.fullName);
    data.append("email", formData.email);
    data.append("bio", formData.bio);
    if (avatar) data.append("photo", avatar);

    try {
      const response = await axios.put(`http://localhost:5000/api/user/${userId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = {
        id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        bio: response.data.user.bio,
        photo: response.data.user.photo,
      };

      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setFormData({
        fullName: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
      });

      setSubmittedData({
        fullName: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        avatar: updatedUser.photo,
      });

      setPreview(null); // Clear preview
      alert("✅ Profile updated!");
    } catch (error) {
      console.error("Update error:", error);
      alert("❌ Failed to update profile");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
        const user = res.data.user;

        setFormData({
          fullName: user.name,
          email: user.email,
          bio: user.bio || '',
        });

        setSubmittedData({
          fullName: user.name,
          email: user.email,
          bio: user.bio || '',
          avatar: user.photo ? `http://localhost:5000${user.photo}` : null,
        });

        // Update localStorage to keep it fresh
        localStorage.setItem('user', JSON.stringify({
          id: user._id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          photo: user.photo,
        }));
      } catch (error) {
        console.error("Fetch user error:", error);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  return (
    <div className="flex flex-col justify-center items-center max-w-xl mx-auto mt-10 p-6 gap-5">
      <div className="flex flex-col justify-center items-center bg-[#180827] p-6 rounded-lg shadow-lg border-fuchsia-600 shadow-fuchsia-600 w-full h-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">My Profile</h2>

        <div className="flex justify-center mb-4">
          <label className="cursor-pointer relative w-32 h-32">
            <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
            <img
              src={preview || user.photo || 'https://via.placeholder.com/150'}
              alt="Avatar Preview"
              className="rounded-full w-full h-full object-cover border-4 border-purple-500"
            />
            <span className="absolute bottom-0 right-0 bg-purple-600 text-white px-2 py-1 text-xs rounded"><i className="bi bi-pencil-square"></i></span>
          </label>
        </div>

        <div className="text-left w-[260px] text-white space-y-1">
          <p className='font-bold text-2xl flex justify-center items-center'> {user.name}</p>
          <p><strong><i class="bi bi-envelope-at"></i> Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
        </div>
      </div>

      <Card className="w-[400px] bg-[#180827] p-4 rounded-lg shadow-lg border-fuchsia-600 shadow-fuchsia-600">
        <CardHeader>
          <CardTitle className="text-2xl text-white text-center">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Dialog>
            <DialogTrigger className="p-3 w-[190px] border-2 rounded-lg shadow-md bg-fuchsia-700 hover:bg-fuchsia-950 shadow-fuchsia-600 transition-shadow-105">
              <i className="bi bi-pencil-square"></i> Update Profile
            </DialogTrigger>
            <DialogContent className='w-[400px] bg-[#180827] p-6 rounded-lg shadow-lg border-fuchsia-600 shadow-fuchsia-600'>
              <DialogHeader>
                <DialogTitle>Update your profile</DialogTitle>
                <DialogDescription>Manage your name, email, bio, and avatar.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md dark:bg-[#180827] dark:text-white"
                  placeholder="Full Name"
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md dark:bg-[#180827] dark:text-white"
                  placeholder="Email"
                />
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-[300px] h-20 px-4 py-2 border rounded-md dark:bg-[#180827] dark:text-white"
                  placeholder="Short Bio"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-all"
                >
                  Save Profile
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
