"use client";
import { updateAgent } from "@/app/lib/api";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
const Modal = ({ setOpen, rowData, field, setRowData }) => {
  const pathname = usePathname();
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const res = await updateAgent(rowData.username, rowData);
    if (res.status === 200) {
      setOpen(false);
    } else {
      console.log("Error Updating data");
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      className="w-full h-full absolute top-0 left-0 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="m-auto mt-[20%] bg-gray-50 w-[50%] px-6 py-3 rounded-lg relative overflow-hidden min-h-[30%]">
        <h3 className="text-xl font-semibold text-gray-900 ">Details</h3>
        <div className="my-4">
          {field?.map((field, index) => (
            <div key={index} className="grid grid-cols-2">
              {field !== "username" && (
                <>
                  <label className="capitalize font-semibold" htmlFor={field}>
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
                      <span className="break-words">{rowData[field]}</span>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
          <div className="grid grid-cols-2">
            <label className="capitalize font-semibold">Status</label>
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
              <span>{rowData["status"]}</span>
            )}
          </div>
        </div>
        <div className="flex justify-end w-full gap-4">
          {pathname === "/agents" && (
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
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
            className="absolute top-0 right-0 mx-3 my-2"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
