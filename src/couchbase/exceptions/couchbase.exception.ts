export class CouchbaseException extends Error {
  constructor(msg?: string) {
    super(msg);
  }
}
