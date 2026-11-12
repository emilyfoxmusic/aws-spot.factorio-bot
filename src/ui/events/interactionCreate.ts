import { ButtonInteraction, Client, Events, MessageFlags } from "discord.js";
import { stoppedContainer } from "../components/stopped";
import { Game, games } from "../../data/games";
import { startedContainer } from "../components/started";

export function registerInteractionEvents(client: Client): void {
  client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isButton()) return;

    console.log(interaction.message.id);

    const game = games.find((game) => game.panelId === interaction.message.id);

    if (!game) {
      handleGameNotFound(interaction).catch((error: unknown) => {
        console.error("Error starting game:", error);
      });
      return;
    }

    switch (interaction.customId) {
      case "panel_start":
      case "panel_toggle":
      case "panel_backup":
        handleStart(interaction, game).catch((error: unknown) => {
          console.error("Error starting game:", error);
        });
        break;
      case "panel_stop":
        handleStop(interaction, game).catch((error: unknown) => {
          console.error("Error stopping game:", error);
        });
        break;
      default:
        throw new Error(`Action ${interaction.customId} is not known`);
    }
  });
}

async function handleGameNotFound(interaction: ButtonInteraction) {
  await interaction.reply({
    content: "Could not find the game associated with this panel.",
    ephemeral: true,
  });
}

async function handleStart(interaction: ButtonInteraction, game: Game) {
  await interaction.update({
    components: [startedContainer(game)],
    flags: MessageFlags.IsComponentsV2,
  });
}

async function handleStop(interaction: ButtonInteraction, game: Game) {
  await interaction.update({
    components: [stoppedContainer(game)],
    flags: MessageFlags.IsComponentsV2,
  });
}
