"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  getAllAgents,
  getAllMessages,
  getAllMessagesByUsername,
} from "@/app/lib/api";
import userDetails from "@/app/lib/token";
import Modal from "./Modal";

const Table = () => {
  const pathname = usePathname();
  const role = userDetails?.role;
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState(tableData);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [dataFields, setDataFields] = useState([]);
  const [fieldToSearch, setFieldToSearch] = useState("");
  const [searched, setSearched] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRowFields, setSelectedRowFields] = useState([]);
  const [open, setOpen] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];

  // format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  //getAllAgents
  function fetch(para) {
    (async () => {
      try {
        const agentData = await para();
        setTableData(agentData);
        setFilteredData(agentData);
        console.log(agentData.created_at);
      } catch (error) {
        console.error("Error fetching agent data:", error);
      }
    })();
  }

  // set table according to requirement
  useEffect(() => {
    switch (role) {
      case "admin":
        switch (pathname) {
          case "/message":
            setTableHeaders(["Agent", "Sent From", "Sent to", "Message"]);
            setDataFields(["agent", "sent_from", "sent_to", "message"]);
            fetch(getAllMessages);
            setFieldToSearch("agent");
            break;
          case "/agents":
            setTableHeaders(["Name", "User Name", "Password"]);
            setDataFields(["name", "username", "password"]);
            fetch(getAllAgents);
            setFieldToSearch("name");
            break;
        }
        break;

      case "agent":
        switch (pathname) {
          case "/message":
            setTableHeaders(["Message", "User ID", "Facebook Id"]);
            setDataFields(["message", "agent", "sent_to"]);
            fetch(getAllMessagesByUsername);
            setFieldToSearch("agent");
            break;
        }
        break;

      default:
        break;
    }
  }, [role, pathname, open]);

  // Search according to field
  useEffect(() => {
    if (!searched.trim()) {
      setFilteredData(tableData);
    } else {
      setFilteredData(() =>
        tableData.filter(
          (item) =>
            item[fieldToSearch] &&
            item[fieldToSearch]
              .toString()
              .toLowerCase()
              .includes(searched.toLowerCase())
        )
      );
    }
  }, [searched, fieldToSearch, tableData]);

  // Filter according to status
  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setSelectedStatus(selectedStatus);
    setFilteredData(
      tableData.filter((data) => {
        if (selectedStatus === "All") return true;
        return data.status === selectedStatus;
      })
    );
  };

  // Filter according to date
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFilteredData(
      tableData.filter((item) => {
        const itemDate = new Date(item.created_at).toISOString().split("T")[0];

        return itemDate === selectedDate;
      })
    );
  };

  // Filter according to time
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    if (selectedTime === "all") {
      return tableData;
    }
    setFilteredData(() =>
      tableData.filter((record) => {
        const createdAt = new Date(record.created_at);
        const createdAtHour = createdAt.getHours() % 12 || 12;
        const selectedHour = parseInt(selectedTime);
        return (
          createdAtHour >= selectedHour && createdAtHour < selectedHour + 1
        );
      })
    );
    return filteredData;
  };

  // pass data to Modal
  const handleRowClick = (rowData, field) => {
    setSelectedRowData(rowData);
    setSelectedRowFields(field);
    setOpen(true);
  };

  return (
    <>
      <motion.div
        className={` ${
          open ? "blur-[2px]" : " "
        } mt-[100px] mx-auto w-fit min-w-[70%] flex flex-col gap-6 mb-6`}
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.75749 3.25359C8.03226 3.25359 6.37769 3.9389 5.15777 5.15877C3.93784 6.37863 3.2525 8.03312 3.2525 9.75827C3.2525 11.4834 3.93784 13.1379 5.15777 14.3578C6.37769 15.5776 8.03226 16.263 9.75749 16.263C11.4827 16.263 13.1373 15.5776 14.3572 14.3578C15.5771 13.1379 16.2625 11.4834 16.2625 9.75827C16.2625 8.03312 15.5771 6.37863 14.3572 5.15877C13.1373 3.9389 11.4827 3.25359 9.75749 3.25359ZM1.84517e-07 9.75827C-0.000195784 8.22268 0.362072 6.70873 1.05734 5.33954C1.75261 3.97036 2.76124 2.7846 4.00122 1.8787C5.24119 0.972807 6.67748 0.372358 8.19328 0.12619C9.70908 -0.119979 11.2616 -0.00491509 12.7245 0.462022C14.1875 0.928959 15.5195 1.73458 16.6124 2.81338C17.7053 3.89217 18.5281 5.21367 19.0139 6.67039C19.4997 8.12711 19.6348 9.67793 19.4082 11.1967C19.1816 12.7155 18.5997 14.1593 17.7099 15.4108L25.5435 23.2441C25.8397 23.5508 26.0036 23.9616 25.9999 24.388C25.9962 24.8143 25.8252 25.2222 25.5237 25.5237C25.2222 25.8252 24.8143 25.9962 24.3879 25.9999C23.9615 26.0036 23.5507 25.8397 23.244 25.5435L15.412 17.7119C13.9522 18.7498 12.2348 19.3659 10.4481 19.4927C8.66141 19.6195 6.87427 19.252 5.28254 18.4306C3.69082 17.6092 2.35593 16.3654 1.42414 14.8357C0.492364 13.306 -0.0003481 11.5494 1.84517e-07 9.75827Z"
                fill="#404040"
              />
            </svg>
            <input
              className="bg-transparent"
              placeholder="search"
              onChange={(e) => {
                setSearched(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="date"
              name="date"
              onChange={handleDateChange}
              defaultValue={currentDate}
              max={currentDate}
              className="border-[#8C8C8C] border-2 p-1 rounded-lg"
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              {tableHeaders?.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              {pathname === "/agents" ? (
                <th>
                  <select
                    className="p-2"
                    defaultValue="Status"
                    onChange={handleStatusChange}
                  >
                    <option hidden value="Status">
                      Status
                    </option>
                    <option value="All">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </th>
              ) : (
                <th>
                  <select
                    className="p-2"
                    defaultValue="Status"
                    onChange={handleStatusChange}
                  >
                    <option hidden value="Status">
                      Status
                    </option>
                    <option value="All">All</option>
                    <option value="success">success</option>
                    <option value="failed">failed</option>
                  </select>
                </th>
              )}
              <th>
                <select className="p-2 text-center" onChange={handleTimeChange}>
                  <option hidden value="Created At">
                    Created At
                  </option>
                  <option value="1">1-2</option>
                  <option value="2">2-3</option>
                  <option value="3">3-4</option>
                  <option value="4">4-5</option>
                  <option value="5">5-6</option>
                  <option value="6">6-7</option>
                  <option value="7">7-8</option>
                  <option value="8">8-9</option>
                  <option value="9">9-10</option>
                  <option value="10">10-11</option>
                  <option value="11">11-12</option>
                  <option value="11">12-1</option>
                  <option value="all">All</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              <>
                {filteredData?.map((data) => (
                  <tr
                    key={data.id}
                    onClick={() => handleRowClick(data, dataFields)}
                  >
                    {dataFields.map((field, index) => (
                      <td key={index}>
                        {field === "password"
                          ? data[field].substring(0, 9)
                          : data[field]}
                      </td>
                    ))}
                    <td>
                      <div
                        className={`flex items-center justify-center gap-[5px] ${
                          data.status === "success" || data.status === "active"
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
                            fill={
                              data.status === "success" ||
                              data.status === "active"
                                ? "#276956"
                                : "#7F2600"
                            }
                          />
                        </svg>
                        <span
                          className={`
                      ${
                        data.status === "success" || data.status === "active"
                          ? "text-[#276956]"
                          : "text-[#7F2600]"
                      } w-[90%] capitalize`}
                        >
                          {data.status}
                        </span>
                      </div>
                    </td>
                    <td>{formatDate(data.created_at)}</td>
                  </tr>
                ))}
              </>
            ) : (
              <div className="m-auto w-full mt-10 font-semibold text-xl">
                No data to show here
              </div>
            )}
          </tbody>
        </table>
        {filteredData?.length > 10 && (
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
      {open && (
        <Modal
          setOpen={setOpen}
          rowData={selectedRowData}
          field={selectedRowFields}
          setRowData={setSelectedRowData}
          setFilteredData={setFilteredData}
          setTableData={setTableData}
        />
      )}
    </>
  );
};
export default Table;
