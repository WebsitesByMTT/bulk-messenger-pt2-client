import Table from "@/components/Table";
import { cookies } from "next/headers";
import React from "react";
import { getAllAgents, getAllAgentsDetails, getAllMessages } from "../lib/api";

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const agents = await getAllAgents(token);

  const dataHeadings = ""

  return <Table type="agentMessage" data={agents} />;
};

export default page;
