import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Client,
    TextChannel
} from "discord.js";

import { config } from "../config";

export async function createPanel(client: Client): Promise<void> {
    const channel = await client.channels.fetch(config.channelId);

    if (!channel || !channel.isTextBased() || !("send" in channel)) {
        throw new Error("Invalid panel channel");
    }

    const button = new ButtonBuilder()
        .setCustomId("panel_toggle")
        .setLabel("Start")
        .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(button);

    await channel.send({
        content: "**Bot Control Panel**",
        components: [row]
    });

    console.log("Control panel created");
}