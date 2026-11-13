import { ButtonBuilder, ButtonStyle } from "discord.js";
import { commonButtons, commonContainer } from "./common";

export const stoppedContainer = (name: string, isSpaceAge: boolean) =>
  commonContainer(name, isSpaceAge)
    .setAccentColor(0xc41414)
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
