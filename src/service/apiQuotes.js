import axios from "axios";

const baseUrl = "https://zenquotes.io/api";

export async function randomQuotes() {
  return await axios.get(`${baseUrl}/random`);
}
