"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getAgentData } from "../lib/api";
import Table from "@/components/Table";



const History = () => {
  useEffect(() => {
    (async () => {
      try {
        const agentData = await getAgentData();
        setData(agentData);
        console.log(agentData);
      } catch (error) {
        console.error("Error fetching agent data:", error);
      }
    })();
  }, []);

  const tableData = [
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



  const [searched, setSearched] = useState("");

  const currentDate = new Date().toISOString().split("T")[0];

  const [dataList, setDataList] = useState("");

  const handleDelete = (itemId) => {
    setDataList((prevData) => prevData.filter((item) => item.id !== itemId));
  };

  const [data, setData] = useState([]);

  return (
    <div>
      <Table tableData={tableData} />
    </div>
  );
};

export default History;
