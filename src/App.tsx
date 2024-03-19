import { useState } from "react";
import "./App.css";
import Header from "./component/Header";
import MidPart from "./component/MidPart";

function App() {
  const [location, setlocation] = useState("delhi");
  console.log(location);
  return (
    <>
      <Header setlocation={setlocation} />
      <div className="pb-4">
        <MidPart location={location} />
      </div>
    </>
  );
}

export default App;
