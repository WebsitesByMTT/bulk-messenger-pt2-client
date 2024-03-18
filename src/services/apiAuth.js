"use client";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

async function getAgentData() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages`,
      headers
    );
    return response?.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function sendMessage(message) {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/send`,
      message,
      headers
    );
  } catch (error) {
    console.error("Error", error.message);
  }
}

async function getAllAgents() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/agents`,
      headers
    );
    return response?.data?.users;
  } catch (error) {
    console.error("Error", error.message);
  }
}

async function getAllMessagesByUsername() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/agents`, headers,{
        params: {
            username: username,
          },
         } );
      return response?.data?.users;
    } catch (error) {
      console.error("Error", error.message);
    }
  }





async function deleteUsers(username) {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`,headers,{
      params: {
        username: username,
      },
    });
    console.log("User deleted successfully");
  } catch (error) {
    console.error(error);
  }
}

export { sendMessage, getAgentData, deleteUsers, getAllAgents,getAllMessagesByUsername };
