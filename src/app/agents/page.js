import Table from "@/components/Table";

const page = () => {
  const tableData = [
    {
      id: "1",
      name: "Rahul",
      username: "Rahul223",
      password: "1234567",
      createdAt: "8:45 am",
    },
    {
      id: "2",
      name: "Rahul",
      username: "Rahul223",
      password: "1234567",
      createdAt: "8:45 am",
    },
    {
      id: "3",
      name: "Rahul",
      username: "Rahul223",
      password: "1234567",
      createdAt: "8:45 am",
    },
    {
      id: "4",
      name: "Rahul",
      username: "Rahul223",
      password: "1234567",
      createdAt: "8:45 am",
    },
  ];

  return (
    <div>
      <Table tableData={tableData} />
    </div>
  );
};

export default page;
