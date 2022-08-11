const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");
const { putItem, getItem, removeItem } = require("./lib/lookupEntity");
const {
  putSubject,
  getSubjects,
  removeSubject,
  putModule,
  removeModule,
} = require("./lib/subjects");
const UID = "DEMO-APP-RANDOM-UID"; // for testing purposes only

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/*****************************************************************
 * GET /entities/:entitytype
 * To get the list of entities for an entitytype
 ****************************************************************/
app.get("/entities/:entitytype", async (req, res) => {
  const primaryKey = {
    uid: UID,
    entityType: req.params["entitytype"],
  };

  try {
    const result = await getItem(primaryKey);

    res.json(result);
  } catch (error) {
    res.statusCode = 400;
    res.json({ error: "Could not get the Escape Room: " + error });
  }
});

/**
 *
 * This section is for all things groups/subjects maintenance related
 *
 * pkid starts with = WARDEN#
 * skid starts with = ESCAPEROOM#
 *
 */

/***********************************************************
 * PUT /entities/subject/add/:subject
 * For inserting/updating a subject
 **********************************************************/
app.put("/entities/subject/add/:subject", async (req, res) => {
  const { uid } = req.query;
  const subject = req.params["subject"].toUpperCase(); // the subjects are all uppercase
  let message = `The subject: ${subject} already exists`;

  const data = {
    uid: UID,
    subject,
  };

  try {
    const subjects = await getSubjects(data);

    const list = subjects["subjects"];

    let updatedData = list;
    // Only insert a value if it doesn't already exist in list
    if (!list || list.findIndex((item) => item.name === subject) === -1) {
      const result = await putSubject(data);
      message = result.message;
      updatedData = result.updatedData;
    }

    res.json({
      data: updatedData,
      message,
    });
  } catch (error) {
    console.log(`There was an error when adding the subject : `, error);
    res.statusCode = 400;
    res.json({ error: error.message, body: req.body });
  }
});

/***********************************************************
 * PUT /entities/subject/remove/:item
 * For removing a subject
 **********************************************************/
app.put("/entities/subject/remove/:subject", async (req, res) => {
  const entityType = "subject";
  const { uid } = req.query;
  const subject = req.params["subject"].toUpperCase(); // the subjects are all uppercase

  const data = {
    uid: UID,
    entityType,
    subject,
    value: subject,
    playedGames: {},
  };

  try {
    // first need to get the subject from the db and it's index in the array
    const subjectData = await getSubjects(data);

    data.index = subjectData["subjects"].findIndex(
      (item) => item.name === subject
    );

    let message;
    let updatedData = subjectData["subjects"]; // default return is the original subjectData
    if (data.index === -1) message = `SUBJECTS: ${subject} - does not exist`;
    // the subject can be removed
    else {
      const result = await removeSubject(data);
      message = result.message;
      updatedData = result.updatedData;
    }

    res.json({
      data: updatedData,
      message,
    });
  } catch (error) {
    console.log(`There was an error when adding the Subject : `, error);
    res.statusCode = 400;
    res.json({ error: error.message, body: req.body });
  }
});

/***********************************************************
 * PUT /entities/subject/modules/add/:item
 * For inserting a subject module
 **********************************************************/
app.put("/entities/subject/modules/add/:module", async (req, res) => {
  const { uid, parentSubject } = req.query;
  const subjModule = req.params["module"].toUpperCase(); // the modules are all uppercase
  let message = `The MODULE: ${subjModule} already exists`;

  const data = {
    uid: UID,
    value: subjModule,
  };

  try {
    // get all subjects
    const subjects = await getSubjects(data);

    const subjectList = subjects["subjects"];

    let updatedData = subjectList;
    // The parentSubject must exist in the subjectList
    data.subjectIndex = subjectList.findIndex(
      (item) => item.name === parentSubject
    );

    if (data.subjectIndex !== -1) {
      //Only add a module if it doesn't exist in the modules array
      const moduleIndex =
        subjectList[data.subjectIndex].modules.indexOf(subjModule);

      if (moduleIndex === -1) {
        // add the module
        const result = await putModule(data);
        message = result.message;
        updatedData = result.updatedData;
      }
    } else message = `SUBJECTS: ${parentSubject} does not exist`;

    res.json({
      data: updatedData,
      message,
    });
  } catch (error) {
    console.log(
      `There was an error when adding the module ${subjModule} : `,
      error
    );
    res.statusCode = 400;
    res.json({ error: error.message, body: req.body });
  }
});

