import { useState } from "react";

const Home = () => {
  const [activeTab, setActiveTab] = useState(1);
  console.log(activeTab);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
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
  );
};

export default Home;
