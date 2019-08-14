import { AppendOptions, CounterOptions, GetAndLockOptions } from 'couchbase';

export interface Repository<T> {
  new (): Repository<T>;
  entity: T;

  /**
   * Similar to Bucket#upsert, but instead of setting a new key, it appends data to the existing key. Note that this function only makes sense when the stored data is a string; 'appending' to a JSON document may result in parse errors when the document is later retrieved.
   * @param key The target document key.
   * @param fragment The document's contents to append.
   */
  append(key: string | Buffer, fragment: Partial<T>): Promise<any>;

  /**
   *
   * @param key The target document key.
   * @param fragment The document's contents to append.
   * @param options The options object.
   * @param callback The callback function.
   */
  append(
    key: string | Buffer,
    fragment: Partial<T>,
    options: AppendOptions,
  ): Promise<any>;

  /**
   * Increments or decrements a key's numeric value.
   * Note that JavaScript does not support 64-bit integers (while lib couchbase and the server do). You might receive an inaccurate value if the number is greater than 53-bits (JavaScript's maximum integer precision).
   * @param key The target document key.
   * @param delta The amount to add or subtract from the counter value. This value may be any non-zero integer.
   */
  counter(key: string | Buffer, delta: number): Promise<any>;

  /**
   *
   * @param key The target document key.
   * @param delta The amount to add or subtract from the counter value. This value may be any non-zero integer.
   * @param options The options object.
   */
  counter(key: string | Buffer, delta: number, options: CounterOptions): Promise<any>;

  /**
   * Retrieves a document.
   * @param key The target document key.
   */
  get(key: string | Buffer): Promise<T>;

  /**
   * @param key The target document key.
   * @param options The options object.
   */
  get(key: string | Buffer, options: any): Promise<T>;

  /**
   * Lock the document on the server and retrieve it. When an document is locked, its CAS changes and subsequent operations on the document (without providing the current CAS) will fail until the lock is no longer held.
   * This function behaves identically to Bucket#get in that it will return the value. It differs in that the document is also locked. This ensures that attempts by other client instances to access this document while the lock is held will fail.
   * Once locked, a document can be unlocked either by explicitly calling Bucket#unlock or by performing a storage operation (e.g. Bucket#upsert, Bucket#replace, Bucket::append) with the current CAS value. Note that any other lock operations on this key will fail while a document is locked.
   * @param key The target document key.
   */
  getAndLock(key: string): Promise<T>;

  /**
   * Lock the document on the server and retrieve it. When an document is locked, its CAS changes and subsequent operations on the document (without providing the current CAS) will fail until the lock is no longer held.
   * This function behaves identically to Bucket#get in that it will return the value. It differs in that the document is also locked. This ensures that attempts by other client instances to access this document while the lock is held will fail.
   * Once locked, a document can be unlocked either by explicitly calling Bucket#unlock or by performing a storage operation (e.g. Bucket#upsert, Bucket#replace, Bucket::append) with the current CAS value. Note that any other lock operations on this key will fail while a document is locked.
   * @param key The target document key.
   * @param options The options object.
   * @returns {}
   */
  getAndLock(key: string, options: GetAndLockOptions): Promise<T>;

  /**
   * Retrieves a document and updates the expiry of the item at the same time.
   * @param key The target document key.
   * @param expiry The expiration time to use. If a value of 0 is provided, then the current expiration time is cleared and the key is set to never expire. Otherwise, the key is updated to expire in the time provided (in seconds).
   * @param options The options object.
   */
  getAndTouch(key: string | Buffer, expiry: number, options: any): Promise<T>;

  /**
   * Retrieves a document and updates the expiry of the item at the same time.
   * @param key The target document key.
   * @param expiry The expiration time to use. If a value of 0 is provided, then the current expiration time is cleared and the key is set to never expire. Otherwise, the key is updated to expire in the time provided (in seconds).
   */
  getAndTouch(key: string | Buffer, expiry: number): Promise<T>;
}
