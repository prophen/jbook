import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

// 2) Get a reference to the div with ID root
const el = document.getElementById("root");

// 3) Tell React to take control of that element
const root = ReactDOM.createRoot(el!);

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const ref = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
        global: "window",
      },
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
    });

    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <textarea
        cols={80}
        rows={30}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>

      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

root.render(<App />);
