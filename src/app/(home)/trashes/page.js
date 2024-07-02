import Table from "@/components/Table";
import { getAllTrashes } from "../../lib/new-api";

const page = async () => {
  const fieldsHeadings = [
    "Message",
    "Agent",
    "Sent To",
    "Status",
    "Reason",
    "Scheduled At",
    "Created At",
  ];
  const fieldsData = [
    "message",
    "agent",
    "sent_to",
    "status",
    "reason",
    "scheduledAt",
    "createdAt",
  ];
  const data = await getAllTrashes();
  return (
    <div>
      <Table
        type="trashes"
        data={data}
        fieldsHeadings={fieldsHeadings}
        fieldsData={fieldsData}
      />
    </div>
  );
};

export default page;
