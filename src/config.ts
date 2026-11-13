import dotenv from "dotenv";

dotenv.config();

export const config = {
  // infra
  awsRegion: process.env.AWS_REGION ?? "eu-west-2",
  gamesTable: process.env.GAMES_TABLE ?? "factorio-games",

  // discord
  discordToken: process.env.DISCORD_TOKEN,
  channelId: "1568013767789518938",
  eventChannelId: "1568621521184890950",
};

if (!config.discordToken) {
  throw new Error("Missing DISCORD_TOKEN in .env file");
}
