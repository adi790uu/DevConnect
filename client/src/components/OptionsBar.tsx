import Select from "react-select";
import { FaPlayCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const OptionsBar = ({
  lang,
  setLang,
  theme,
  setTheme,
  fontSize,
  setFontSize,
  setUserOutput,
  setUserInput,
}) => {
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
  return (
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
      <button className="flex flex-col justify-center items-center bg-transparent font-body tracking-widest">
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
  );
};

export default OptionsBar;
