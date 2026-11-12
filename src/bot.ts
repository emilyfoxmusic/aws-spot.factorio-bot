import { Client, GatewayIntentBits, Events } from "discord.js";

import { config } from "./config";
import { createPanel } from "./ui/panelService";
import { registerInteractionEvents } from "./ui/events/interactionCreate";

export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

registerInteractionEvents(client);

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);

  try {
    await createPanel(client);
  } catch (error) {
    console.error("Failed to create panel:", error);
  }
});

export async function startBot(): Promise<void> {
  await client.login(config.discordToken);
}
