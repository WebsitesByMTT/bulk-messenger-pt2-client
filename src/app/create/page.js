"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export const page = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const handleChange = (e) => {
    setSelectedRole(e.target.value);
  };
  return (
    <motion.div
      className="m-auto mt-[10%] w-[35%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form className="flex flex-col gap-[5px]">
        <lable className="text-lg font-semibold mt-2" htmlFor="name">
          Name
        </lable>
        <input
          className="border-2 border-[#8C8C8C] rounded-md p-2 resize-none"
          name="name"
          placeholder="Enter Name"
          required
        ></input>
        <lable className="text-lg font-semibold mt-2" htmlFor="username">
          Username
        </lable>
        <input
          className="border-2 border-[#8C8C8C] rounded-md p-2 resize-none"
          name="username"
          placeholder="e.g, Rahul"
          required
        ></input>
        <lable className="text-lg font-semibold mt-2" htmlFor="password">
          Password
        </lable>
        <input
          className="border-2 border-[#8C8C8C] rounded-md p-2"
          name="Password"
          placeholder="*********"
          type="Password"
          required
        />
        {selectedRole === "admin" && (
          <input
            className="border-2 border-[#8C8C8C] rounded-md p-2 mt-4"
            name="Password"
            placeholder="API key"
            required
          />
        )}
        <select
          className="text-sm mt-6 w-fit border-[#8C8C8C] border-[1px] p-1 rounded-2xl"
          value={selectedRole}
          onChange={handleChange}
        >
          <option hidden value="role">
            Role
          </option>
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

export default page;
