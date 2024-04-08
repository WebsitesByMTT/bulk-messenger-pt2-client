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
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/send`,
      message,
      headers
    );
    return response;
  } catch (error) {
    // console.error("Error", error.message);
    return error.response.data.errors[0].message;
  }
}

async function getAllAgents({ value }) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/agents`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        },
      }
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
  console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages`);
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

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/users/register`,
      formData,
      headers
    );
    return response;
  } catch (error) {
    return error.response.data.errors[0].message;
  }
}

async function deleteUsers(username) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/agents/${username}`,
      headers,
      {}
    );
    return response;
    // console.log("User deleted successfully");
  } catch (error) {
    // console.error(error);
    return error.response.data.errors[0].message;
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

const getAllAgentMessageByUsername = async (agent) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages/${agent}`,
      headers
    );
    return response?.data?.data;
  } catch (error) {
    console.error("Error", error.message);
  }
};

const getAllAgentsDetails = async ({ value }) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/agents`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        },
      }
    );
    return response?.data?.agents;
  } catch (error) {
    console.log("ERROR : ", error);
  }
};

export {
  sendMessage,
  getAgentData,
  deleteUsers,
  getAllAgents,
  getAllMessagesByUsername,
  createUsers,
  getAllMessages,
  updateAgent,
  getAllAgentMessageByUsername,
  getAllAgentsDetails,
};
