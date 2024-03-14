"use client";
import { motion } from "framer-motion";

const History = () => {
  return (
    <motion.div
      className="mt-[150px] mx-auto w-[60%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <table className="w-full">
        <thead>
          <tr>
            <th>Message</th>
            <th>User ID</th>
            <th>Facebook ID</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hello hi hey</td>
            <td>Rahul</td>
            <td>asdfghjk</td>
            <td>
              <div className="flex items-center justify-center gap-[5px] bg-[#85c44191] rounded-md w-[60%] px-2 py-1 m-auto">
                <svg
                  width="7"
                  height="8"
                  viewBox="0 0 7 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3.5" cy="4" r="3.5" fill="#276956" />
                </svg>

                <span className="text-[#276956] font-semibold">Accepted</span>
              </div>
            </td>
            <td>8:45 am</td>
          </tr>
          <tr>
            <td>Hello hi hey</td>
            <td>Rahul</td>
            <td>asdfghjk</td>
            <td>
              <div className="flex items-center justify-center gap-[5px] bg-[#85c44191] rounded-md  w-[60%] px-2 py-1  m-auto">
                <svg
                  width="7"
                  height="8"
                  viewBox="0 0 7 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3.5" cy="4" r="3.5" fill="#276956" />
                </svg>

                <span className="text-[#276956] font-semibold">Accepted</span>
              </div>
            </td>
            <td>8:45 am</td>
          </tr>
          <tr>
            <td>Hello hi hey</td>
            <td>Rahul</td>
            <td>asdfghjk</td>
            <td>
              <div className="flex items-center justify-center gap-[5px] bg-[#ec202371] rounded-md w-[60%] px-2 py-1  m-auto">
                <svg
                  width="7"
                  height="8"
                  viewBox="0 0 7 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3.5" cy="4" r="3.5" fill="#7F2600" />
                </svg>

                <span className="text-[#7F2600] font-semibold">Rejected</span>
              </div>
            </td>
            <td>8:45 am</td>
          </tr>
          <tr>
            <td>Hello hi hey</td>
            <td>Rahul</td>
            <td>asdfghjk</td>
            <td>
              <div className="flex items-center justify-center gap-[5px] bg-[#ec202371] rounded-md w-[60%] px-2 py-1  m-auto">
                <svg
                  width="7"
                  height="8"
                  viewBox="0 0 7 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3.5" cy="4" r="3.5" fill="#7F2600" />
                </svg>

                <span className="text-[#7F2600] font-semibold">Rejected</span>
              </div>
            </td>
            <td>8:45 am</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
};

export default History;
