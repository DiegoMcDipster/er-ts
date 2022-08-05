const { PrimaryKey } = require("./primaryKey");
const { verifyField } = require("./utils");
const _uid = new WeakMap();

const pkEntity = "WARDEN";
const skEntity = "ESCAPEROOM";

/**
 * For import into DynamoDB:
 * - set the data type: GROUPS or SUBJECTS
 * - read the uid and generate the pkid
 * - generate the skid
 * - prepare for import: set the pkid, skid and label/subject
 *
 * For export from DynamoDB:
 * - set the data type: GROUPS or SUBJECTS
 * - read the pkid and skid
 * - groups & subjects: extract the uid and values
 *
 */

class LookupEntity extends PrimaryKey {
  constructor(entityType) {
    super();
    verifyField("entityType", entityType);
    this.entityType = entityType.toUpperCase();
    this.importData = {
      pkid: "",
      skid: "",
      value: "",
    };
    this.exportData = {
      uid: "",
    };
  }

  extractUid(pkid) {
    verifyField("pkid", pkid);

    _uid.set(this, pkid.replace(`${pkEntity}#`, ""));
  }

  mapToModelImport(data) {
    this.setPkid(pkEntity, data.uid);
    this.setSkid(skEntity, this.entityType);

    this.importData.pkid = this.pkid;
    this.importData.skid = this.skid;
    this.importData.value = data.value;
  }

  mapToModelExport(values) {
    if (values.skid !== `ESCAPEROOM#${this.entityType}`)
      throw new Error(`This is not a ${this.entityType} item`);

    const entity = [this.entityType.toLowerCase()];
    if (!values[entity]) throw Error("values.data was not provided");

    this.exportData[entity] = values[entity];

    this.extractUid(values.pkid);

    this.exportData.uid = _uid.get(this);
  }
}

module.exports = { LookupEntity };
