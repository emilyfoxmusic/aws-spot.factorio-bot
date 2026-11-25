import { config } from "./config";
import {
  Client,
  GatewayIntentBits,
  Events,
  Collection,
  REST,
  Routes,
} from "discord.js";

import { registerInteractionEvents } from "./ui/interactions/interactionCreate";
import * as createGame from "./commands/createGame";

export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Configure commands

client.commands = new Collection();
client.commands.set(createGame.data.name, createGame);

export async function registerCommands(): Promise<void> {
  const rest = new REST({ version: "10" }).setToken(config.discordToken);

  try {
    console.log("Started refreshing application commands.");

    const commands = client.commands.map((command) => command.data.toJSON());

    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands },
    );

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error("Failed to register application commands:", error);
  }
}

// Uncomment this when you need to deploy command changes.
registerCommands().catch(() => (error: unknown) => {
  console.error("Error registering command:", error);
});

// Handle events

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);

  // TODO: initialise mapping
});

registerInteractionEvents(client);

// Start

async function startBot(): Promise<void> {
  await client.login(config.discordToken);
}

startBot().catch((error: unknown) => {
  console.error("Failed to start bot:", error);
  process.exit(1);
});
