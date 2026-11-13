import { ButtonBuilder, ButtonStyle } from "discord.js";
import { commonButtons, commonContainer } from "./common";
import { Game } from "../../models/game";

export const startedContainer = (name: string, isSpaceAge: boolean) =>
  commonContainer(name, isSpaceAge)
    .setAccentColor(0x0099ff)
    .addTextDisplayComponents((textDisplay) =>
      textDisplay.setContent(
        ":arrows_counterclockwise: **Status**: running\n" +
          ":tada: **Join at**: 127.0.0.1",
      ),
    )
    .addActionRowComponents((row) =>
      row.addComponents(
        new ButtonBuilder()
          .setCustomId("panel_stop")
          .setLabel("Stop")
          .setStyle(ButtonStyle.Danger),
        ...commonButtons,
      ),
    );
