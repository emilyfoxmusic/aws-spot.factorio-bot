
import {
  ModalSubmitInteraction,
  Message,
  MessageFlags,
} from "discord.js";

import { registerGame } from "../../metadata/gamesRepository";
import { config } from "../../config";
import { startedContainer } from "../components/started";

export async function handleGameCreateModal(
  interaction: ModalSubmitInteraction,
): Promise<void> {
  const name = interaction.fields
    .getTextInputValue("game-name")
    .trim();

  const isSpaceAge = interaction.fields
    .getCheckbox("game-space-age");

  if (!name) {
    await interaction.reply({
      content: "Please provide a game name.",
      ephemeral: true,
    });
    return;
  }

  await interaction.deferReply({
    flags: MessageFlags.Ephemeral,
  });

  let panelMessage: Message | undefined;

  try {
    // Fetch the configured panel channel
    const channel = await interaction.client.channels.fetch(
      config.channelId,
    );

    if (!channel || !channel.isTextBased() || !channel.isSendable()) {
      throw new Error("Configured panel channel is not sendable.");
    }

    // Create the panel message
    panelMessage = await channel.send({
      components: [startedContainer(name, isSpaceAge)],
      flags: MessageFlags.IsComponentsV2,
    });

    // Save the game to DynamoDB
    const game = await registerGame({
      name,
      isSpaceAge,
      messageId: panelMessage.id,
    });

    // Notify the event channel
    const eventChannel = await interaction.client.channels.fetch(
      config.eventChannelId,
    );

    if (!eventChannel || !eventChannel.isTextBased() || !eventChannel.isSendable()) {
      throw new Error("Configured event channel is not sendable.");
    }

    await eventChannel.send({
      content: [
        `🎮 **New Factorio game created!**`,
        ``,
        `**Name:** ${game.name}`,
        `**Space Age:** ${game.isSpaceAge ? "Yes" : "No"}`,
        `**Panel:** ${panelMessage.url}`,
      ].join("\n"),
    });

    // Send the user a confirmation
    await interaction.editReply({
      content: `Successfully created **${game.name}**!`,
    });

  } catch (error) {
    console.error("Failed to create game:", error);

    // Clean up the panel if persistence failed
    if (panelMessage) {
      try {
        await panelMessage.delete();
      } catch (cleanupError) {
        console.error(
          "Failed to delete orphaned panel:",
          cleanupError,
        );
      }
    }

    await interaction.editReply({
      content:
        "Something went wrong while creating the game. Please try again.",
    });
  }
}
