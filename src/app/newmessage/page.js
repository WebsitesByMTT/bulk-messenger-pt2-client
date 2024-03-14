"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const NewMessage = () => {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [facebookId, setFacebookId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <motion.div
      className="m-auto mt-12 w-[45%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form className="flex flex-col gap-[5px]">
        <lable className="text-lg font-semibold mt-2" htmlFor="message">
          Message
        </lable>
        <textarea
          className="border-2 border-[#8C8C8C] rounded-md p-2 resize-none"
          name="message"
          rows="6"
          placeholder="Enter Text"
          required
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <lable className="text-lg font-semibold mt-2" htmlFor="userId">
          User ID
        </lable>
        <textarea
          className="border-2 border-[#8C8C8C] rounded-md p-2 resize-none"
          name="userId"
          rows="10"
          placeholder="e.g, 123.1235842548"
          required
          onChange={(e) => setUserId(e.target.value)}
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
          onChange={(e) => setFacebookId(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-[#252727] px-4 py-3 rounded-md font-semibold text-white w-fit mt-6">
          SUBMIT
        </button>
      </form>
    </motion.div>
  );
};

export default NewMessage;
