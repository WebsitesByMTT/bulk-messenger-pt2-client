"use server";
import axios from "axios";
import { getCookie } from "./server/utils";
import { revalidatePath } from "next/cache";
import { config } from "@/utils/config";
import { data } from "autoprefixer";

export const createUsers = async (formData) => {
  const token = await getCookie();

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
      `${config.server}/api/users/register`,
      formData,
      headers
    );
    return response?.data?.message;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      throw new Error(error.response.data.message || "Server Error");
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("Network Error. Please try again.");
    } else {
      // Something else happened while setting up the request
      throw new Error(error.message || "An unknown error occurred");
    }
  } finally {
    revalidatePath("/agents");
  }
};

export const getAllTasks = async () => {
  const token = await getCookie();
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`${config.server}/api/tasks`, headers);

    return response?.data;
  } catch (error) {
    console.log("Error  : ", error.message);
  }
};

export const getAgentAllTasks = async (userId) => {
  const token = await getCookie();
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(
      `${config.server}/api/users/${userId}/tasks`,
      headers
    );

    return response?.data;
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
      `${config.server}/api/users/agents`,
      headers
    );
    return response?.data;
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
      `${config.server}/api/users/agents/${username}`,
      data,
      headers
    );
    return response?.data;
  } catch (error) {
    console.error("Update failed:", error);
  } finally {
    revalidatePath("/agents");
  }
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/agents/${username}`,
      headers
    );
    return response?.data;
  } catch (error) {
    console.error("Delete failed:", error);
    throw new Error(error.response?.data?.message || "Internal server error");
  } finally {
    revalidatePath("/agents");
  }
};
