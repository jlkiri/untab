export class RedirectError extends Error {
  url: string;
  statusCode: number;

  constructor(code: number, url: string) {
    super();
    this.statusCode = code;
    this.url = url;
  }
}
