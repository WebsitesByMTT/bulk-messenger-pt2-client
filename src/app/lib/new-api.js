"use server";
import axios from "axios";
import { getCookie } from "./server/utils";
import { revalidatePath } from "next/cache";

export const getAllAgentsMessage = async () => {
  const token = await getCookie();
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages`,
      headers
    );

    return response?.data?.data;
  } catch (error) {
    console.log("Error  : ", error.message);
  }
};

export const getAgentAllMessages = async (username) => {
  const token = await getCookie();
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages/${username}`,
      headers
    );

    return response?.data?.data;
  } catch (error) {
    console.log("Error  : ", error.message);
  }
};

export const getAllAgents = async () => {
  const token = await getCookie();
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/agents`,
      headers
    );
    return response?.data?.agents;
  } catch (error) {
    console.log("Error  : ", error.message);
  }
};

export const updateAgentByUsername = async (username, data) => {
  console.log("USERNAME : ", username, data);
  const token = await getCookie();
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/agents/${username}`,
      data,
      headers
    );
    revalidatePath("/agents");
    return response?.data;
  } catch (error) {
    console.error("Update failed:", error);
  }

  console.log("hEADER : ", headers);
};

export const deleteAgentByUsername = async (username) => {
  const token = await getCookie();
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/agents/${username}`,
      headers
    );
    return response?.data;
  } catch (error) {
    console.error("Update failed:", error);
  }
};
