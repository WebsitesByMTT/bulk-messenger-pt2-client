import Table from "@/components/Table";
import React from "react";
import { getAllAgentsMessage } from "../lib/new-api";
import { getCurrentUser } from "../lib/server/utils";

const page = async () => {
  const data = await getAllAgentsMessage();
  const user = await getCurrentUser();
  const fieldsHeadings = ["Message", "Sent To", "Status", "Created At"];
  const fieldsData = ["message", "sent_to", "status", "created_at"];

  if (user.role === "admin") {
    fieldsHeadings.splice(fieldsHeadings.length - 2, 0, "Agent");
    fieldsData.splice(fieldsData.length - 2, 0, "agent");
  }

  console.log("MESSAGES : ", data);

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
