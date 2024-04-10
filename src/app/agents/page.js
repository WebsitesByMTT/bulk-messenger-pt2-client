import Table from "@/components/Table";
import { cookies } from "next/headers";
import React from "react";
import { getAllAgents } from "../lib/new-api";
import { getCurrentUser } from "../lib/server/utils";

const page = async () => {
  const data = await getAllAgents();
  const user = await getCurrentUser();
  const fieldsHeadings = [
    "ID",
    "Name",
    "Username",
    "Status",
    "Created At",
    "Messages",
    "Edit",
  ];
  const fieldsData = [
    "id",
    "name",
    "username",
    "status",
    "created_at",
    "messages",
    "edit",
  ];

  return (
    <Table
      type="agentTable"
      data={data}
      fieldsHeadings={fieldsHeadings}
      fieldsData={fieldsData}
    />
  );
};

export default page;
