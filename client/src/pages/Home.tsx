import { useState } from "react";
import Homeimg from "../assets/pic1.jpg";
const Home = () => {
  const [activeTab, setActiveTab] = useState(1);
  console.log(activeTab);
  //@ts-ignore
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row  my-8 w-3/4 justify-center items-center m-auto bg-gray-300 rounded-lg border-2 border-slate-700">
        <img src={Homeimg} alt="" className="w-96 h-96 rounded-lg" />

        <p className="ml-6 prose text-justify tracking-wide text-lg p-4 rounded-lg">
          <span className="text-3xl font-bold text-slate-700 bg-clip-text">
            DevConnect
          </span>{" "}
          is an innovative live code collaboration website that brings
          developers together in a dynamic and interactive virtual environment.
          Offering a seamless platform for real-time coding collaboration,
          DevConnect enables programmers to collaborate on projects,
          troubleshoot code, and share insights effortlessly. With features like
          synchronized code editing, instant messaging, and collaborative
          debugging tools, DevConnect enhances productivity and fosters a sense
          of community among developers. Whether working on a team project or
          seeking assistance from the programming community, users can benefit
          from the platform's intuitive interface and robust functionality.
          DevConnect not only facilitates efficient code collaboration but also
          serves as a hub for knowledge exchange, making it a valuable resource
          for developers looking to enhance their skills and contribute to a
          vibrant coding ecosystem.
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-14">
        <div className="mt-5 w-full flex flex-col justify-center items-center">
          <div className="flex mb-5 w-3/4 justify-center">
            <button
              className={`glass text-xl tracking-wide w-1/4 mr-2 hover:bg-gray-300 rounded-sm font-extralight`}
              onClick={() => handleTabClick(1)}
            >
              Join Session
            </button>
            <button
              className={`glass text-lg p-2 tracking-wide w-1/4 rounded-sm font-extralight hover:bg-gray-300`}
              onClick={() => handleTabClick(2)}
            >
              Create Session
            </button>
          </div>
          <div className="w-1/4 font-body tracking-wide">
            {activeTab === 1 && (
              <div className="">
                <div className="label">
                  <span className="label-text text-lg">SessionId</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter sessionId"
                  className="p-4 rounded-lg border-2 border-slate-700 w-full outline-none text-black placeholder:text-slate-700"
                />
                <div className="w-full flex justify-center mt-4">
                  <button className="btn btn-wide glass bg-green-700 text-slate-100 text-lg">
                    Join!
                  </button>
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className="mb-4">
                <div className="label">
                  <span className="label-text text-lg">
                    Session Description
                  </span>
                </div>
                <textarea
                  rows={4}
                  cols={50}
                  placeholder="Enter Session Description"
                  className="p-4 rounded-lg border-2 border-slate-700 w-full outline-none text-black placeholder:text-slate-700"
                  style={{ resize: "none" }}
                />
                <div className="w-full flex justify-center mt-4">
                  <button className="btn btn-wide glass bg-green-700 text-slate-100 text-lg">
                    Generate SessionId
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
