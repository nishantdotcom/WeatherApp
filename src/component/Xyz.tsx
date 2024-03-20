import { useEffect } from "react";

function Xyz() {
  useEffect(() => {
    const APIkey: string = "356fe1f8b88eefabe468960fd92797c3";
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=Delhi,91&limit=5&appid=${APIkey}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem fetctching coordinates:", error);
        throw error;
      });
  });

  return <div>Xyz</div>;
}

export default Xyz;
