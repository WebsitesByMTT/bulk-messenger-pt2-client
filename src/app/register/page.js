"use client";
import { useState } from "react";
import styles from "./register.module.scss";
import axios from "axios";

const Page = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("agent");
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`;

  async function onSubmit(event) {
    event.preventDefault();

    const data = { username, name, password, role };

    try {
      const response = await axios.post(url, data);
      console.log("Response  : ", response);
    } catch (error) {
      console.error("Error : ", error.message);
    }
  }
  return (
    <div className={styles[`create-user`]}>
      <div className={styles.container}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="name"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            name="type"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Page;
