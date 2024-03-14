"use client";
import axios from "axios";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Cookies from "js-cookie";
const NewMessage = () => {
  const [message, setMessage] = useState({
    message: "",
    userIds: "",
    facebookId: "",
    Password: "",
  });
  const token = Cookies.get("token");
  function handleAgentMessage(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setMessage((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSend(e) {
    console.log(message);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/send`,
        message,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Request Generated Successfully");
      }
    } catch (error) {
      console.error("Error", error.message);
    }
  }

  return (
    <motion.div
      className="m-auto mt-12 w-[45%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form className="flex flex-col gap-[5px]" onSubmit={handleSend}>
        <lable className="text-lg font-semibold mt-2" htmlFor="message">
          Message
        </lable>
        <textarea
          className="border-2 border-[#8C8C8C] rounded-md p-2 resize-none"
          name="message"
          rows="6"
          placeholder="Enter Text"
          required
          value={message.message}
          onChange={handleAgentMessage}
        ></textarea>
        <lable className="text-lg font-semibold mt-2" htmlFor="userId">
          User ID
        </lable>
        <textarea
          className="border-2 border-[#8C8C8C] rounded-md p-2 resize-none"
          name="userIds"
          rows="10"
          placeholder="e.g, 123.1235842548"
          required
          value={message.userIds}
          onChange={handleAgentMessage}
        ></textarea>
        <lable className="text-lg font-semibold mt-2" htmlFor="facebookId">
          Facebook ID
        </lable>
        <input
          className="border-2 border-[#8C8C8C] rounded-md p-2"
          name="facebookId"
          placeholder="e.g, Gaurav Kumar"
          type="text"
          required
          value={message.facebookId}
          onChange={handleAgentMessage}
        />
        <lable className="text-lg font-semibold mt-2" htmlFor="Password">
          Password
        </lable>
        <input
          className="border-2 border-[#8C8C8C] rounded-md p-2"
          name="Password"
          placeholder="*********"
          type="password"
          required
          value={message.Password}
          onChange={handleAgentMessage}
        />
        <button className="bg-[#252727] px-4 py-3 rounded-md font-semibold text-white w-fit mt-6">
          SUBMIT
        </button>
      </form>
    </motion.div>
  );
};

export default NewMessage;
