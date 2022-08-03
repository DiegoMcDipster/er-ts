const { PrimaryKey } = require("./primaryKey");
const { verifyField } = require("./utils");
const _uid = new WeakMap();

const pkEntity = "WARDEN";
const skEntity = "ESCAPEROOM";

/**
 * For import into DynamoDB:
 * - set the data type: SUBJECTS
 * - read the uid and generate the pkid
 * - generate the skid
 * - prepare for import: set the pkid, skid and subject + modules
 *
 * For export from DynamoDB:
 * - set the data type: SUBJECTS
 * - read the pkid and skid
 * - subjects: extract the uid, subjects and modules
 */

class Subject extends PrimaryKey {
  constructor(uid) {
    super();
    this.importData = {
      pkid: this.setPkid(pkEntity, uid),
      skid: this.setSkid(skEntity, "SUBJECTS"),
      subject: { name: "", modules: [] },
    };

    this.exportData = {
      uid: "",
      subjects: [{ name: "", modules: [] }],
    };
  }

  extractUid(pkid) {
    verifyField("pkid", pkid);

    _uid.set(this, pkid.replace(`${pkEntity}#`, ""));
  }

  mapToModelImport(data) {
    this.importData.pkid = this.pkid;
    this.importData.skid = this.skid;
    this.importData.subject.name = data.subject;
  }

  mapToModelImportModule(data) {
    this.importData.pkid = this.pkid;
    this.importData.skid = this.skid;
    this.importData.module = data.value;
  }

  mapToModelExport(values) {
    if (values.skid !== `ESCAPEROOM#SUBJECTS`)
      throw new Error("This is not a subject");

    if (!values["subjects"]) throw Error("values.data was not provided");

    this.exportData["subjects"] = values["subjects"];

    this.extractUid(values.pkid);

    this.exportData.uid = _uid.get(this);
  }
}

module.exports = { Subject };
