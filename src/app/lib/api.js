import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const username = Cookies.get("username");
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
    return response?.data?.agents;
  } catch (error) {
    console.error("Error", error.message);
  }
}

async function getAllMessagesByUsername() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages/${username}`,
      headers
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error", error.message);
  }
}

async function getAllMessages() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages`,
      headers
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error", error.message);
  }
}

async function createUsers(formData) {
  try {
    let headers = {};
    if (formData.role === "admin") {
      headers = {
        headers: {
          Authorization: `Bearer ${formData.keys}`,
        },
      };
    } else {
      headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/users/register`,
      formData,
      headers
    );
  } catch (error) {
    console.error("Error", error.message);
  }
}

async function deleteUsers(username) {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/agents/${username}`,
      headers,
      {}
    );
    console.log("User deleted successfully");
  } catch (error) {
    console.error(error);
  }
}
async function updateAgent(username, agentdata) {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/agents/${username}`,
      agentdata,
      headers
    );
    console.log("Agent updated successfully");
    return response;
  } catch (error) {
    console.error(error);
  }
}

export {
  sendMessage,
  getAgentData,
  deleteUsers,
  getAllAgents,
  getAllMessagesByUsername,
  createUsers,
  getAllMessages,
  updateAgent,
};
