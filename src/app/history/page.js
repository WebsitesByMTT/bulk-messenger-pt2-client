"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const History = () => {
  const [searched, setSearched] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];
  const historyData = [
    {
      id: "1",
      message: "hi hello hey",
      userId: "Rahul",
      facebookId: "asdfghjkl",
      status: "Accepted",
      createdAt: "8:45 am",
    },
    {
      id: "2",
      message: "hi hello hey",
      userId: "Rahul",
      facebookId: "asdfghjkl",
      status: "Rejected",
      createdAt: "8:45 am",
    },
    {
      id: "3",
      message: "hi hello hey",
      userId: "Rahul",
      facebookId: "asdfghjkl",
      status: "Rejected",
      createdAt: "8:45 am",
    },
    {
      id: "4",
      message: "hi hello hey",
      userId: "Rahul",
      facebookId: "asdfghjkl",
      status: "Rejected",
      createdAt: "8:45 am",
    },
    {
      id: "5",
      message: "hi hello hey",
      userId: "Rahul",
      facebookId: "asdfghjkl",
      status: "Rejected",
      createdAt: "8:45 am",
    },
    {
      id: "6",
      message: "hi hello hey",
      userId: "Rahul",
      facebookId: "asdfghjkl",
      status: "Rejected",
      createdAt: "8:45 am",
    },
    {
      id: "7",
      message: "hi hello hey",
      userId: "Rahul",
      facebookId: "asdfghjkl",
      status: "Rejected",
      createdAt: "8:45 am",
    },
  ];

  const [dataList, setDataList] = useState(historyData);

  const handleDelete = (itemId) => {
    console.log(dataList.length);
    setDataList((prevData) => prevData.filter((item) => item.id !== itemId));
  };
  return (
    <motion.div
      className="mt-[100px] mx-auto w-[70%] flex flex-col gap-6 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 p-2 rounded-xl bg-[#E8E8E8]">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.75749 3.25359C8.03226 3.25359 6.37769 3.9389 5.15777 5.15877C3.93784 6.37863 3.2525 8.03312 3.2525 9.75827C3.2525 11.4834 3.93784 13.1379 5.15777 14.3578C6.37769 15.5776 8.03226 16.263 9.75749 16.263C11.4827 16.263 13.1373 15.5776 14.3572 14.3578C15.5771 13.1379 16.2625 11.4834 16.2625 9.75827C16.2625 8.03312 15.5771 6.37863 14.3572 5.15877C13.1373 3.9389 11.4827 3.25359 9.75749 3.25359ZM1.84517e-07 9.75827C-0.000195784 8.22268 0.362072 6.70873 1.05734 5.33954C1.75261 3.97036 2.76124 2.7846 4.00122 1.8787C5.24119 0.972807 6.67748 0.372358 8.19328 0.12619C9.70908 -0.119979 11.2616 -0.00491509 12.7245 0.462022C14.1875 0.928959 15.5195 1.73458 16.6124 2.81338C17.7053 3.89217 18.5281 5.21367 19.0139 6.67039C19.4997 8.12711 19.6348 9.67793 19.4082 11.1967C19.1816 12.7155 18.5997 14.1593 17.7099 15.4108L25.5435 23.2441C25.8397 23.5508 26.0036 23.9616 25.9999 24.388C25.9962 24.8143 25.8252 25.2222 25.5237 25.5237C25.2222 25.8252 24.8143 25.9962 24.3879 25.9999C23.9615 26.0036 23.5507 25.8397 23.244 25.5435L15.412 17.7119C13.9522 18.7498 12.2348 19.3659 10.4481 19.4927C8.66141 19.6195 6.87427 19.252 5.28254 18.4306C3.69082 17.6092 2.35593 16.3654 1.42414 14.8357C0.492364 13.306 -0.0003481 11.5494 1.84517e-07 9.75827Z"
              fill="#404040"
            />
          </svg>
          <input
            className="bg-transparent"
            placeholder="search"
            onChange={(e) => setSearched(e.target.value)}
          />
        </div>
        <div>
          <input
            type="date"
            name="date"
            defaultValue={currentDate}
            max={currentDate}
            className="border-[#8C8C8C] border-2 p-1 rounded-lg"
          />
        </div>
      </div>
      {dataList.length > 0 ? <table className="w-full">
        <thead>
          <tr>
            <th>Message</th>
            <th>User ID</th>
            <th>Facebook ID</th>
            <th>
              <select className="p-2" value="Status">
                <option hidden value="Status">
                  Status
                </option>
                <option value="All">All</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </th>
            <th>
              <select className="p-2" value="Created At">
                <option hidden value="Created At">
                  Created At
                </option>
                <option value="1">1-2</option>
                <option value="2">2-3</option>
                <option value="3">3-4</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((data, index) => (
            <tr key={data.id}>
              <td>{data.message}</td>
              <td>{data.userId}</td>
              <td>{data.facebookId}</td>
              <td>
                <div
                  className={`flex items-center justify-center gap-[5px] ${
                    data.status === "Accepted"
                      ? "bg-[#85c44191]"
                      : "bg-[#ec202371]"
                  } rounded-md w-fit px-2 py-1  m-auto`}
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
                      fill={data.status === "Accepted" ? "#276956" : "#7F2600"}
                    />
                  </svg>
                  <span
                    className={`
                      ${
                        data.status === "Accepted"
                          ? "text-[#276956]"
                          : "text-[#7F2600]"
                      } w-[90%]`}
                  >
                    {data.status}
                  </span>
                </div>
              </td>
              <td className="created_at">
                <div className="time">{data.createdAt}</div>
                <button
                  className="delete w-full h-full hidden justify-center items-center"
                  onClick={() => handleDelete(data.id)}
                >
                  <svg
                    width="20%"
                    height="26"
                    viewBox="0 0 24 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.6667 3.9C23.403 3.9 24 4.48203 24 5.2C24 5.91797 23.403 6.5 22.6667 6.5H21.3333V21.45C21.3333 23.9629 19.244 26 16.6667 26H7.33333C4.756 26 2.66667 23.9629 2.66667 21.45V6.5H1.33333C0.596954 6.5 0 5.91797 0 5.2C0 4.48203 0.596954 3.9 1.33333 3.9H22.6667ZM18.6667 6.5H5.33333V20.8C5.33333 22.2359 6.52724 23.4 8 23.4H16C17.4728 23.4 18.6667 22.2359 18.6667 20.8V6.5ZM9.33333 9.1C10.0697 9.1 10.6667 9.68203 10.6667 10.4V18.2C10.6667 18.918 10.0697 19.5 9.33333 19.5C8.59695 19.5 8 18.918 8 18.2V10.4C8 9.68203 8.59695 9.1 9.33333 9.1ZM14.6667 9.1C15.403 9.1 16 9.68203 16 10.4V18.2C16 18.918 15.403 19.5 14.6667 19.5C13.9303 19.5 13.3333 18.918 13.3333 18.2V10.4C13.3333 9.68203 13.9303 9.1 14.6667 9.1ZM14.6667 0C15.403 0 16 0.58203 16 1.3C16 2.01797 15.403 2.6 14.6667 2.6H9.33333C8.59695 2.6 8 2.01797 8 1.3C8 0.58203 8.59695 0 9.33333 0H14.6667Z"
                      fill="#EC2025"
                    />
                  </svg>
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> : <div className="m-auto mt-10 font-semibold text-xl"> No data to show here </div>}
      {dataList.length > 100 && (
        <div className="flex justify-end gap-[30px]">
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 15L1 8L8 1"
              stroke="#404040"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L8 8L1 15"
              stroke="#404040"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default History;
