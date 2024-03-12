"use client";
import { useState } from "react";
import styles from "./login.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`;

  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    const data = { username, password };

    try {
      const response = await axios.post(url, data);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        router.push("/send-message");
      }
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
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default page;
