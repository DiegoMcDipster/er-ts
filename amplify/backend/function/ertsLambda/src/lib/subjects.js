const { UpdateCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { Subject } = require("../models/subject");
const { dynamodbClient, setTableName } = require("./db");

const dynamodb = dynamodbClient;

const putSubject = async (data) => {
  const newSubject = new Subject(data.uid);

  newSubject.mapToModelImport(data);

  const tableName = await setTableName();

  try {
    // The PUT is an update of an array.
    params = {
      TableName: tableName,
      Key: {
        pkid: newSubject.importData.pkid,
        skid: newSubject.importData.skid,
      },
      UpdateExpression: `set #e = list_append(if_not_exists(#e, :empty), :e)`,
      ExpressionAttributeNames: { "#e": "subjects" },
      ExpressionAttributeValues: {
        ":e": [newSubject.importData.subject],
        ":empty": [],
      },
    };

    console.log("lib/subjects: putSubject: the params are: ", params);

    const command = new UpdateCommand(params);

    await dynamodb.send(command);

    return `SUBJECTS: ${newSubject.importData.subject.name} was added!`;
  } catch (error) {
    console.log("putSubject: There was an error: ", error);
    throw error;
  }
};

const putModule = async (data) => {
  const subject = new Subject(data.uid);

  subject.mapToModelImportModule(data);

  const tableName = await setTableName();

  try {
    // The PUT is an update of an array.
    params = {
      TableName: tableName,
      Key: {
        pkid: subject.importData.pkid,
        skid: subject.importData.skid,
      },
      UpdateExpression: `set subjects[${data.subjectIndex}].#e = list_append(subjects[${data.subjectIndex}].#e, :e)`,
      ExpressionAttributeNames: {
        "#e": "modules",
      },
      ExpressionAttributeValues: {
        ":e": [subject.importData.module],
      },
    };

    console.log("lib/subjects: putModule: the params are: ", params);

    const command = new UpdateCommand(params);

    await dynamodb.send(command);

    return `MODULES: ${subject.importData.module} was added!`;
  } catch (error) {
    console.log("putModule: There was an error: ", error);
    throw error;
  }
};

const getSubjects = async (data) => {
  const subjObj = new Subject(data.uid);

  const tableName = await setTableName();

  const params = {
    TableName: tableName,
    Key: { pkid: subjObj.pkid, skid: subjObj.skid },
  };
  console.log("lib/Subject: getSubjects: the params are: ", params);

  try {
    const fetchCommand = new GetCommand(params);

    const { Item } = await dynamodb.send(fetchCommand);

    if (Item) {
      subjObj.mapToModelExport(Item);
    }
    return subjObj.exportData;
  } catch (error) {
    console.log("getSubjects: There was an error: ", error);
    throw error;
  }
};

const removeSubject = async (data) => {
  const subjObj = new Subject(data.uid);

  const tableName = await setTableName();

  params = {
    TableName: tableName,
    Key: {
      pkid: subjObj.pkid,
      skid: subjObj.skid,
    },
    UpdateExpression: `remove #e[${data.index}]`,
    ExpressionAttributeNames: { "#e": "subjects" },
    ReturnValues: "ALL_NEW",
  };

  console.log("lib/Subject: removeSubject: the params are: ", params);

  const command = new UpdateCommand(params);

  try {
    const result = await dynamodb.send(command);

    return {
      udpatedData: result.Attributes["subjects"],
      message: `SUBJECTS: ${data.subject} was removed`,
    };
  } catch (error) {
    console.log("removeSubject: There was an error: ", error);
    throw error;
  }
};

const removeModule = async (data) => {
  const subjObj = new Subject(data.uid);

  const tableName = await setTableName();

  params = {
    TableName: tableName,
    Key: {
      pkid: subjObj.pkid,
      skid: subjObj.skid,
    },
    UpdateExpression: `remove subjects[${data.subjectIndex}].#e[${data.index}]`,
    ExpressionAttributeNames: {
      "#e": "modules",
    },
    ReturnValues: "ALL_NEW",
  };

  console.log("lib/Subject: removeSubject: the params are: ", params);

  const command = new UpdateCommand(params);

  try {
    const result = await dynamodb.send(command);

    return {
      udpatedData: result.Attributes["subjects"],
      message: `MODULES: ${data.value} was removed`,
    };
  } catch (error) {
    console.log("removeModule: There was an error: ", error);
    throw error;
  }
};

module.exports = {
  getSubjects,
  putModule,
  putSubject,
  removeModule,
  removeSubject,
};
