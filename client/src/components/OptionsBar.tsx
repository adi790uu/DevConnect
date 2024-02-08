import Select from "react-select";

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
      <button className="run-btn">
        {/* <img src={playButton} className="image"></img> */}RUN
      </button>
      <button
        onClick={() => {
          clearOutput();
        }}
        className="clear-btn"
      >
        {/* <img src={clearButton} className="image"></img> */}CLEAR
      </button>
      <div className="flex justify-center items-center">
        <label className="mr-2 text-white">Font Size</label>
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
      </div>
    </div>
  );
};

export default OptionsBar;
