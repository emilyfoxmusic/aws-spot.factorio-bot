import { Client, GatewayIntentBits, Events } from "discord.js";

import { config } from "./config";
import { createPanel } from "./ui/panelService";
import { registerInteractionEvents } from "./ui/events/interactionCreate";

export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

registerInteractionEvents(client);

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);

  createPanel(client).catch((error: unknown) => {
    console.error("Failed to create panel:", error);
  });
});

export async function startBot(): Promise<void> {
  await client.login(config.discordToken);
}
