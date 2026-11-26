import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as iam from "aws-cdk-lib/aws-iam";

export class InfrastructureStack extends cdk.Stack {
  public readonly gamesTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* Table mapping for tracking games */

    this.gamesTable = new dynamodb.Table(this, "GamesTable", {
      tableName: "FactorioGames",
      partitionKey: {
        name: "gameId",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    this.gamesTable.addGlobalSecondaryIndex({
      indexName: "MessageIdIndex",
      partitionKey: {
        name: "messageId",
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    /* Bot user and permissions */

    const botUser = new iam.User(this, "BotUser", {
      userName: "factorio-bot-test",
    });

    botUser.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan",
        ],
        resources: [
          this.gamesTable.tableArn,
          `${this.gamesTable.tableArn}/index/*`,
        ],
      }),
    );
  }
}
