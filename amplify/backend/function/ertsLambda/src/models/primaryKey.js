const { verifyField } = require("./utils");

const _pkid = new WeakMap();
const _skid = new WeakMap();

class PrimaryKey {
  constructor() {
    this.isPKAllRecords = false;
    this.isSKAllRecords = false;
  }

  get pkid() {
    return _pkid.get(this);
  }

  get skid() {
    return _skid.get(this);
  }

  setPkid = (entity, value) => {
    verifyField("pkid-entity", entity);
    // handle the case where the primary key is a wildcard in the query
    const passedVal = this.isPKAllRecords ? "*" : value;

    verifyField("pkid-value", passedVal);
    _pkid.set(this, `${entity.toUpperCase()}#${value}`);
  };

  setSkid = (entity, value) => {
    verifyField("skid-entity", entity);
    // handle the case where the primary key is a wildcard in the query
    const passedVal = this.isSKAllRecords ? "*" : value;

    verifyField("skid-value", passedVal);
    _skid.set(this, `${entity}#${value}`);
  };
}

module.exports = { PrimaryKey };
