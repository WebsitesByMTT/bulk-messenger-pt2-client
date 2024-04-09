"use client";
import Link from "next/link";
import LoginImage from "../assets/LoginImage.png";
import Image from "next/image";
import { getCurrentUser } from "@/app/lib/server/utils";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menus, setMenus] = useState([
    {
      id: 1,
      name: "Messages",
      link: "/message",
    },
  ]);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      if (user?.role === "admin") {
        setMenus([
          ...menus,
          {
            id: 2,
            name: "Agents",
            link: "/agents",
          },
          {
            id: 3,
            name: "Create",
            link: "/create",
          },
        ]);
      }
      setUser(user);
    })();
  }, []);

  const handleLogout = () => {
    console.log("Logout");
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <div
      className={
        pathname === "/login"
          ? "hidden"
          : "flex flex-col justify-between bg-[#252727] w-[20%] pl-8 h-screen min-w-[250px]"
      }
    >
      <div className="pt-10">
        <Link href="/newmessage">
          <svg
            width="90%"
            height="91"
            viewBox="0 0 327 91"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.8653 18.8788V42.7172L0 28.8114V4.24438C0 2.45256 1.45256 1 3.24438 1H70.4568C77.6241 1 83.4343 6.81023 83.4343 13.9775V65.2977C83.4343 67.0895 81.9817 68.5421 80.1899 68.5421H49.6633V50.6633H65.5555V18.8788H19.8653Z"
              fill="#1877F2"
            />
            <path
              d="M3.24438 68.5407H12.6479C14.4397 68.5407 15.8922 69.9933 15.8922 71.7851V88.5788C15.8922 90.2188 18.0478 90.823 18.9003 89.422L30.6577 70.0987C31.2464 69.1312 32.2969 68.5407 33.4293 68.5407H43.7037V50.6619H20.888C20.2224 50.6619 19.5728 50.4572 19.0275 50.0755L0 36.7562V65.2963C0 67.0882 1.45256 68.5407 3.24438 68.5407Z"
              fill="white"
            />
            <path
              d="M101.238 15.5C104.758 15.5 109.994 17.04 109.994 23.376C109.994 29.404 105.198 32.044 99.6103 32H89.9303V1.2H98.8183C104.406 0.848 109.29 3.004 109.29 8.592C109.29 14.004 104.758 15.412 101.238 15.412V15.5ZM95.3423 13.52H98.8183C101.766 13.52 103.878 12.2 103.878 9.076C103.878 6.172 101.766 5.116 98.8183 5.16H95.3423V13.52ZM95.3423 28.04H99.6543C102.734 28.084 104.582 26.104 104.582 22.716C104.582 19.372 101.766 17.436 98.8183 17.48H95.3423V28.04ZM118.168 1.288V19.9C118.168 29.844 131.28 30.152 131.28 19.9V1.288H136.648V20.428C136.648 35.828 112.8 36.048 112.8 20.428V1.288H118.168ZM154.245 27.82L154.201 32H139.593V1.2H145.269L145.005 27.82H154.245ZM161.677 1.2V16.468L170.169 1.2H175.581L167.309 16.072H176.021L168.453 32H163.041L169.333 19.504H161.721V32H156.265V1.2H161.677ZM108.894 49.2H119.102L118.75 80H113.514V54.832L109.598 80H99.1703L95.1663 54.216L94.8583 80H89.6663V49.2H99.6983L104.318 78.724L108.894 49.2ZM126.743 66.58L126.699 76.04H145.267V80H121.331V49.2H145.135V53.16H126.743V62.62H145.135V66.58H126.743ZM163.609 72.432C163.609 65.656 148.913 67.416 148.913 57.296C148.913 51.796 153.225 48.848 158.857 48.848C165.457 48.848 168.889 52.852 168.889 58.704H163.477C163.477 56.152 162.685 53.996 158.813 53.952C156.569 53.908 154.325 54.612 154.325 57.076C154.325 63.412 168.889 62.62 168.889 72.432C168.889 77.36 165.237 80.352 158.637 80.352C150.629 80.352 147.153 75.688 147.153 70.452H152.565C152.609 73.224 155.293 75.6 158.769 75.6C161.453 75.6 163.609 75.028 163.609 72.432ZM187.543 72.432C187.543 65.656 172.847 67.416 172.847 57.296C172.847 51.796 177.159 48.848 182.791 48.848C189.391 48.848 192.823 52.852 192.823 58.704H187.411C187.411 56.152 186.619 53.996 182.747 53.952C180.503 53.908 178.259 54.612 178.259 57.076C178.259 63.412 192.823 62.62 192.823 72.432C192.823 77.36 189.171 80.352 182.571 80.352C174.563 80.352 171.087 75.688 171.087 70.452H176.499C176.543 73.224 179.227 75.6 182.703 75.6C185.387 75.6 187.543 75.028 187.543 72.432ZM200.521 66.58L200.477 76.04H219.045V80H195.109V49.2H218.913V53.16H200.521V62.62H218.913V66.58H200.521ZM231.183 49.2L243.107 78.68V49.2H248.783L248.431 80H238.311L226.651 51.224L226.343 80H221.019V49.2H231.183ZM255.02 64.776C255.02 71.288 259.156 75.688 266.328 75.688C269.276 75.688 273.456 74.94 273.94 67.108V66.58H259.42V62.62H278.648V80H273.94V73.62C272.928 78.46 269.408 80.352 264.832 80.352C256.472 80.352 250.532 74.104 250.532 64.776C250.532 55.448 256.472 49.2 265.492 49.2H278.516L278.472 53.952L265.492 53.864C259.156 53.864 255.02 58.264 255.02 64.776ZM286.329 66.58L286.285 76.04H304.853V80H280.917V49.2H304.721V53.16H286.329V62.62H304.721V66.58H286.329ZM312.521 65.524L312.477 80H307.109V49.2H315.997C321.453 49.2 326.469 50.872 326.469 57.076C326.469 61.696 323.653 64.424 319.209 65.26L326.425 80H320.925L313.841 65.524H312.521ZM312.521 61.344H315.997C318.945 61.344 321.057 60.684 321.057 57.34C321.057 54.04 318.945 53.336 315.997 53.38H312.521V61.344Z"
              fill="white"
            />
          </svg>
        </Link>
        <ul className="text-white text-xl flex flex-col gap-[5px] mt-12">
          {menus.map((route, index) => (
            <Link
              key={index}
              href={route.link}
              className={` px-2 py-3 ${
                pathname === route.link ? "bg-white text-black pr-8 pl-4" : ""
              } rounded-tl-xl rounded-bl-xl transition-all duration-300 ease relative`}
            >
              <li>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`absolute top-[-15px] right-0 transition-all duration-200 ${
                    pathname === route.link ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15 15V0C15 8.2843 8.28427 15 0 15H15Z"
                    fill="white"
                  />
                </svg>
                <span>{route.name}</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`absolute bottom-[-15px] right-0 transition-all duration-200 ${
                    pathname === route.link ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15 0V15C15 6.71573 8.28427 0 0 0H15Z"
                    fill="white"
                  />
                </svg>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="py-4 flex items-center justify-between border-t-[2px] border-[#8C8C8C] text-white mr-8">
        <div className="flex gap-[10px] w-[90%] items-center">
          <div className="w-[50px] h-[50px]">
            <Image
              className="w-full h-full rounded-[100%]"
              src={LoginImage}
              alt=""
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user?.username}</h3>
          </div>
        </div>
        <div className=" w-1/6 cursor-pointer" onClick={handleLogout}>
          <svg
            width="100%"
            height="45%"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.0001 28.5H23.6251C24.918 28.5 26.158 27.9864 27.0722 27.0721C27.9864 26.1579 28.5001 24.9179 28.5001 23.625V7.37497C28.5001 6.08204 27.9864 4.84206 27.0722 3.92783C26.158 3.01359 24.918 2.49997 23.6251 2.49997H22.0001M9.00006 8.99997L2.50006 15.5M2.50006 15.5L9.00006 22M2.50006 15.5L22.0001 15.5"
              stroke="#D9D9D9"
              strokeWidth="3.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
