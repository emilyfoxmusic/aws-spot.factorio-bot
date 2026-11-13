import { randomUUID } from "node:crypto";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

import type { Game } from "../models/game";
import { config } from "../config";

const client = new DynamoDBClient({
  region: config.awsRegion,
});

export const dynamo = DynamoDBDocumentClient.from(client);

export async function registerGame(game: Omit<Game, "gameId">): Promise<Game> {
  const newGame: Game = {
    ...game,
    gameId: randomUUID(),
  };

  await dynamo.send(
    new PutCommand({
      TableName: config.gamesTable,
      Item: newGame,

      // Prevent overwriting an existing Discord panel.
      ConditionExpression: "attribute_not_exists(panelId)",
    }),
  );

  return newGame;
}

export async function getGameByMessageId(
  messageId: string,
): Promise<Game | undefined> {
  const result = await dynamo.send(
    new GetCommand({
      TableName: config.gamesTable,
      Key: { panelId: messageId },
    }),
  );

  return result.Item as Game | undefined;
}
