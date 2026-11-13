import { ButtonBuilder, ButtonStyle } from "discord.js";
import { commonButtons, commonContainer } from "./common";
import { Game } from "../../models/game";

export const startingContainer = (name: string, isSpaceAge: boolean) =>
  commonContainer(name, isSpaceAge)
    .setAccentColor(0xffdc42)
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
