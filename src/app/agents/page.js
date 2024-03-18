import Table from "@/components/Table";
import React from "react";

const page = () => {
  const tableData = [
    {
      id: "1",
      name: "Rahul",
      username: "Rahul223",
      password: "1234567",
      createdAt: "8:45 am",
    },
    {
      id: "1",
      name: "Rahul",
      username: "Rahul223",
      password: "1234567",
      createdAt: "8:45 am",
    },
    {
      id: "1",
      name: "Rahul",
      username: "Rahul223",
      password: "1234567",
      createdAt: "8:45 am",
    },
    {
      id: "1",
      name: "Rahul",
      username: "Rahul223",
      password: "1234567",
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
