import { ButtonInteraction, Client, Events, MessageFlags } from "discord.js";
import { stoppedContainer } from "../components/stopped";
import { games } from "../../data/games";
import { startedContainer } from "../components/started";

export function registerInteractionEvents(client: Client): void {
  client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isButton()) return;

    switch (interaction.customId) {
      case "panel_start":
      case "panel_toggle":
      case "panel_backup":
        handleStart(interaction).catch((error: unknown) => {
          console.error("Error starting game:", error);
        });
        break;
      case "panel_stop":
        handleStop(interaction).catch((error: unknown) => {
          console.error("Error stopping game:", error);
        });
        break;
      default:
        throw new Error(`Action ${interaction.customId} is not known`);
    }
  });
}

async function handleStart(interaction: ButtonInteraction) {
  await interaction.update({
    components: [startedContainer(games[0])],
    flags: MessageFlags.IsComponentsV2,
  });
}

async function handleStop(interaction: ButtonInteraction) {
  await interaction.update({
    components: [stoppedContainer(games[1])],
    flags: MessageFlags.IsComponentsV2,
  });
}
