import React, { useEffect, useState } from "react";
import { updatePassword, updateProfile } from "../../api/auth";

const Profile = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || {}; // Đảm bảo user không phải null

  useEffect(() => {
    if (user) {
      setFullname(user.fullname || "");
      setUsername(user.username || "");
    }

    document.title = "XShop - Profile";
  }, []);

  const handleUpdateProfile = async () => {
    const response = await updateProfile(user.id, { fullname: fullname, username: username });
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response));
    window.location.reload();
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Password does not match");
      return;
    }
    const response = await updatePassword(user.id, { oldPassword: oldPassword, newPassword: newPassword });
    if (!response) {
      setError("Old password is incorrect");
      return;
    } else {
      setError("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-4">
      <div className="border rounded-xl p-6 mb-4">
        <h3 className="text-2xl font-semibold">Profile</h3>
        <div className="w-full mb-4">
          <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <input type="text" id="email" className="w-full border rounded p-2" value={user?.email} disabled />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="fullname" className="block text-sm">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            className="w-full border rounded p-2"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)} // Ensure this correctly updates the state
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="username" className="block text-sm">
            User Name
          </label>
          <input
            type="text"
            id="username"
            className="w-full border rounded p-2"
            value={username} // Sử dụng state username
            onChange={(e) => setUsername(e.target.value)} // Cập nhật state
          />
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleUpdateProfile}>
          Update
        </button>
      </div>
      <div className="border rounded-xl p-6 mb-4">
        <h3 className="text-2xl font-semibold">Change Password</h3>
        <div className="w-full mb-4">
          <label htmlFor="oldPassword" className="block text-sm">
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            className="w-full border rounded p-2"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="newPassword" className="block text-sm">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="w-full border rounded p-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="confirmPassword" className="block text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full border rounded p-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleChangePassword}>
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
