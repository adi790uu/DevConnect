import { useEffect, useState } from "react";
import OptionsBar from "../components/OptionsBar";
import Editor from "@monaco-editor/react";
import ChatArea from "../components/Chatarea";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import connector from "../connect";

const Code = () => {
  const [userCode, setUserCode] = useState("");
  const [lang, setLang] = useState("c");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const socket = io("http://localhost:8000");

  const { sessionId } = useParams();

  const options = {
    fontSize: fontSize,
  };

  useEffect(() => {
    socket.emit("joinRoom", sessionId);
    connector
      .get("/getmessages")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);

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
          onChange={(value) => {
            setUserCode(value);
          }}
        />
      </div>
      <div className="flex flex-col w-full ml-2 ">
        <OptionsBar
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
          setUserInput={setUserInput}
          setUserOutput={setUserOutput}
        />
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
