"use server";
import axios from "axios";
import { getCookie } from "./server/utils";

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

export const updateAgentStatus = async (username, data) => {
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

    return response;
  } catch (error) {
    console.log("Error  : ", error.message);
  }
};
