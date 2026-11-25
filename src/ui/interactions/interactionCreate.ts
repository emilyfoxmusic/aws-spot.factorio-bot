import {
  ButtonInteraction,
  Client,
  CommandInteraction,
  Events,
  MessageFlags,
  ModalSubmitInteraction,
} from "discord.js";
import { stoppedContainer } from "../components/stopped";
import { startedContainer } from "../components/started";
import { getGameByMessageId } from "../../metadata/gamesRepository";
import { handleGameCreateModal } from "./handleCreateGameModal";
import * as createGameCommand from "../../commands/createGame";

export function registerInteractionEvents(client: Client): void {
  client.on(Events.InteractionCreate, (interaction) => {
    if (interaction.isButton()) {
      handleButton(interaction).catch((error: unknown) => {
        console.error("Error handling button event:", error);
      });
    } else if (interaction.isChatInputCommand()) {
      handleChatInputCommand(interaction).catch((error: unknown) => {
        console.error("Error handling command:", error);
      });
    } else if (interaction.isModalSubmit()) {
      handleModalSubmit(interaction).catch((error: unknown) => {
        console.error("Error handling create game modal:", error);
      });
    }

    if (!interaction.isButton()) return;
  });
}

async function handleButton(interaction: ButtonInteraction) {
  const game = await getGameByMessageId(interaction.message.id);

  if (!game) {
    await interaction.reply({
      content: "Could not find the game associated with this panel.",
      ephemeral: true,
    });
    return;
  }

  switch (interaction.customId) {
    case "panel_start":
      await interaction.update({
        components: [startedContainer(game.name, game.isSpaceAge)],
        flags: MessageFlags.IsComponentsV2,
      });
      break;
    case "panel_stop":
      await interaction.update({
        components: [stoppedContainer(game.name, game.isSpaceAge)],
        flags: MessageFlags.IsComponentsV2,
      });
      break;
    default:
      throw new Error(`Action ${interaction.customId} is not known`);
  }
}

async function handleChatInputCommand(interaction: CommandInteraction) {
  switch (interaction.commandName) {
    case "create-game":
      await createGameCommand.execute(interaction);
      break;
    default:
      throw new Error(`Action ${interaction.commandName} is not known`);
  }
}

async function handleModalSubmit(interaction: ModalSubmitInteraction) {
  switch (interaction.customId) {
    case 'create-game-modal':
      await handleGameCreateModal(interaction);
      break;
    default:
      throw new Error(`Action ${interaction.customId} is not known`);
  }
}
