"use client";
import { useState } from "react";
import styles from "./sendMessage.module.scss";
import axios from "axios";

const Page = () => {
  const [fbUsername, setFbUsername] = useState("gaurav.trippybug@gmail.com");
  const [fbPassword, setFbPassword] = useState("trippybug@gaurav1234");
  const [message, setMessage] = useState("Hiiiiiii");
  const [userIds, setUserIds] = useState("61552595723383");
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/send`;

  async function onSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const data = { fbUsername, fbPassword, message, userIds };

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
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
            name="facebookId"
            placeholder="Facebook Id"
            value={fbUsername}
            onChange={(e) => setFbUsername(e.target.value)}
          />

          <input
            type="password"
            name="facebookPassword"
            placeholder="Facebook Password"
            value={fbPassword}
            onChange={(e) => setFbPassword(e.target.value)}
          />

          <textarea
            type="text"
            name="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <textarea
            type="text"
            name="userIds"
            placeholder="Enter users id"
            value={userIds}
            onChange={(e) => setUserIds(e.target.value)}
          />

          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Page;
