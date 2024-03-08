"use client";
import React, { useState } from "react";
import axios from "axios";

const FormPage = () => {
  const [message, setMessage] = useState("");
  const [userIds, setUserIds] = useState("");
  const url = `http://localhost:3001/api/send`;

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      message,
      userIds,
    };

    try {
      const response = await axios.post(url, data);
      console.log("Success : ", response);

      if (response.status === 200) {
        alert("Request Generated Successfully");
      }
    } catch (error) {
      console.log("Error : ", error.message);
    }
  };

  return (
    <form className=" flex flex-col space-y-3">
      <input
        type="text"
        placeholder="Enter Message"
        className="border-2 border-gray-200 p-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <textarea
        placeholder="Enter user id"
        className="border-2 border-gray-200 p-2"
        value={userIds}
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
