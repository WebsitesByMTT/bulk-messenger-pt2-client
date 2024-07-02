"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { createUsers } from "../../lib/new-api";
export const Create = () => {
  const [message, setMessage] = useState({
    username: "",
    name: "",
    password: "",
    role: "agent",
    keys: "",
  });

  function handleAgentMessage(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setMessage((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSend(e) {
    e.preventDefault();
    try {
      const response = await createUsers(message);
      toast.success(response);

      setMessage({
        username: "",
        name: "",
        password: "",
        role: "agent",
        keys: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <motion.div
      className="m-auto mt-[10%] w-[35%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form className="flex flex-col gap-[5px]" onSubmit={handleSend}>
        <label className="text-lg font-semibold mt-2" htmlFor="name">
          Name
        </label>
        <input
          className="border-2 border-[#8C8C8C] rounded-md p-2 resize-none"
          name="name"
          placeholder="Enter Name"
          required
          value={message.name}
          onChange={handleAgentMessage}
        ></input>
        <label className="text-lg font-semibold mt-2" htmlFor="username">
          Username
        </label>
        <input
          className="border-2 border-[#8C8C8C] rounded-md p-2 resize-none"
          name="username"
          placeholder="e.g, Rahul"
          required
          value={message.username}
          onChange={handleAgentMessage}
        ></input>
        <label className="text-lg font-semibold mt-2" htmlFor="password">
          Password
        </label>
        <input
          className="border-2 border-[#8C8C8C] rounded-md p-2"
          name="password"
          placeholder="*********"
          type="Password"
          required
          value={message.password}
          onChange={handleAgentMessage}
        />
        {message.role === "admin" && (
          <input
            className="border-2 border-[#8C8C8C] rounded-md p-2 mt-4"
            name="keys"
            placeholder="API key"
            required
            value={message.keys}
            onChange={handleAgentMessage}
          />
        )}
        <select
          className="text-sm mt-6 w-fit border-[#8C8C8C] border-[1px] p-1 rounded-2xl"
          onChange={handleAgentMessage}
          name="role"
          value={message.role}
          required
        >
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
        </select>

        <div className="flex justify-between items-end mt-6">
          <button className="bg-[#252727] px-4 py-3 w-full rounded-md font-semibold text-white hover:bg-[#1877F2]  transition-all duration-300 ease">
            CREATE
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Create;
