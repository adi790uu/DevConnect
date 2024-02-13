import { useState } from "react";
import Homeimg from "../assets/pic1.jpg";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import connector from "../connect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* when join is clicked then api call must be made and session id should be used from response and append it to the redirect url*/

const Home = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [pass, setPass] = useState("");
  const [desc, setDesc] = useState("");
  console.log(activeTab);
  //@ts-ignore
  const handleTabClick = (tabNumber) => {
    setPass("");
    setActiveTab(tabNumber);
  };

  const navigate = useNavigate();

  const handleCreate = async () => {
    const data = {
      sessionDesc: desc,
      sessionPassword: pass,
    };
    setDesc("");
    setPass("");
    const response = await connector.post("/session/create", data);
    console.log(response);

    const sessionId = response.data.session;
    navigate(`/session/${sessionId}`);
  };

  const handleJoin = async () => {
    const data = {
      sessionPassword: pass,
    };

    setPass("");
    const response = await connector.post("/session/join", data);
    console.log(response);

    const sessionId = response.data.session;
    navigate(`/session/${sessionId}`);
  };

  const generatePass = () => {
    const password = uuidv4();
    setPass(password.substring(0, 7).toString());
  };

  const handleGenerate = () => {
    generatePass();
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
                  <span className="label-text text-lg">Session Password</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter session Password"
                  className="p-4 rounded-lg border-2 border-slate-700 w-full outline-none text-black placeholder:text-slate-700"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
                <div className="w-full flex justify-center mt-4">
                  <button
                    className="btn btn-wide glass bg-green-700 text-slate-100 text-lg hover:bg-green-600"
                    onClick={handleJoin}
                  >
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
                  className="p-2 rounded-lg border-2 border-slate-700 w-full outline-none text-black placeholder:text-slate-700"
                  style={{ resize: "none" }}
                  value={desc}
                  onChange={(e: any) => setDesc(e.target.value)}
                />
                <div className="label">
                  <span className="label-text text-lg">Session Password</span>
                </div>
                <div className="w-full flex justify-between">
                  <input
                    className="p-2 rounded-md outline-none border-2 placeholder:text-slate-700 border-black text-black shadow-md w-full"
                    placeholder="Click on Generate"
                    readOnly
                    value={pass}
                  ></input>
                  <button
                    onClick={handleGenerate}
                    className="btn glass text-slate-100 ml-2 text-md flex flex-col bg-blue-900"
                  >
                    Generate
                  </button>
                </div>
                <div className="w-full flex justify-center mt-4">
                  <button
                    onClick={handleCreate}
                    className="btn btn-wide glass bg-green-700 text-slate-100 text-lg hover:bg-green-600 mt-8"
                  >
                    Join!
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
