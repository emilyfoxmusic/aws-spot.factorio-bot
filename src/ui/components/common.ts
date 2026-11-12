import { ButtonBuilder, ButtonStyle, ContainerBuilder } from "discord.js";
import { Game } from "../../data/games";

export const commonContainer = (game: Game) =>
  new ContainerBuilder()
    .setAccentColor(0x0099ff)
    .addTextDisplayComponents((textDisplay) =>
      textDisplay.setContent(
        `# ${game.isSpaceAge ? ":rocket:" : ":construction_worker:"} ${game.name}`,
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
