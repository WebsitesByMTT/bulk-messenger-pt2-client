import Table from "@/components/Table";
import React from "react";
import { getAllAgentsMessage, getAllTasks } from "../lib/new-api";

const page = async () => {
  const fieldsHeadings = [
    "Message",
    "Agent",
    "Sent To",
    "Status",
    "Scheduled At",
    "Created At",
  ];
  const fieldsData = [
    "message",
    "agent",
    "sent_to",
    "status",
    "scheduledAt",
    "createdAt",
  ];
  const data = await getAllTasks();

  console.log("Data : ", data);

  return (
    <div className="">
      <Table
        type="agentMessage"
        data={data}
        fieldsHeadings={fieldsHeadings}
        fieldsData={fieldsData}
      />
    </div>
  );
};

export default page;
