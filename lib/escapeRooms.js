import { API, withSSRContext } from "aws-amplify";
import { createUniqueKey } from "../utils/uniqueKeys";
import { getClientUser } from "../lib/getsession";

const apiName = "escapeRoomsRESTApi";

export async function getEscapeRoom(escapeRoomId, uid, req) {
  if (!escapeRoomId) throw new Error("An EscapeRoom Id must be provided");
  if (!uid) throw new Error("A userid must be provided");

  const { API } = withSSRContext({ req });
  try {
    const escapeRoom = await API.get(
      apiName,
      `/escaperooms/myescaperooms/escaperoom/${escapeRoomId}`,
      {
        queryStringParameters: {
          uid,
        },
      }
    );

    return escapeRoom;
  } catch (error) {
    console.log("There was an error in the GetEscapeRoom: ", error.message);
    throw error;
  }
}

export async function deleteEscapeRoom(escapeRoomId, uid) {
  try {
    const result = await API.del(
      apiName,
      `/escaperooms/myescaperooms/escaperoom/${escapeRoomId}`,
      {
        queryStringParameters: {
          uid,
        },
      }
    );

    return result.success;
  } catch (error) {
    console.log("There was an error in the deleteEscapeRoom: ", error.message);
    throw error;
  }
}

export async function getEscapeRooms(uid, req) {
  const { API } = withSSRContext({ req });
  try {
    const escapeRooms = await API.get(
      apiName,
      `/escaperooms/myescaperooms/${uid}`
    );
    return escapeRooms;
  } catch (error) {
    console.log("There was an error in the GetEscapeRooms: ", error.message);
    throw error;
  }
}

export async function addEntity(uid, entity, entityType, parentSubject) {
  if (!uid) throw new Error("A uid must be passed to the addEntity function");
  if (!entity)
    throw new Error("A entity must be passed to the addEntity function");
  if (!entityType)
    throw new Error("A entityType must be passed to the addEntity function");

  let apiPath;
  switch (entityType) {
    case "subject":
      apiPath = `/escaperooms/myescaperooms/subject/add/${entity.name}`;
      break;
    case "module":
      apiPath = `/escaperooms/myescaperooms/subject/modules/add/${entity}`;
      break;
    case "label":
      apiPath = `/escaperooms/myescaperooms/entity/add/${entity}`;
      break;
    default:
      break;
  }

  try {
    const response = await API.put(apiName, apiPath, {
      queryStringParameters: {
        uid,
        entityType,
        parentSubject,
      },
    });

    const returnMessage = response.success.replace("label", "GROUP");
    if (returnMessage.includes("already exists"))
      throw new Error(returnMessage);

    return response;
  } catch (error) {
    console.log("lib/escapeRooms/addEntity: The error is: ", error);
    throw error;
  }
}

export async function removeEntity(uid, entity, entityType, parentSubject) {
  if (!uid)
    throw new Error("A userid must be passed to the removeEntity function");
  if (!entity)
    throw new Error("A entity must be passed to the removeEntity function");
  if (!entityType)
    throw new Error("A entityType must be passed to the removeEntity function");

  let apiPath;

  switch (entityType) {
    case "subject":
      apiPath = `/escaperooms/myescaperooms/subject/remove/${entity}`;
      break;
    case "label":
      apiPath = `/escaperooms/myescaperooms/entity/remove/${entity}`;
      break;
    case "module":
      apiPath = `/escaperooms/myescaperooms/subject/modules/remove/${entity}`;
      break;
    default:
      throw Error(
        `The entityType: ${entityType} cannot be processed, change your code!`
      );
  }

  try {
    const result = await API.put(apiName, apiPath, {
      queryStringParameters: {
        uid,
        entityType,
        parentSubject,
      },
    });

    return result;
  } catch (error) {
    console.log("There was an error in the removeEntity: ", error.message);
    throw error;
  }
}

export async function updateEscapeRoom(escapeRoom) {
  const { uid, username } = await getClientUser();

  if (escapeRoom.escapeRoomId === "")
    escapeRoom.escapeRoomId = createUniqueKey();

  try {
    await API.put(
      apiName,
      `/escaperooms/myescaperooms/escaperoom/${escapeRoom.escapeRoomId}`,
      {
        body: {
          title: escapeRoom.title,
          description: escapeRoom.description,
          subject: escapeRoom.subject,
          module: escapeRoom.module,
          duration: escapeRoom.duration,
          time_penalty: escapeRoom.time_penalty,
          createdByName: username,
          uid,
          challenges: escapeRoom.challenges,
        },
      }
    );

    return escapeRoom;
  } catch (error) {
    console.log("There was an error in the updateEscapeRoom: ", error.message);
    throw error;
  }
}

export async function getEscapeRoomForGame(gameId, req) {
  if (!gameId) throw new Error("A game Id must be provided");

  const { API } = withSSRContext({ req });
  try {
    const escapeRoom = await API.get(apiName, `/escaperooms/games/${gameId}`);

    // only one object should be returned.
    // So select the first in the returned array
    return escapeRoom[0];
  } catch (error) {
    console.log("There was an error in the GetEscapeRoom: ", error.message);
    throw error;
  }
}
