import React from "react";

const ViewMessage = ({ message }) => {
  console.log("MESSAGE : ", message);

  //   agent: "gaurav";
  //   created_at: "2024-04-04T07:56:38.952Z";
  //   id: 574;
  //   message: "hey win 100$ free by playing casino games";
  //   sent_to: "100048062970799";
  //   status: "success";

  return (
    <div className="h-full flex flex-col items-start justify-center">
      <div className="flex text-lg p-3 items-center gap-2">
        <span className=" font-bold ">Agent : </span> <p>{message.agent}</p>
      </div>
      <div className="flex text-lg p-3 items-center gap-2">
        <span className=" font-bold ">Created At : </span>{" "}
        <p>{message.created_at}</p>
      </div>
      <div className="flex text-lg p-3 items-center gap-2">
        <span className=" font-bold ">Message : </span> <p>{message.message}</p>
      </div>
      <div className="flex text-lg p-3 items-center gap-2">
        <span className=" font-bold ">Sent To : </span> <p>{message.sent_to}</p>
      </div>
      <div className="flex text-lg p-3 items-center gap-2">
        <span className=" font-bold ">Status : </span>{" "}
        <p className={`py-1 px-4 status-${message.status} rounded-3xl`}>
          {message.status}
        </p>
      </div>
    </div>
  );
};

export default ViewMessage;
