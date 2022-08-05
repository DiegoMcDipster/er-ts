const { GetCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { LookupEntity } = require("../models/lookupEntity");
const { dynamodbClient, setTableName } = require("./db");

const pkEntity = "WARDEN";
const skEntity = "ESCAPEROOM";

const dynamodb = dynamodbClient;

const getEntityType = (data) => {
  if (data.entityType.toLowerCase() === "group") return "GROUPS";

  if (data.entityType.toLowerCase() === "subject") return "SUBJECTS";
  return null;
};

const putItem = async (data) => {
  const lookupItem = new LookupEntity(getEntityType(data));

  lookupItem.mapToModelImport(data);

  const tableName = await setTableName();

  try {
    // The PUT is an update of an array.
    params = {
      TableName: tableName,
      Key: {
        pkid: lookupItem.importData.pkid,
        skid: lookupItem.importData.skid,
      },
      UpdateExpression: `set #e = list_append(if_not_exists(#e, :empty), :e)`,
      ExpressionAttributeNames: { "#e": lookupItem.entityType.toLowerCase() },
      ExpressionAttributeValues: {
        ":e": [lookupItem.importData.value],
        ":empty": [],
      },
      ReturnValues: "ALL_NEW",
    };

    console.log("lib/lookupEntity: putItem: the params are: ", params);

    const command = new UpdateCommand(params);

    const result = await dynamodb.send(command);

    return {
      updatedData: result.Attributes[`${lookupItem.entityType.toLowerCase()}`],
      message: `${lookupItem.entityType.toLowerCase()}: ${
        lookupItem.importData.value
      } was added!`,
    };
  } catch (error) {
    console.log("putItem: There was an error: ", error);
    throw error;
  }
};

const removeItem = async (data) => {
  const lookupItem = new LookupEntity(getEntityType(data));
  lookupItem.setPkid(pkEntity, data.uid);
  lookupItem.setSkid(skEntity, lookupItem.entityType);

  const tableName = await setTableName();

  params = {
    TableName: tableName,
    Key: {
      pkid: lookupItem.pkid,
      skid: lookupItem.skid,
    },
    UpdateExpression: `remove #e[${data.index}]`,
    ExpressionAttributeNames: { "#e": lookupItem.entityType.toLowerCase() },
    ReturnValues: "ALL_NEW",
  };

  console.log("lib/lookupEntity: removeItem: the params are: ", params);

  const command = new UpdateCommand(params);

  try {
    const result = await dynamodb.send(command);

    return {
      updatedData: result.Attributes[`${lookupItem.entityType.toLowerCase()}`],
      message: `${lookupItem.entityType}: ${data.value} was removed`,
    };
  } catch (error) {
    console.log("removeItem: There was an error: ", error);
    throw error;
  }
};

const getItem = async (data) => {
  const lookUpItem = new LookupEntity(getEntityType(data));
  lookUpItem.setPkid(pkEntity, data.uid);
  lookUpItem.setSkid(skEntity, lookUpItem.entityType);

  const tableName = await setTableName();

  const params = {
    TableName: tableName,
    Key: { pkid: lookUpItem.pkid, skid: lookUpItem.skid },
  };
  console.log("lib/lookupEntity: getItem: the params are: ", params);

  try {
    const fetchCommand = new GetCommand(params);

    const { Item } = await dynamodb.send(fetchCommand);

    if (Item) {
      lookUpItem.mapToModelExport(Item);

      return lookUpItem.exportData;
    }
    // if no data return an empty object
    return [];
  } catch (error) {
    console.log("getItem: There was an error: ", error);
    throw error;
  }
};

module.exports = {
  getItem,
  putItem,
  removeItem,
};
