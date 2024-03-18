"use client";
import { useEffect } from "react";
import Table from "@/components/Table";
import { getAgentData } from "../lib/api";

const History = () => {
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const agentData = await getAgentData();
  //       setData(agentData);
  //     } catch (error) {
  //       console.error("Error fetching agent data:", error);
  //     }
  //   })();
  // }, []);

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
      userId: "asdfghj",
      facebookId: "asdfghjkl",
      status: "Rejected",
      createdAt: "8:45 am",
    },
    {
      id: "3",
      message: "hi hello hey",
      userId: "asdfgh",
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
    {
      id: "8",
      message: "hi hello hey",
      userId: "Rahul",
      facebookId: "asdfghjkl",
      status: "Rejected",
      createdAt: "8:45 am",
    },
    {
      id: "9",
      message: "hi hello hey",
      userId: "Rahul",
      facebookId: "asdfghjkl",
      status: "Rejected",
      createdAt: "8:45 am",
    },
    {
      id: "10",
      message: "hi hello hey",
      userId: "Rahul",
      facebookId: "asdfghjkl",
      status: "Rejected",
      createdAt: "8:45 am",
    },
  ];

  return (
    <div>
      <Table tableData={tableData} />
    </div>
  );
};

export default History;
