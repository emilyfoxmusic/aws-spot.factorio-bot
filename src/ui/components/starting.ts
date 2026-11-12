import { ButtonBuilder, ButtonStyle } from "discord.js";
import { commonButtons, commonContainer } from "./common";
import { Game } from "../../data/games";

export const startingContainer = (game: Game) =>
  commonContainer(game)
    .addTextDisplayComponents((textDisplay) =>
      textDisplay.setContent(":hourglass: **Status**: starting up..."),
    )
    .addActionRowComponents((row) =>
      row.addComponents(
        new ButtonBuilder()
          .setCustomId("panel_starting")
          .setLabel("Start")
          .setStyle(ButtonStyle.Success)
          .setDisabled(true),
        ...commonButtons,
      ),
    );
