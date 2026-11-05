import {
    Client,
    Events,
    ButtonInteraction,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} from "discord.js";

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

    const button = new ButtonBuilder()
        .setCustomId("panel_toggle")
        .setLabel(isStarting ? "Stop" : "Start")
        .setStyle(
            isStarting
                ? ButtonStyle.Danger
                : ButtonStyle.Success
        );

    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(button);

    await interaction.update({
        components: [row]
    });
}