import crypto from "crypto";
/**
 * @description
 * Create Class that handle Image Upload
 * @author ifeoluwa Odewale
 */

class FileSystem {
  /**
   * Generate a random cryptographic filename with
   * @method generateRandomFilename
   */
  static generateRandomFilename(extension) {
    // create pseudo random bytes
    const bytes = crypto.pseudoRandomBytes(32);

    // create the md5 hash of the random bytes
    const checksum = crypto.createHash("MD5").update(bytes).digest("hex");

    // return as filename the hash with the output extension
    return `${checksum}.${extension}`;
  }

  static getBase64Extension(data) {
    if (data.search("data:image/png;base64,") > -1) {
      return "png";
    } else if (data.search("data:image/jpeg;base64,") > -1) {
      return "jpeg";
    }
    return "invalid";
  }
}

export default FileSystem;

