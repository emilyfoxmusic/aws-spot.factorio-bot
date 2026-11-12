import { ButtonBuilder, ButtonStyle } from "discord.js";
import { commonButtons, commonContainer } from "./common";
import { Game } from "../../data/games";

export const stoppedContainer = (game: Game) =>
  commonContainer(game)
    .addTextDisplayComponents((textDisplay) =>
      textDisplay.setContent(":no_entry: **Status**: stopped"),
    )
    .addActionRowComponents((row) =>
      row.addComponents(
        new ButtonBuilder()
          .setCustomId("panel_start")
          .setLabel("Start")
          .setStyle(ButtonStyle.Success),
        ...commonButtons,
      ),
    );
