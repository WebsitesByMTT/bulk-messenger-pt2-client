"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { sendMessage } from "../lib/api";
import toast from "react-hot-toast";

const NewMessage = () => {
  const [message, setMessage] = useState({
    message: "",
    userIds: "",
    fbUsername: "",
    fbPassword: "",
    interval: "5",
    count: "2",
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
    console.log(message);
    e.preventDefault();
    const response = await sendMessage(message);
    console.log(response.status);
    if (response?.status === 200) {
      if (response.data.message !== "Login Failed")
        toast.success(response.data.message);
      else toast.error(response.data.message);
    } else toast.error(response);
    setMessage({
      message: "",
      userIds: "",
      fbUsername: "",
      fbPassword: "",
      interval: 2,
      count: 5,
    });
  }

  return (
    <motion.div
      className="m-auto mt-[5%] w-[45%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <form className="flex flex-col gap-[5px]" onSubmit={handleSend}>
        <label className="text-lg font-semibold mt-2" htmlFor="message">
          Message
        </label>
        <textarea
          className="border-2 border-[#8C8C8C] rounded-md p-2 resize-none"
          name="message"
          rows="5"
          placeholder="Enter Text"
          required
          value={message.message}
          onChange={handleAgentMessage}
        ></textarea>
        <label className="text-lg font-semibold mt-2" htmlFor="userId">
          User ID
        </label>
        <textarea
          className="border-2 border-[#8C8C8C] rounded-md p-2 resize-none"
          name="userIds"
          rows="8"
          placeholder="e.g, 123.1235842548"
          required
          value={message.userIds}
          onChange={handleAgentMessage}
        ></textarea>
        <label className="text-lg font-semibold mt-2" htmlFor="fbUsername">
          Facebook ID
        </label>
        <input
          className="border-2 border-[#8C8C8C] rounded-md p-2"
          name="fbUsername"
          placeholder="e.g, Gaurav Kumar"
          type="text"
          required
          value={message.fbUsername}
          onChange={handleAgentMessage}
        />
        <label className="text-lg font-semibold mt-2" htmlFor="fbPassword">
          fb Password
        </label>
        <input
          className="border-2 border-[#8C8C8C] rounded-md p-2"
          name="fbPassword"
          placeholder="*********"
          type="fbPassword"
          required
          value={message.fbPassword}
          onChange={handleAgentMessage}
        />
        <div className="flex justify-between items-end mt-6">
          <button className="bg-[#252727] px-4 py-3 rounded-md font-semibold text-white w-fit hover:bg-[#1877F2]  transition-all duration-300 ease">
            SUBMIT
          </button>
          <div className="flex gap-[10px] w-fit">
            <div className="flex gap-[2px] p-1 border-[#8C8C8C] border-[1.5px] rounded-2xl justify-center w-[70%]">
              <svg
                width="15%"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.5519 24C14.6156 24 17.5539 22.7829 19.7203 20.6165C21.8867 18.4501 23.1037 15.5119 23.1037 12.4481C23.1037 9.38436 21.8867 6.4461 19.7203 4.2797C17.5539 2.11331 14.6156 0.89624 11.5519 0.89624C8.48812 0.89624 5.54986 2.11331 3.38346 4.2797C1.21707 6.4461 0 9.38436 0 12.4481C0 15.5119 1.21707 18.4501 3.38346 20.6165C5.54986 22.7829 8.48812 24 11.5519 24ZM12.9958 6.67217C12.9958 6.28921 12.8437 5.92192 12.5729 5.65112C12.3021 5.38032 11.9348 5.22819 11.5519 5.22819C11.1689 5.22819 10.8016 5.38032 10.5308 5.65112C10.26 5.92192 10.1079 6.28921 10.1079 6.67217V12.4481C10.108 12.831 10.2602 13.1983 10.531 13.469L14.6146 17.554C14.7487 17.6882 14.908 17.7946 15.0833 17.8672C15.2586 17.9398 15.4464 17.9772 15.6362 17.9772C15.8259 17.9772 16.0138 17.9398 16.1891 17.8672C16.3644 17.7946 16.5236 17.6882 16.6578 17.554C16.792 17.4199 16.8984 17.2606 16.971 17.0853C17.0436 16.91 17.081 16.7221 17.081 16.5324C17.081 16.3427 17.0436 16.1548 16.971 15.9795C16.8984 15.8042 16.792 15.645 16.6578 15.5108L12.9958 11.8503V6.67217Z"
                  fill="#404040"
                />
              </svg>
              <select
                className="text-sm w-[90%]"
                name="interval"
                onChange={handleAgentMessage}
                value={message.interval}
              >
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="20">20 minutes</option>
                <option value="25">25 minutes</option>
              </select>
            </div>
            <div className="flex gap-[2px] p-1 border-[#8C8C8C] border-[1.5px] rounded-2xl justify-center w-[50%]">
              <svg
                width="15%"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.6158 9.6C12.6957 9.6 13.7312 9.19964 14.4948 8.48701C15.2583 7.77437 15.6873 6.80782 15.6873 5.8C15.6873 4.79218 15.2583 3.82563 14.4948 3.11299C13.7312 2.40036 12.6957 2 11.6158 2C10.536 2 9.50045 2.40036 8.73691 3.11299C7.97337 3.82563 7.54442 4.79218 7.54442 5.8C7.54442 6.80782 7.97337 7.77437 8.73691 8.48701C9.50045 9.19964 10.536 9.6 11.6158 9.6ZM2.11584 21C2.11584 19.8356 2.36157 18.6826 2.83899 17.6069C3.31641 16.5311 4.01617 15.5537 4.89833 14.7303C5.78049 13.907 6.82776 13.2539 7.98035 12.8083C9.13295 12.3627 10.3683 12.1333 11.6158 12.1333C12.8634 12.1333 14.0987 12.3627 15.2513 12.8083C16.4039 13.2539 17.4512 13.907 18.3334 14.7303C19.2155 15.5537 19.9153 16.5311 20.3927 17.6069C20.8701 18.6826 21.1158 19.8356 21.1158 21H2.11584Z"
                  fill="#404040"
                />
              </svg>
              <select
                className="text-sm w-[85%]"
                name="count"
                onChange={handleAgentMessage}
                value={message.count}
              >
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default NewMessage;
