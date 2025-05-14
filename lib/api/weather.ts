export interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  };
  daily: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
      day: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    humidity: number;
    wind_speed: number;
  }>;
  city: string;
}

// Mock function simulating API call
export async function getWeatherData(city: string = "New York"): Promise<WeatherData> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  
  // Mock response data
  return {
    current: {
      temp: 22,
      feels_like: 21,
      humidity: 65,
      wind_speed: 5.2,
      weather: [
        {
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      ],
    },
    daily: [
      {
        dt: Date.now() / 1000,
        temp: {
          min: 18,
          max: 24,
          day: 22,
        },
        weather: [
          {
            main: "Clear",
            description: "clear sky",
            icon: "01d",
          },
        ],
        humidity: 65,
        wind_speed: 5.2,
      },
      {
        dt: Date.now() / 1000 + 86400,
        temp: {
          min: 17,
          max: 23,
          day: 21,
        },
        weather: [
          {
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d",
          },
        ],
        humidity: 70,
        wind_speed: 4.8,
      },
      {
        dt: Date.now() / 1000 + 172800,
        temp: {
          min: 16,
          max: 22,
          day: 20,
        },
        weather: [
          {
            main: "Rain",
            description: "light rain",
            icon: "10d",
          },
        ],
        humidity: 75,
        wind_speed: 6.1,
      },
      {
        dt: Date.now() / 1000 + 259200,
        temp: {
          min: 15,
          max: 20,
          day: 18,
        },
        weather: [
          {
            main: "Rain",
            description: "moderate rain",
            icon: "10d",
          },
        ],
        humidity: 80,
        wind_speed: 7.2,
      },
      {
        dt: Date.now() / 1000 + 345600,
        temp: {
          min: 14,
          max: 19,
          day: 17,
        },
        weather: [
          {
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d",
          },
        ],
        humidity: 75,
        wind_speed: 6.5,
      },
      {
        dt: Date.now() / 1000 + 432000,
        temp: {
          min: 15,
          max: 21,
          day: 19,
        },
        weather: [
          {
            main: "Clear",
            description: "clear sky",
            icon: "01d",
          },
        ],
        humidity: 65,
        wind_speed: 5.0,
      },
      {
        dt: Date.now() / 1000 + 518400,
        temp: {
          min: 16,
          max: 22,
          day: 20,
        },
        weather: [
          {
            main: "Clear",
            description: "clear sky",
            icon: "01d",
          },
        ],
        humidity: 60,
        wind_speed: 4.5,
      },
    ],
    city: city,
  };
}