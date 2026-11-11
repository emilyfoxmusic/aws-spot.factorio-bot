import {
    Client,
    Events,
    ButtonInteraction,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    MessageFlags
} from "discord.js";

import { startedContainer, stoppedContainer } from '../panelService';

export function registerInteractionEvents(client: Client): void {
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isButton()) return;

        if (interaction.customId !== "panel_toggle") return;

        await handlePanelButton(interaction);
    });
}

async function handlePanelButton(
    interaction: ButtonInteraction
): Promise<void> {
    const isStarting = interaction.component.label === "Start";

    console.log(interaction.component.label);


    await interaction.update({
        components: [isStarting ? startedContainer : stoppedContainer],
        flags: MessageFlags.IsComponentsV2,
    });
}