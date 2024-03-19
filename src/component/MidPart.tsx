import { useEffect, useState } from "react";
type LocationType = {
  location: string;
};
type CoOrdianteType = {
  latitude: string;
  longitude: string;
};
type WeatherReportType = {
  temp: number;
  humidity: number;
  temp_max: number;
  temp_min: number;
  visibility: number;
  pressure: number;
  wind: {
    speed: number;
    deg: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: String;
  };
  feels_like: number;
};

function MidPart({ location }: LocationType) {
  const [coordinate, setcoordinate] = useState<CoOrdianteType>(null!);
  const [weatherReport, setweatherReport] = useState<WeatherReportType>(null!);

  function kelvinToCelsius(kelvin: number): number {
    return Math.round((kelvin - 273.15) * 100) / 100;
  }

  useEffect(() => {
    const APIkey: string = "356fe1f8b88eefabe468960fd92797c3";

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location},91&limit=5&appid=${APIkey}`;

    async function FetchCoordinate(): Promise<any> {
      return fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .catch((error) => {
          console.error("There was a problem fetctching coordinates:", error);
          throw error;
        });
    }
    async function FetchWeatherDetail({
      latitude,
      longitude,
    }: CoOrdianteType): Promise<any> {
      const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`;
      fetch(weatherAPI)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          setweatherReport({
            temp: kelvinToCelsius(data.main.temp),
            humidity: data.main.humidity,
            temp_max: kelvinToCelsius(data.main.temp_max),
            temp_min: kelvinToCelsius(data.main.temp_min),
            visibility: data.visibility,
            pressure: data.main.pressure,
            wind: {
              speed: data.wind.speed,
              deg: data.wind.deg,
            },
            weather: {
              id: data.weather[0].id,
              main: data.weather[0].main,
              description: data.weather[0].description,
              icon: data.weather[0].icon,
            },
            feels_like: kelvinToCelsius(data.main.feels_like),
          });
          return data;
        })

        .catch((err) => {
          console.log(err);
          throw err;
        });
    }
    FetchCoordinate()
      .then((data) => {
        console.log(data);
        const finalLoc: CoOrdianteType = {
          latitude: data[0].lat.toString(),
          longitude: data[0].lon.toString(),
        };
        setcoordinate({
          latitude: data[0].lat.toString(),
          longitude: data[0].lon.toString(),
        });
        return FetchWeatherDetail(finalLoc);
      })
      .then((data) => {
        // console.log(data);
        return data;
      });
  }, [location]);

  return (
    <div className="pt-4  md:flex md:justify-around">
      <div className="border m-2 rounded-2xl p-4 bg-slate-100">
        <h1 className="capitalize  font-bold text-3xl">{location},IN</h1>
        <div className="pt-1">
          {coordinate && (
            <div>
              {coordinate.latitude} , {coordinate.longitude}
            </div>
          )}
        </div>
        <div className="flex p-2 gap-x-2 ">
          <div className="font-bold">
            Feels like {weatherReport.feels_like}&#176;C.
          </div>
          <div className="capitalize font-bold">
            {weatherReport.weather.description}.
          </div>
        </div>
        <div className="pt-2">
          {weatherReport && (
            <>
              {
                <div>
                  <div className="flex justify-start">
                    <div className="">
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherReport.weather.icon}@2x.png`}
                        className="h-[50px] w-[50px]"
                      />
                    </div>
                    <div className=" pt-1.5 text-3xl ">
                      {" "}
                      {weatherReport.temp} &#176;C
                    </div>
                  </div>
                </div>
              }
            </>
          )}
        </div>
      </div>
      <div className="border m-2 rounded-2xl p-4 bg-slate-100">hii</div>
    </div>
  );
}

export default MidPart;
