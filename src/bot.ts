import {
    Client,
    GatewayIntentBits,
    Events
} from "discord.js";

import { config } from "./config";
import { sendMessage } from "./messageService";

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.once(Events.ClientReady, async (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}`);

    try {
        await sendMessage(
            client,
            config.channelId,
            "Hello! The bot is now online."
        );
    } catch (error) {
        console.error("Failed to send message:", error);
    }
});

export async function startBot(): Promise<void> {
    await client.login(config.discordToken);
}