/***********************************************************
 * PUT /entities/subject/modules/remove/:module
 * For removing a module
 **********************************************************/
app.put("/entities/subject/modules/remove/:module", async (req, res) => {
  const { uid, parentSubject, entityType } = req.query;
  const subjModule = req.params["module"].toUpperCase(); // the modules are all uppercase

  const data = {
    uid: UID,
    entityType,
    parentSubject,
    value: subjModule,
    playedGames: {},
    index: -1,
    subjectIndex: -1,
  };

  let message;
  let updatedData;

  try {
    // first need to get the subject from the db and it's index in the array
    const subjectData = await getSubjects(data);
    updatedData = subjectData["subjects"]; // default return is the original subjectData

    data.subjectIndex = subjectData["subjects"].findIndex(
      (item) => item.name === parentSubject
    );

    if (data.subjectIndex !== -1) {
      data.index =
        subjectData["subjects"][data.subjectIndex]?.modules.indexOf(subjModule);

      if (data.index === -1)
        message = `MODULES: ${subjModule} - does not exist`;
      // the subject can be removed
      else {
        const result = await removeModule(data);
        message = result.message;
        updatedData = result.updatedData;
      }
    } else
      message = `MODULES: The subject ${parentSubject} for the module ${subjModule} - does not exist`;

    res.json({
      data: updatedData,
      message,
    });
  } catch (error) {
    console.log(`There was an error when adding the Subject : `, error);
    res.statusCode = 400;
    res.json({ error: error.message, body: req.body });
  }
});

/***********************************************************
 * PUT /entities/entity/add/:item
 * For inserting/updating a group
 **********************************************************/
app.put("/entities/entity/add/:item", async (req, res) => {
  const { uid, entityType } = req.query;
  const item = req.params["item"].toUpperCase(); // the items are all uppercase
  let message = `The ${entityType}: ${item} already exists`;

  const data = {
    uid: UID,
    entityType: entityType,
    value: item,
  };

  try {
    const items = await getItem(data);
    const list = items[entityType + "s"]; // entityType is singular, the list is labelled as plural

    let updatedData = list; // default return is the original list
    // Only insert a value if it doesn't already exist in list
    if (!list || list.indexOf(item) === -1) {
      const result = await putItem(data);
      message = result.message;
      updatedData = result.updatedData;
    }

    res.json({
      data: updatedData,
      message,
    });
  } catch (error) {
    console.log(`There was an error when adding the ${entityType} : `, error);
    res.statusCode = 400;
    res.json({ error: error.message, body: req.body });
  }
});

/***********************************************************
 * PUT /entities/entity/remove/:item
 * For deleting a group
 **********************************************************/
app.put("/entities/entity/remove/:item", async (req, res) => {
  const { uid, entityType } = req.query;
  const item = req.params["item"].toUpperCase(); // the items are all uppercase

  const data = {
    uid: UID,
    entityType: entityType,
    value: item,
    playedGames: {},
  };

  try {
    // first need to get the item from the db and it's index in the array
    const items = await getItem(data);
    const list = items[entityType + "s"]; // entityType is singular, the list is labelled as plural
    data.index = list.indexOf(item);

    let message;
    let updatedData = list; // default return is the original list
    if (data.index === -1) message = `${entityType}: ${item} - does not exist`;
    // the item can be removed
    else {
      const result = await removeItem(data);
      message = result.message;
      updatedData = result.updatedData;
    }

    res.json({
      data: updatedData,
      message,
    });
  } catch (error) {
    console.log(`There was an error when adding the ${entityType} : `, error);
    res.statusCode = 400;
    res.json({ error: error.message, body: req.body });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
