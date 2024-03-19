import { useState } from "react";

import { TiWeatherPartlySunny } from "react-icons/ti";
type LoactionType = {
  setlocation: React.Dispatch<React.SetStateAction<string>>;
};
function Header({ setlocation }: LoactionType) {
  const [locationdata, setlocationData] = useState("");

  function handleSubmitdata() {
    setlocation(locationdata);
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setlocationData(event.target.value);
  }

  return (
    <>
      <div className=" p-4     ">
        <div className="pt-2 font-semibold  text-yellow-300 flex justify-center underline  gap-x-4 ">
          <div>Weather App</div>
          <div>
            <div>
              <TiWeatherPartlySunny size={24} />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-x-4">
          <div></div>
        </div>
      </div>
      <div className="pt-4  border border-yellow-300 rounded-2xl m-2 bg-yellow-100 shadow-2xl ">
        <div className="flex justify-center text-lg text-slate-300 font-extrabold">
          Enter Location
        </div>
        <div className=" flex justify-center pt-2 ">
          <input
            className="bg-white border-yellow-300 border-2 rounded-lg  p-3 text-slate-400 font-light"
            placeholder="Enter Location"
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </div>
        <div className=" flex justify-center pt-4 pb-4">
          <button
            onClick={handleSubmitdata}
            className="  text-lg p-2 rounded-lg bg-yellow-400 text-white font-extrabold  hover:opacity-80"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
