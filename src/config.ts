import dotenv from "dotenv";

dotenv.config();

export const config = {
    discordToken: process.env.DISCORD_TOKEN,
    channelId: "793291321300484096"
};

if (!config.discordToken) {
    throw new Error("Missing DISCORD_TOKEN in .env file");
}