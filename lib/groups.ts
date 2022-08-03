import { API } from "aws-amplify";

const apiName = "ertsRestApi";

export async function getEntity(entityType: string, uid: string) {
  if (!entityType) throw new Error("An entityType must be provided");
  if (!uid) throw new Error("A userid must be provided");

  try {
    const response = await API.get(apiName, `/entities/${entityType}`, {
      queryStringParameters: {
        uid,
      },
    });

    return response.groups;
  } catch (error: any) {
    console.log("There was an error in the getEntity: ", error.message);
    throw error;
  }
}

export async function updateEntity(
  uid: string,
  entity: any,
  entityType: string,
  action: string,
  parentSubject: string = ""
) {
  if (!uid) throw new Error("updateEntity: a uid must be passed");
  if (!entity) throw new Error("updateEntity: an entity must be passed");
  if (!entityType)
    throw new Error("updateEntity: an entityType must be passed");
  if (!action) throw new Error("updateEntity: an action must be passed");

  let apiPath: string;
  switch (entityType) {
    case "subject":
      apiPath = `/entities/subject/${action}/${entity.name}`;
      break;
    case "module":
      apiPath = `/entities/subject/modules/${action}/${entity}`;
      break;
    case "group":
      apiPath = `/entities/entity/${action}/${entity}`;
      break;
    default:
      throw "updateEntity: A valid enityType must be entered!";
  }

  try {
    const response = await API.put(apiName, apiPath, {
      queryStringParameters: {
        uid,
        entityType,
        parentSubject,
      },
    });

    if (response.message.includes("already exists")) throw response.message;

    return response;
  } catch (error: any) {
    console.log("lib/addEntity: The error is: ", error);
    throw error;
  }
}
