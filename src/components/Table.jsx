"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  getAllAgents,
  getAllMessages,
  getAllMessagesByUsername,
  updateAgent,
} from "@/app/lib/api";
import userDetails from "@/app/lib/token";
import Modal from "./Modal";
import toast from "react-hot-toast";

const MODAL_CONTENT_TYPES = {
  MESSAGES: "messages",
  EDIT_AGENT: "editAgent",
};

const Table = ({ type, data }) => {
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
  const currentDate = new Date().toISOString().split("T")[0];
  const [createdAtSortOrder, setCreatedAtSortOrder] = useState("asc");
  const [userStatus, setUserStatus] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  function formatDate(dateString) {
    const date = new Date(dateString);
    // Format the date and time separately
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour format
    });

    return { formattedDate, formattedTime };
  }

  //getAllAgents
  // function fetch(para) {
  //   (async () => {
  //     try {
  //       const agentData = await para();
  //       setTableData(agentData);
  //       setFilteredData(agentData);
  //       console.log(agentData.created_at);
  //     } catch (error) {
  //       console.error("Error fetching agent data:", error);
  //     }
  //   })();
  // }

  // set table according to requirement
  useEffect(() => {
    switch (role) {
      case "admin":
        switch (pathname) {
          case "/message":
            setTableHeaders(["Message", "Sent to", "Agent"]);
            setDataFields(["message", "sent_to", "agent"]);
            fetch(getAllMessages);
            setFieldToSearch("agent");
            break;
          case "/agents":
            if (type === "agentMessage") {
            }
            setTableHeaders(["Name", "Username", "Password"]);
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
  }, [role, pathname]);

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

  const sortDataHandler = () => {
    const dataToSort = filteredData.length > 0 ? filteredData : tableData;

    const sortedData = [...dataToSort].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime(); // Parse and convert to numeric timestamp
      const dateB = new Date(b.created_at).getTime(); // Parse and convert to numeric timestamp
      const sortOrder = createdAtSortOrder;

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredData(sortedData);
    setCreatedAtSortOrder(createdAtSortOrder === "asc" ? "desc" : "asc");
  };

  const changeUserStatusHandler = async (username, status, newStatus) => {
    try {
      setUserStatus(newStatus);
      const response = await updateAgent(username, { status: newStatus });
      console.log(response.data);
      if (response.data.success) toast.success(response.data.message);
      else toast.error(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong : Unable to update status");
    }
  };

  const handleOpenEditModal = (userId) => {
    setSelectedUserId(userId);
    setModalContent(MODAL_CONTENT_TYPES.EDIT_AGENT);
    setIsModalOpen(true);
  };

  const handleOpenMessagesModal = (userId) => {
    setSelectedUserId(userId);
    setModalContent(MODAL_CONTENT_TYPES.MESSAGES);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        className={`mx-auto w-full  flex flex-col gap-6 mb-6 p-8`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-3 px-4 py-2 rounded-3xl bg-[whitesmoke] w-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
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
            <tr className=" border-b-[1px] border-[#8c8c8c]">
              {tableHeaders?.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              {pathname === "/agents" ? (
                <th>Status</th>
              ) : (
                <th>
                  <select
                    className="p-2 bg-transparent"
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

              <th
                className=" flex items-center justify-center gap-4"
                onClick={sortDataHandler}
              >
                <span>Created At</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`${createdAtSortOrder}`}
                >
                  <path d="m3 16 4 4 4-4" />
                  <path d="M7 20V4" />
                  <path d="m21 8-4-4-4 4" />
                  <path d="M17 4v16" />
                </svg>
              </th>

              {pathname === "/agents" && type === undefined && (
                <>
                  <th>Messages</th>
                  <th>Edit</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              <>
                {filteredData?.map((data, index) => {
                  const { formattedDate, formattedTime } = formatDate(
                    data.created_at
                  );
                  return (
                    <tr
                      key={data.id}
                      className=" hover:bg-[whitesmoke] transition-all"
                    >
                      {dataFields.map((field, index) => (
                        <td key={index}>
                          {field === "password"
                            ? data[field].substring(0, 9)
                            : field === "message"
                            ? data[field].substring(0, 20)
                            : data[field]}
                        </td>
                      ))}
                      {pathname === "/message" && (
                        <td>
                          <div
                            className={` ${
                              data.status === "success"
                                ? "bg-[#84c4414d] text-[#276956]"
                                : "bg-[#ec20254d] text-[#7f2600]"
                            } ${
                              data.status === "pending"
                                ? "bg-[#ebff004d] text-[#c57600]"
                                : ""
                            } w-[100%] capitalize p-2 rounded-2xl text-center `}
                          >
                            <span
                              className={`${
                                data.status === "success"
                                  ? "text-[#276956]"
                                  : "text-[#7F2600]"
                              } w-[90%] capitalize`}
                            >
                              {data.status}
                            </span>
                          </div>
                        </td>
                      )}
                      {pathname === "/agents" && (
                        <td className="">
                          <select
                            defaultValue={data.status}
                            onChange={(e) =>
                              changeUserStatusHandler(
                                data.username,
                                data.status,
                                e.target.value
                              )
                            }
                            className={`${
                              data.status === "active"
                                ? "text-[#276956] bg-[#84c4414d]"
                                : "text-[#7f2600] bg-[#ec20254d]"
                            } w-[100%] capitalize p-2 rounded-2xl text-center appearance-none cursor-pointer`}
                          >
                            <option value="active">active</option>
                            <option value="inactive">inactive</option>
                          </select>
                        </td>
                      )}
                      <td className="time">
                        <p>{formattedTime}</p>
                        <p>{formattedDate}</p>
                      </td>
                      {pathname === "/agents" && type == undefined && (
                        <>
                          <td
                            className=""
                            onClick={() =>
                              handleOpenMessagesModal(data?.username)
                            }
                          >
                            <div className=" flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                <path d="M13 8H7" />
                                <path d="M17 12H7" />
                              </svg>
                            </div>
                          </td>
                          <td
                            className=""
                            onClick={() => handleOpenEditModal(data?.username)}
                          >
                            <div className=" flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="lucide lucide-ellipsis-vertical"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </>
            ) : (
              <tr className="w-full relative">
                <div class="loader"></div>
              </tr>
            )}
          </tbody>
        </table>
        {/* {filteredData?.length > 10 && (
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )} */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {modalContent === MODAL_CONTENT_TYPES.MESSAGES && (
            <Table type={"agentMessage"} />
          )}
          {modalContent === MODAL_CONTENT_TYPES.EDIT_AGENT && (
            <h1>{selectedUserId}</h1>
          )}
        </Modal>{" "}
      </motion.div>
    </>
  );
};
export default Table;
