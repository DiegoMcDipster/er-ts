const {
  DynamoDBClient,
  ListTablesCommand,
} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({
  region: process.env.TABLE_REGION,
});

const dynamodbClient = DynamoDBDocumentClient.from(client);

const setTableName = async () => {
  return "entities-dev";
};

module.exports = { client, dynamodbClient, setTableName };
