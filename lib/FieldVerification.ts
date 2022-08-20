export class FieldVerification {
  verifyField(
    property: unknown,
    propertyName: string,
    requestType: string
  ): void {
    if (!property)
      throw `${propertyName} must be provided for the ${requestType}`;
  }
}
