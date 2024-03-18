"use client";
import React, { useState } from "react";
import axios from "axios";

const FormPage = () => {
  const [fbUsername, setFbUsername] = useState("gaurav.trippybug@gmail.com");
  const [fbPassword, setFbPassword] = useState("trippybug@gaurav1234");

  const [message, setMessage] = useState("");
  const [userIds, setUserIds] = useState("");
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/send`;

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      message,
      userIds,
      fbUsername,
      fbPassword,
    };

    try {
      const response = await axios.post(url, data);
      console.log("Success : ", response);

      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error : ", error);
      alert(error.message);
    }
  };

  return (
    <form className=" flex flex-col space-y-3">
      <input
        type="text"
        placeholder="Username"
        className="border-2 border-gray-200 p-2"
        value={fbUsername}
        required
        onChange={(e) => setFbUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border-2 border-gray-200 p-2"
        value={fbPassword}
        required
        onChange={(e) => setFbPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Message"
        className="border-2 border-gray-200 p-2"
        value={message}
        required
        onChange={(e) => setMessage(e.target.value)}
      />
      <textarea
        placeholder="Enter user id"
        className="border-2 border-gray-200 p-2"
        value={userIds}
        required
        onChange={(e) => setUserIds(e.target.value)}
      />

      <button
        onClick={submitHandler}
        className=" bg-blue-600 text-white p-2 cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
};
export default FormPage;
