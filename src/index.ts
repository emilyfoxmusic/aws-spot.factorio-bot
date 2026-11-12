import { config } from "./config";
import { Client, GatewayIntentBits, Events } from "discord.js";

import { createPanel } from "./ui/panelService";
import { registerInteractionEvents } from "./ui/events/interactionCreate";

export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);

  createPanel(client).catch((error: unknown) => {
    console.error("Failed to create panel:", error);
  });
});

registerInteractionEvents(client);

async function startBot(): Promise<void> {
  await client.login(config.discordToken);
}

startBot().catch((error: unknown) => {
  console.error("Failed to start bot:", error);
  process.exit(1);
});
