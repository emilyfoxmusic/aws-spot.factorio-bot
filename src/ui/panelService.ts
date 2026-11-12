import {
  ButtonBuilder,
  ButtonStyle,
  Client,
  ContainerBuilder,
  MessageFlags,
} from "discord.js";

import { config } from "../config";

export const stoppedContainer = new ContainerBuilder()
  .setAccentColor(0x0099ff)
  .addTextDisplayComponents((textDisplay) =>
    textDisplay.setContent(
      "# My Game 123\n" + "🚀 Space Age \n" + ":no_entry: **Status**: stopped",
    ),
  )
  .addActionRowComponents((row) =>
    row.addComponents(
      new ButtonBuilder()
        .setCustomId("panel_toggle")
        .setLabel("Start")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("panel_backup")
        .setLabel("Download Backup")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("panel_delete")
        .setLabel("Delete")
        .setStyle(ButtonStyle.Danger),
    ),
  );

export const startedContainer = new ContainerBuilder()
  .setAccentColor(0x0099ff)
  .addTextDisplayComponents((textDisplay) =>
    textDisplay.setContent(
      "# My Game 123\n" +
        "🚀 Space Age\n" +
        "🔄 **Status**: running\n" +
        ":tada: **Join at**: 127.0.0.1\n",
    ),
  )
  .addActionRowComponents((row) =>
    row.addComponents(
      new ButtonBuilder()
        .setCustomId("panel_toggle")
        .setLabel("Stop")
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId("panel_backup")
        .setLabel("Download Backup")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("panel_delete")
        .setLabel("Delete")
        .setStyle(ButtonStyle.Danger),
    ),
  );

export async function createPanel(client: Client): Promise<void> {
  const channel = await client.channels.fetch(config.channelId);

  if (!channel || !channel.isTextBased() || !("send" in channel)) {
    throw new Error("Invalid panel channel");
  }

  await channel.send({
    components: [stoppedContainer],
    flags: MessageFlags.IsComponentsV2,
  });

  console.log("Control panel created");
}
