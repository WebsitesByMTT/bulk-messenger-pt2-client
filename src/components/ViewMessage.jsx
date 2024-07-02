import React from "react";

const ViewMessage = ({
  sent_to,
  message,
  status,
  agent,
  reason,
  scheduledAt,
  createdAt,
  updatedAt,
}) => {
  // {
  //   "_id": "667d29c66f68beb388302973",
  //   "sent_to": "1234",
  //   "message": "HELLO",
  //   "status": "success",
  //   "agent": {
  //     "_id": "667d292bd440bc4238b920ba",
  //     "name": "underpin"
  //   },
  //   "reason": "MSG SENDED TO USER AND CONFIRM WITH SEND FLAG IN MESSAGE TABLE",
  //   "scheduledAt": "2024-06-27T08:58:46.806Z",
  //   "createdAt": "2024-06-27T08:58:46.815Z",
  //   "updatedAt": "2024-06-27T08:59:01.457Z",
  //   "__v": 0
  // }

  return (
    <div className="h-full flex flex-col items-start justify-center">
      <div className="flex text-lg p-3 items-center gap-2">
        <span className=" font-bold ">Agent : </span> <p>{agent?.name}</p>
      </div>
      <div className="flex text-lg p-3 items-center gap-2">
        <span className=" font-bold ">Sent To : </span> <p>{sent_to}</p>
      </div>
      <div className="flex text-lg p-3 items-center gap-2">
        <span className=" font-bold ">Message : </span> <p>{message}</p>
      </div>
      <div className="flex text-lg p-3 items-center gap-2">
        <span className=" font-bold ">Status : </span>{" "}
        <p className={`py-1 px-4 status-${status} rounded-3xl`}>{status}</p>
      </div>
      <div className="flex text-lg p-3 items-center gap-2">
        <span className=" font-bold ">Created At : </span> <p>{createdAt}</p>
      </div>
      <div className="flex text-lg p-3 items-center gap-2">
        <span className=" font-bold ">Created At : </span> <p>{scheduledAt}</p>
      </div>
    </div>
  );
};

export default ViewMessage;
