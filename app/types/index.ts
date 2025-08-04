export interface City {
  city: string;
  country: string;
}

export interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description:string;
    icon: string;
  }[];
}