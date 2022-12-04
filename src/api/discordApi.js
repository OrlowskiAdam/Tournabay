import request from "./axiosConfig";
import { BASE_API_URL } from "../constants/constants";

class DiscordApi {
  discordVerification() {
    return request.get(`${BASE_API_URL}/discord-verification`);
  }
}

export const discordApi = new DiscordApi();
