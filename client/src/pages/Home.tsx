import { useState } from "react";
import Homeimg from "../assets/pic1.jpg";
const Home = () => {
  const [activeTab, setActiveTab] = useState(1);
  console.log(activeTab);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="min-h-screen">
      <div className="flex  my-8 w-3/4 justify-center items-center m-auto">
        <img src={Homeimg} alt="" className="w-96 h-96 rounded-lg" />

        <p className="ml-6 prose text-justify tracking-wide text-lg">
          <span className="text-3xl font-bold bg-gradient-to-r from-[#7F7FD5] via-[#86A8E7] to-[#91EAE4] text-transparent bg-clip-text">
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
      <div className="w-full flex flex-col items-center justify-center">
        <div className="mt-5 w-full flex flex-col justify-center items-center">
          <div className="flex mb-5 w-3/4 justify-center">
            <button
              className={`glass text-xl tracking-wide w-1/4 mr-1 hover:bg-gray-300 rounded-sm font-extralight`}
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
          <div className="">
            {activeTab === 1 && <div>Tab 1 content</div>}
            {activeTab === 2 && <div>Tab 2 content</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
