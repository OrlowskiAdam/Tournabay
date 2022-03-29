const isDevelopment = process.env.NODE_ENV === 'development';

export const BASE_API_URL = isDevelopment ? "http://localhost:8080" : "https://tournabay.com"
export const API_URL = isDevelopment ? "http://localhost:8080/api" : "https://tournabay.com/api"
export const ACCESS_TOKEN = 'accessToken';
export const DISCORD_ACCESS_TOKEN = 'discordAccessToken';
export const OSU_OAUTH2_REDIRECT_URI = isDevelopment ? 'http://localhost:3000/osu-oauth2-redirect' : 'https://tournabay.com/osu-oauth2-redirect';
export const DISCORD_OAUTH2_REDIRECT_URI = 'http://localhost:8080/discord-oauth2-redirect';
export const OSU_AUTH_URL = BASE_API_URL + '/oauth2/authorize/osu?redirect_uri=' + OSU_OAUTH2_REDIRECT_URI;
export const DISCORD_AUTH_URL = BASE_API_URL + '/oauth2/authorize/discord?redirect_uri=' + DISCORD_OAUTH2_REDIRECT_URI;
export const DISCORD_OAUTH =
  'https://discord.com/api/oauth2/authorize?client_id=871122673407770676&redirect_uri=' +
  API_URL +
  '/o/callback/discord&response_type=code&scope=identify';

export const GRAPHQL_URL = 'http://localhost:8080/graphql'
