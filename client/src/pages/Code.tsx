import { useState } from "react";
import Editor from "@monaco-editor/react";
import ChatArea from "../components/Chatarea";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import connector from "../connect";
import Select from "react-select";
import { FaPlayCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Code = () => {
  const [userCode, setUserCode] = useState("");
  const [lang, setLang] = useState("c");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];

  const clearOutput = () => {
    setUserOutput("");
    setUserInput("");
  };

  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];

  const compile = async () => {
    setLoading(true);
    const data = {
      userCode: userCode,
      lang: lang,
      userInput: userInput,
    };
    const response = await connector.post("/compile", data);
    setUserOutput(response.data.output.programOutput);
    setLoading(false);
    // console.log(response);
  };

  const socket = io("http://localhost:8000");

  const { sessionId } = useParams();

  const options = {
    fontSize: fontSize,
  };

  socket.on("changedCode", (data) => {
    console.log(data);
    setUserCode(data);
  });

  const handleCodeChange = (newValue) => {
    console.log(newValue);
    socket.emit("changeCode", newValue);
    setUserCode(newValue);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row min-w-full pt-2 bg-[#1E1E1E] pb-2">
      <div className="min-h-screen w-3/4">
        <Editor
          className="editor"
          options={options}
          width="100%"
          theme={theme}
          language={lang}
          defaultLanguage="c"
          value={userCode}
          onChange={handleCodeChange}
        />
      </div>
      <div className="flex flex-col w-full ml-2 ">
        <div className="flex justify-around font-body w-full p-4 bg-yellow-50 rounded-md pr-2">
          <Select
            id="select1"
            options={languages}
            value={lang}
            onChange={(e) => setLang(e.value)}
            placeholder={lang}
          />
          <Select
            id="select2"
            options={themes}
            value={theme}
            onChange={(e) => setTheme(e.value)}
            placeholder={theme}
          />
          <button
            onClick={compile}
            className="flex flex-col justify-center items-center bg-transparent font-body tracking-widest"
          >
            <FaPlayCircle color="dark-green" size={32} />
            RUN
          </button>
          <button
            onClick={() => {
              clearOutput();
            }}
            className="flex flex-col justify-center items-center font-body tracking-widest"
          >
            <MdDeleteOutline color="red" size={32} />
            CLEAR
          </button>
          <div className="flex flex-col justify-center items-center">
            <label className="mr-2 font-body tracking-widest">Font Size</label>
            <div className="flex">
              <input
                className=""
                type="range"
                min="18"
                max="30"
                value={fontSize}
                step="2"
                onChange={(e) => {
                  setFontSize(e.target.value);
                }}
              />
              <p className="p-2 text-body text-sm bg-white ml-1 rounded-md">
                {fontSize}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row mt-5 min-h-screen">
          <div className="flex flex-col w-1/2">
            <h4 className="pl-1 font-body tracking-widest mb-1 text-white">
              Input:
            </h4>
            <div className="w-full h-1/2">
              <textarea
                className="w-full h-full rounded-md bg-yellow-50 p-2 outline-none border-none font-body text-gray-800"
                onChange={(e) => setUserInput(e.target.value)}
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <h4 className="pl-1 font-body tracking-widest mt-2 mb-1 text-white">
              Output:
            </h4>
            <div className=" w-full h-[30rem] rounded-md bg-yellow-50 font-body text-gray-800 p-2">
              {loading ? (
                <div className="boxinbox">
                  <div className="spinner2"></div>
                </div>
              ) : (
                userOutput
              )}
            </div>
          </div>
          <div className="flex flex-col w-1/2 ml-2">
            <p className="mb-1 text-transparent font-extralight h-6"></p>
            {/* @ts-ignore */}
            <ChatArea sessionId={sessionId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Code;
