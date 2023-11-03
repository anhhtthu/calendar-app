import "./App.css";
import { getMonth } from "./utils/index";

function App() {
  console.table(getMonth());
  return <div className="App"></div>;
}

export default App;
