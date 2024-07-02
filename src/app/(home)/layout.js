import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="overflow-y-scroll h-screen flex-1 hideScrollbar min-w-[900px] relative">
        {children}
      </div>
    </>
  );
}
