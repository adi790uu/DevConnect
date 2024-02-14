const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

//@ts-ignore
export const compileCpp = (code, input) => {
  try {
    // Compile the C++ code
    const compileResult = spawnSync(
      "g++",
      ["-x", "c++", "-o", "myprogram", "-"],
      {
        input: code,
        encoding: "utf-8",
      }
    );

    if (compileResult.status !== 0) {
      throw new Error("Compilation error");
    }

    const filePath = "./myprogram";
    const executionResult = spawnSync(filePath, {
      input: input,
      encoding: "utf-8",
    });

    if (executionResult.error) {
      throw new Error("Execution error");
    }
    //@ts-ignore
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("error deleting file ", err);
      } else {
        console.log("file deleted!");
      }
    });

    return { programOutput: executionResult.stdout };
  } catch (error) {
    console.error("Error:", error);
  }
};
//@ts-ignore
export const compileJava = (code, input) => {
  try {
    fs.writeFileSync("Main.java", code);
    const compileResult = spawnSync("javac", ["Main.java"], {
      encoding: "utf-8",
    });

    if (compileResult.status !== 0) {
      throw new Error("Compilation error!");
    }

    const executionResult = spawnSync("java", ["Main"], {
      input: input,
      encoding: "utf-8",
    });

    if (executionResult.error) {
      throw new Error("execution error");
    }
    const directory = "./";

    const files = fs.readdirSync(directory);
    //@ts-ignore
    files.forEach((file) => {
      const filePath = path.join(directory, file);

      if (file.endsWith(".java") || file.endsWith(".class")) {
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${filePath}`);
      }
    });

    return { programOutput: executionResult.stdout };
  } catch (error) {
    console.error("Error:", error);
  }
};
//@ts-ignore
export const compilePy = (code, input) => {
  let command, args;
  command = "python3";
  args = ["-c", [code]];
  const pyResult = spawnSync(command, args, {
    input: input,
    encoding: "utf-8",
  });

  return { programOutput: pyResult.stdout };
};
//@ts-ignore
export const compileC = (code, input) => {
  try {
    const compileResult = spawnSync(
      "gcc",
      ["-x", "c", "-o", "myprogram", "-"],
      {
        input: code,
        encoding: "utf-8",
      }
    );

    if (compileResult.status !== 0) {
      throw new Error("Compilation error");
    }

    const filePath = "./myprogram";
    const executionResult = spawnSync(filePath, {
      input: input,
      encoding: "utf-8",
    });

    if (executionResult.error) {
      throw new Error("Execution error");
    }
    //@ts-ignore
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("error deleting file ", err);
      } else {
        console.log("file deleted!");
      }
    });

    return { programOutput: executionResult.stdout };
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = { compileCpp, compileJava, compileC, compilePy };
