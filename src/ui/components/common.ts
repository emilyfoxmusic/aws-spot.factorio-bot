import { ButtonBuilder, ButtonStyle, ContainerBuilder } from "discord.js";

export const commonContainer = (name: string, isSpaceAge: boolean) =>
  new ContainerBuilder().addTextDisplayComponents((textDisplay) =>
    textDisplay.setContent(
      `# ${isSpaceAge ? ":rocket:" : ":construction_worker:"} ${name}`,
    ),
  );

export const commonButtons = [
  new ButtonBuilder()
    .setCustomId("panel_backup")
    .setLabel("Download Backup")
    .setStyle(ButtonStyle.Secondary),
  new ButtonBuilder()
    .setCustomId("panel_delete")
    .setLabel("Delete")
    .setStyle(ButtonStyle.Danger),
];
