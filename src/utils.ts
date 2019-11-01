import { oO } from '@zmotivat0r/o0';

export function promisify(fn: any, ctx: any): any {
  return function(...args: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      fn.apply(ctx, [
        ...args,
        function(err: Error, ...rest: any[]) {
          if (err) {
            reject(err);
          } else {
            resolve(rest.length > 1 ? rest : rest[0]);
          }
        },
      ]);
    });
  };
}

export function flattenPromise(promise: any): any {
  return async function(...args: any[]): Promise<any[]> {
    return oO(promise(...args));
  };
}

export async function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
