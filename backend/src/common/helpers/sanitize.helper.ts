/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as sanitizeHtml from 'sanitize-html';

export class Sanitize {
  /**
   * Sanitize Html from exploits and scripts
   * @param input - input data to sanitize
   **/
  static input(input: string) {
    return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} });
  }
}
