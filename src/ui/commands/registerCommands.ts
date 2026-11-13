
import { REST, Routes } from "discord.js";

import { config } from "../../config";
import * as createGameCommand from "./createGame";

const commands = [
  createGameCommand.data.toJSON(),
];

const rest = new REST({ version: "10" })
  .setToken(config.discordToken);

async function registerCommands() {
  try {
    console.log("Registering application commands...");

    // Register commands to your development server
    await rest.put(
      Routes.applicationGuildCommands(
        config.clientId,
        config.guildId,
      ),
      { body: commands },
    );

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error("Failed to register commands:", error);
    process.exitCode = 1;
  }
}

registerCommands();
