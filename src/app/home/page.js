import Navbar from "@/components/Sidebar";
import History from "@/components/History";
import NewMessage from "@/components/NewMessage";
const page = () => {
  return (
    <div className="flex">
      <Navbar />
      {/* <NewMessage /> */}
      <History />
    </div>
  );
};

export default page;
