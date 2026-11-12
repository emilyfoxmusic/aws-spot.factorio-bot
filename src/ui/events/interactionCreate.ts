import {
  Client,
  Events,
  ButtonInteraction,
  MessageFlags,
  ButtonStyle,
} from "discord.js";

import { startedContainer, stoppedContainer } from "../panelService";

export function registerInteractionEvents(client: Client): void {
  client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId !== "panel_toggle") return;

    handlePanelButton(interaction).catch((error: unknown) => {
      console.error("Error handling panel button:", error);
    });
  });
}

async function handlePanelButton(
  interaction: ButtonInteraction,
): Promise<void> {
  const component = interaction.component;

  if (component.style === ButtonStyle.Premium) return;

  const isStarting = component.label === "Start";

  console.log(component.label);

  await interaction.update({
    components: [isStarting ? startedContainer : stoppedContainer],
    flags: MessageFlags.IsComponentsV2,
  });
}
