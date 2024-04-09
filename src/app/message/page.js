import Table from "@/components/Table";
import React from "react";
import { getAgentAllMessages, getAllAgentsMessage } from "../lib/new-api";
import { getCurrentUser } from "../lib/server/utils";

const page = async () => {
  const user = await getCurrentUser();
  const fieldsHeadings = ["Message", "Sent To", "Status", "Created At"];
  const fieldsData = ["message", "sent_to", "status", "created_at"];
  let data = await getAllAgentsMessage();

  if (user.role === "admin") {
    fieldsHeadings.splice(fieldsHeadings.length - 2, 0, "Agent");
    fieldsData.splice(fieldsData.length - 2, 0, "agent");
    data = await getAllAgentsMessage();
  } else {
    data = await getAgentAllMessages(user.username);
  }


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
