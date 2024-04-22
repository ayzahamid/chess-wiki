import axios, { AxiosResponse } from "axios";
import PlayersType from "../interfaces/players";

const instance = axios.create({
  baseURL: "https://api.chess.com/pub",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
};

export const Players = {
  getPlayers: (): Promise<PlayersType[]> => requests.get("/titled/GM"),
};
