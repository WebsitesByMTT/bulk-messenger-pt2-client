const NewMessage = () => {
  return (
    <div className="m-auto w-[35%]">
      <form className="flex flex-col gap-[5px]">
        <lable className="text-lg font-semibold mt-2" for="message">
          Message
        </lable>
        <textarea
          className="border-2 border-[#8C8C8C] rounded-md p-2 resize-none"
          name="message"
          rows="6"
          placeholder="Enter Text"
        ></textarea>
        <lable className="text-lg font-semibold mt-2" for="userId">
          User ID
        </lable>
        <textarea
          className="border-2 border-[#8C8C8C] rounded-md p-2 resize-none"
          name="userId"
          rows="10"
          placeholder="e.g, 123.1235842548"
        ></textarea>
        <lable className="text-lg font-semibold mt-2" for="facebookId">
          Facebook ID
        </lable>
        <input
          className="border-2 border-[#8C8C8C] rounded-md p-2"
          name="facebookId"
          placeholder="e.g, Gaurav Kumar"
          type="text"
        />
        <lable className="text-lg font-semibold mt-2" for="Password">
          Password
        </lable>
        <input
          className="border-2 border-[#8C8C8C] rounded-md p-2"
          name="Password"
          placeholder="e.g, Gaurav Kumar"
          type="password"
        />
        <button className="bg-[#252727] px-4 py-3 rounded-md font-semibold text-white w-fit mt-6">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default NewMessage;
