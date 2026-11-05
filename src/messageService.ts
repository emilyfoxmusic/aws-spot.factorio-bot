import {
    Client,
    TextChannel
} from "discord.js";

export async function sendMessage(
    client: Client,
    channelId: string,
    message: string
): Promise<void> {
    const channel = await client.channels.fetch(channelId);

    if (!channel || !channel.isTextBased() || !("send" in channel)) {
        throw new Error(`Could not find a valid text channel: ${channelId}`);
    }

    await channel.send(message);

    console.log(`Message sent to channel ${channelId}`);
}