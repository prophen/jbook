import CodeCell from "./components/code-cell";
import ReactDOM from "react-dom/client";
import "bulmaswatch/superhero/bulmaswatch.min.css";

// 2) Get a reference to the div with ID root
const el = document.getElementById("root");

// 3) Tell React to take control of that element
const root = ReactDOM.createRoot(el!);

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

root.render(<App />);
