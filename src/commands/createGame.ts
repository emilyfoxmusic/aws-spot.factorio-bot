
import {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  LabelBuilder,
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('create-game')
  .setDescription('Create a new Factorio game in AWS');

export async function execute(interaction: unknown) {
  const nameInput = new TextInputBuilder()
    .setCustomId('game-name')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('Enter a name for your game')
    .setMaxLength(50)
    .setRequired(true);

  const nameLabel = new LabelBuilder()
    .setLabel('Game name')
    .setTextInputComponent(nameInput);

  const spaceAgeLabel = new LabelBuilder()
    .setLabel('Uses Space Age')
    .setDescription('Enable this if the game uses the Space Age expansion.')
    .setCheckboxComponent(checkbox =>
      checkbox
        .setCustomId('game-space-age')
        .setDefault(false)
    );

  const modal = new ModalBuilder()
    .setCustomId('game-create-modal')
    .setTitle('Create Factorio Game')
    .addLabelComponents(nameLabel, spaceAgeLabel);

  await interaction.showModal(modal);
}
