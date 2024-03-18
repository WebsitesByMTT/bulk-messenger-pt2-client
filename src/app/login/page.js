"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoginImage from "../../assets/LoginImage.png";
import Image from "next/image";
import Cookies from "js-cookie";

const Page = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const role = Cookies.get("role");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const router = useRouter();
  //login api
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/users/login`,
        formData
      );
      if (response?.data?.token) {
        Cookies.set("token", response?.data?.token);
        Cookies.set("role", response?.data?.role);
        router.push(`dashboard/${role.value}`);
      }
      setFormData({ username: "", password: "" });
      setError("");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid username or password.");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center w-screen h-screen p-10">
        <div className="w-[60%]">
          <div className="w-[35%] m-auto">
            <svg
              width="100%"
              height="auto"
              viewBox="0 0 108 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.53496 7.88146V15.7234L0 11.1489V2.94668C0 2.42384 0.42384 2 0.946675 2H23.6601C25.7515 2 27.4468 3.69536 27.4468 5.7867V23.2722C27.4468 23.795 27.023 24.2189 26.5002 24.2189H16.3374V18.3374H21.5654V7.88146H6.53496Z"
                fill="#1877F2"
              />
              <path
                d="M0.946677 24.2188H4.28129C4.80413 24.2188 5.22797 24.6427 5.22797 25.1655V31.0257C5.22797 31.5043 5.85693 31.6806 6.10567 31.2718L10.1205 24.6734C10.2923 24.3911 10.5988 24.2188 10.9292 24.2188H14.3769V18.3374H6.83337C6.63914 18.3374 6.44961 18.2776 6.29049 18.1662L0 13.7629V23.2721C0 23.795 0.423842 24.2188 0.946677 24.2188Z"
                fill="black"
              />
              <path
                d="M35.5208 6.75C36.6408 6.75 38.3068 7.24 38.3068 9.256C38.3068 11.174 36.7808 12.014 35.0028 12H31.9228V2.2H34.7508C36.5288 2.088 38.0828 2.774 38.0828 4.552C38.0828 6.274 36.6408 6.722 35.5208 6.722V6.75ZM33.6448 6.12H34.7508C35.6888 6.12 36.3608 5.7 36.3608 4.706C36.3608 3.782 35.6888 3.446 34.7508 3.46H33.6448V6.12ZM33.6448 10.74H35.0168C35.9968 10.754 36.5848 10.124 36.5848 9.046C36.5848 7.982 35.6888 7.366 34.7508 7.38H33.6448V10.74ZM40.9076 2.228V8.15C40.9076 11.314 45.0796 11.412 45.0796 8.15V2.228H46.7876V8.318C46.7876 13.218 39.1996 13.288 39.1996 8.318V2.228H40.9076ZM52.3866 10.67L52.3726 12H47.7246V2.2H49.5306L49.4466 10.67H52.3866ZM54.7513 2.2V7.058L57.4533 2.2H59.1753L56.5433 6.932H59.3153L56.9073 12H55.1853L57.1873 8.024H54.7653V12H53.0293V2.2H54.7513ZM37.9568 17.2H41.2048L41.0928 27H39.4268V18.992L38.1808 27H34.8628L33.5888 18.796L33.4908 27H31.8388V17.2H35.0308L36.5008 26.594L37.9568 17.2ZM43.636 22.73L43.622 25.74H49.53V27H41.914V17.2H49.488V18.46H43.636V21.47H49.488V22.73H43.636ZM55.3662 24.592C55.3662 22.436 50.6902 22.996 50.6902 19.776C50.6902 18.026 52.0622 17.088 53.8542 17.088C55.9542 17.088 57.0462 18.362 57.0462 20.224H55.3242C55.3242 19.412 55.0722 18.726 53.8402 18.712C53.1262 18.698 52.4122 18.922 52.4122 19.706C52.4122 21.722 57.0462 21.47 57.0462 24.592C57.0462 26.16 55.8842 27.112 53.7842 27.112C51.2362 27.112 50.1302 25.628 50.1302 23.962H51.8522C51.8662 24.844 52.7202 25.6 53.8262 25.6C54.6802 25.6 55.3662 25.418 55.3662 24.592ZM62.9814 24.592C62.9814 22.436 58.3054 22.996 58.3054 19.776C58.3054 18.026 59.6774 17.088 61.4694 17.088C63.5694 17.088 64.6614 18.362 64.6614 20.224H62.9394C62.9394 19.412 62.6874 18.726 61.4554 18.712C60.7414 18.698 60.0274 18.922 60.0274 19.706C60.0274 21.722 64.6614 21.47 64.6614 24.592C64.6614 26.16 63.4994 27.112 61.3994 27.112C58.8514 27.112 57.7454 25.628 57.7454 23.962H59.4674C59.4814 24.844 60.3354 25.6 61.4414 25.6C62.2954 25.6 62.9814 25.418 62.9814 24.592ZM67.1106 22.73L67.0966 25.74H73.0046V27H65.3886V17.2H72.9626V18.46H67.1106V21.47H72.9626V22.73H67.1106ZM76.8668 17.2L80.6608 26.58V17.2H82.4668L82.3548 27H79.1348L75.4248 17.844L75.3268 27H73.6328V17.2H76.8668ZM84.4514 22.156C84.4514 24.228 85.7674 25.628 88.0494 25.628C88.9874 25.628 90.3174 25.39 90.4714 22.898V22.73H85.8514V21.47H91.9694V27H90.4714V24.97C90.1494 26.51 89.0294 27.112 87.5734 27.112C84.9134 27.112 83.0234 25.124 83.0234 22.156C83.0234 19.188 84.9134 17.2 87.7834 17.2H91.9274L91.9134 18.712L87.7834 18.684C85.7674 18.684 84.4514 20.084 84.4514 22.156ZM94.4134 22.73L94.3994 25.74H100.307V27H92.6914V17.2H100.265V18.46H94.4134V21.47H100.265V22.73H94.4134ZM102.747 22.394L102.733 27H101.025V17.2H103.853C105.589 17.2 107.185 17.732 107.185 19.706C107.185 21.176 106.289 22.044 104.875 22.31L107.171 27H105.421L103.167 22.394H102.747ZM102.747 21.064H103.853C104.791 21.064 105.463 20.854 105.463 19.79C105.463 18.74 104.791 18.516 103.853 18.53H102.747V21.064Z"
                fill="black"
              />
            </svg>
            <h4 className=" mt-10 mb-8 px-4">
              Welcome to <br /> BULK MESSENGER
            </h4>
            <form
              className="flex flex-col gap-[25px] p-4"
              onSubmit={handleLogin}
            >
              <div className="flex gap-[10px]  bg-[#E8E8E8] px-3 py-2 rounded-lg w-full">
                <svg
                  width="10%"
                  height="10%"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.56757 9.92065L16.2954 16.2838L29.0233 9.92065C28.9761 9.10965 28.6207 8.34736 28.0298 7.78989C27.4389 7.23242 26.6572 6.92197 25.8449 6.92212H6.74595C5.93358 6.92197 5.1519 7.23242 4.56099 7.78989C3.97009 8.34736 3.61468 9.10965 3.56757 9.92065Z"
                    fill="#404040"
                  />
                  <path
                    d="M29.028 13.4763L16.2954 19.8426L3.56281 13.4763V22.838C3.56281 23.6822 3.89817 24.4919 4.49513 25.0888C5.09209 25.6858 5.90174 26.0211 6.74596 26.0211H25.8449C26.6891 26.0211 27.4988 25.6858 28.0957 25.0888C28.6927 24.4919 29.028 23.6822 29.028 22.838V13.4763Z"
                    fill="#404040"
                  />
                </svg>

                <input
                  type="text"
                  name="username"
                  placeholder="E-MAIL"
                  className="bg-transparent "
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-[10px] bg-[#E8E8E8] px-3 py-2 rounded-lg w-full">
                <svg
                  width="10%"
                  height="10%"
                  viewBox="0 0 24 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.36067 0.672816C4.12957 0.449616 3.82005 0.326112 3.49878 0.328904C3.17751 0.331696 2.87019 0.46056 2.64301 0.687742C2.41582 0.914924 2.28696 1.22225 2.28417 1.54352C2.28138 1.86479 2.40488 2.17431 2.62808 2.4054L19.7824 19.5597C20.0135 19.7829 20.323 19.9064 20.6443 19.9036C20.9656 19.9008 21.2729 19.772 21.5001 19.5448C21.7272 19.3176 21.8561 19.0103 21.8589 18.689C21.8617 18.3677 21.7382 18.0582 21.515 17.8271L19.7101 16.0223C21.6186 14.5006 23.0298 12.4443 23.7634 10.1163C22.2024 5.14519 17.5585 1.53911 12.0715 1.53911C10.1508 1.5365 8.25654 1.98739 6.54294 2.85509L4.36067 0.672816ZM9.58171 5.89263L11.4368 7.74897C11.8523 7.63864 12.2895 7.63937 12.7046 7.75109C13.1197 7.86282 13.4982 8.08162 13.8022 8.3856C14.1062 8.68958 14.325 9.06807 14.4367 9.48319C14.5484 9.89831 14.5492 10.3355 14.4388 10.751L16.2939 12.6061C16.8465 11.67 17.0723 10.5767 16.9356 9.49832C16.7989 8.4199 16.3076 7.41752 15.5389 6.64887C14.7703 5.88021 13.7679 5.3889 12.6895 5.25222C11.6111 5.11555 10.5178 5.34003 9.58171 5.89263Z"
                    fill="#404040"
                  />
                  <path
                    d="M15.0784 18.3222L11.7652 15.0077C10.5738 14.9331 9.45063 14.4262 8.60643 13.5822C7.76223 12.7382 7.25506 11.6152 7.1801 10.4238L2.67954 5.92326C1.64442 7.15594 0.862838 8.58085 0.379639 10.1163C1.94068 15.0873 6.58583 18.6934 12.0715 18.6934C13.1094 18.6934 14.1166 18.5648 15.0784 18.3222Z"
                    fill="#404040"
                  />
                </svg>

                <input
                  type="password"
                  name="password"
                  placeholder="PASSWORD"
                  required
                  onChange={handleChange}
                  className="bg-transparent"
                  value={formData.password}
                />
              </div>
              <button className="bg-[#1877F2] px-3 py-2 rounded-lg font-semibold text-white">
                LOGIN
              </button>
            </form>
          </div>
        </div>
        <div className="w-[40%]">
          <Image
            className="rounded-[50px] h-auto w-[90%]"
            src={LoginImage}
            alt=""
          />
        </div>
        <div>{error}</div>
      </div>
    </>
  );
};

export default Page;

