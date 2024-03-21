"use client";
import { deleteUsers, updateAgent } from "@/app/lib/api";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Modal = ({ setOpen, rowData, field, setRowData }) => {
  const pathname = usePathname();
  const [isEditing, setIsEditing] = useState(false);

  //handle input fields
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Edit Agent Details
  const handleSave = async () => {
    const response = await updateAgent(rowData.username, rowData);
    console.log(response);
    if (response.data.success) {
      setOpen(false);
      toast.success(response.data.message);
    } else toast.error(response.data.message);
    setIsEditing(false);
  };

  const handleClick = () => {
    if (open) setOpen(false);
  };

  //Delete Agent
  const handleDelete = async (username) => {
    try {
      const response = await deleteUsers(username);
      if (response.data.success) {
        toast.success(response.data.message);
      } else toast.error(response.data.message);
      setOpen(false);
    } catch (error) {
      console.error("Error fetching agent data:", error);
    }
  };

  return (
    <motion.div
      className="w-full h-full absolute top-0 left-0 transition-opacity "
      initial={{ scale: 0, y: 500 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className=" z-[2] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] m-auto mt-[20%] bg-gray-50 w-[50%] px-8 py-6 rounded-lg relative overflow-hidden min-h-[30%]">
        <h3 className="text-xl font-semibold text-gray-900">Details</h3>
        <div className="my-4">
          {field?.map((field, index) => (
            <div key={index} className="grid grid-cols-2">
              {field !== "username" && (
                <>
                  <label
                    className="capitalize font-semibold mt-2"
                    htmlFor={field}
                  >
                    {field}
                  </label>
                  {isEditing &&
                  pathname === "/agents" &&
                  field !== "username" ? (
                    <input
                      type="text"
                      name={field}
                      value={rowData[field]}
                      onChange={handleChange}
                      className="w-fit border-b-2"
                    />
                  ) : (
                    <>
                      <span className="break-words mt-2">{rowData[field]}</span>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
          <span className="grid grid-cols-2">
            <label className="capitalize font-semibold mt-2">Status</label>
            {isEditing ? (
              <select
                defaultValue={rowData["status"]}
                className="w-fit"
                name="status"
                onChange={handleChange}
              >
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
              </select>
            ) : (
              <div
                className={`flex items-center justify-center gap-[5px] ${
                  rowData["status"] === "success" ||
                  rowData["status"] === "active"
                    ? "bg-[#85c44191]"
                    : "bg-[#ec202371]"
                } rounded-md w-fit px-2 py-1 mt-2`}
              >
                <svg
                  width="10%"
                  height="8"
                  viewBox="0 0 7 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="3.5"
                    cy="4"
                    r="3.5"
                    fill={
                      rowData["status"] === "success" ||
                      rowData["status"] === "active"
                        ? "#276956"
                        : "#7F2600"
                    }
                  />
                </svg>
                <span
                  className={`
                      ${
                        rowData["status"] === "success" ||
                        rowData["status"] === "active"
                          ? "text-[#276956]"
                          : "text-[#7F2600]"
                      } w-[90%] capitalize`}
                >
                  {rowData["status"]}
                </span>
              </div>
            )}
          </span>
        </div>
        <div className="flex justify-end w-full gap-4">
          <button
            className=" hover:bg-[#1877F2]  transition-all duration-300 easemt-3 rounded-md px-3 py-2 font-semibold bg-[#252727]  text-white"
            onClick={() => handleDelete(rowData["username"])}
          >
            Delete
          </button>
          {pathname === "/agents" && (
            <button className=" hover:bg-[#1877F2]  transition-all duration-300 easemt-3 rounded-md px-3 py-2 font-semibold bg-[#252727]  text-white">
              {isEditing ? (
                <span onClick={handleSave}>Save</span>
              ) : (
                <span onClick={() => setIsEditing(true)}>Edit</span>
              )}
            </button>
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLineCap="round"
            strokeLinejoin="round"
            onClick={() => {
              setOpen(false);
            }}
            className="absolute top-0 right-0 m-3 cursor-pointer"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
      </div>
      <div
        className="absolute w-full h-full top-0 left-0 z-[1]"
        onClick={handleClick}
      ></div>
    </motion.div>
  );
};

export default Modal;
