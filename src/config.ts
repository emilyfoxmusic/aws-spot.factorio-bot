import dotenv from "dotenv";

dotenv.config();

export const config = {
  discordToken: process.env.DISCORD_TOKEN,
  channelId: "1568013767789518938",
  eventChannelId: "1568621521184890950",
};

if (!config.discordToken) {
  throw new Error("Missing DISCORD_TOKEN in .env file");
}
