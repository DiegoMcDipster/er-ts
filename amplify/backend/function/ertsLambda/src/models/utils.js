const verifyField = (field, value) => {
  if (!value || value === "") throw new Error(`A ${field} must be provided`);
};

module.exports = { verifyField };
