import axios from "axios";
import { ENV_VARS } from "../constants/env-vars";

export const fetchQuote = async (): Promise<string> => {
  const url = "https://api.api-ninjas.com/v1/quotes?category=humor";
  const apiKey = ENV_VARS.NINJA_API_KEY;

  const response = await axios.get(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });

  return <string>response.data[0].quote;
};
