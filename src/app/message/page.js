import Table from "@/components/Table";
import React from "react";

const page = () => {
  const tableData = [
    {
      id: "1",
      agent: "xyz",
      sentFrom: "abc",
      sentTo: "rahul",
      message: "hi hello hey",
      status: "Accepted",
      createdAt: "8:45 am",
    },
    {
      id: "2",
      agent: "xyz",
      sentFrom: "abc",
      sentTo: "rahul",
      message: "hi hello hey",
      status: "Accepted",
      createdAt: "8:45 am",
    },
    {
      id: "3",
      agent: "xyz",
      sentFrom: "abc",
      sentTo: "rahul",
      message: "hi hello hey",
      status: "Accepted",
      createdAt: "8:45 am",
    },
    {
      id: "4",
      agent: "xyz",
      sentFrom: "abc",
      sentTo: "rahul",
      message: "hi hello hey",
      status: "Accepted",
      createdAt: "8:45 am",
    },
    {
      id: "5",
      agent: "xyz",
      sentFrom: "abc",
      sentTo: "rahul",
      message: "hi hello hey",
      status: "Accepted",
      createdAt: "8:45 am",
    },
    {
      id: "6",
      agent: "xyz",
      sentFrom: "abc",
      sentTo: "rahul",
      message: "hi hello hey",
      status: "Accepted",
      createdAt: "8:45 am",
    },
    {
      id: "7",
      agent: "xyz",
      sentFrom: "abc",
      sentTo: "rahul",
      message: "hi hello hey",
      status: "Accepted",
      createdAt: "8:45 am",
    },
  ];

  return (
    <div>
      <Table tableData={tableData} />
    </div>
  );
};

export default page;
