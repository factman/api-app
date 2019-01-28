/**
 * @description
 * Create Class that handle Image Upload
 * @author ifeoluwa Odewale
 */
import _ from "lodash";
import fs from "fs";
import path from "path";
import Jimp from "jimp";
import crypto from "crypto";
import mkdirp from "mkdirp";
import concat from "concat-stream";
import streamifier from "streamifier";

class ImageUploader {
  constructor(option) {
    this.uploadPath = path.resolve(__dirname, "..", process.env.AVATAR_STORAGE);
    this.baseUrl = process.env.AVATAR_BASE_URL;
    this.allowedStorageSystems = ["local"];
    this.allowedOutputFormats = ["jpg", "png", "jpeg", "gif"];
    // fallback for the options
    this.defaultOptions = {
      storage: "local",
      output: "png",
      greyscale: false,
      quality: 70,
      square: true,
      threshold: 500,
      responsive: false,
    };

    /** Override the default settings with the
         * @param option
         */
    this.options = this.mergeSetOptionDefualtOption(option);
  }

  // Merge the set option with the default option
  mergeSetOptionDefualtOption(option) {
    let options = (option && _.isObject(option)) ? _.pick(option, _.keys(this.defaultOptions)) : {};

    options = _.extend(this.defaultOptions, options);

    return this.checkCorrectValueFallback(options);
  }

  /** Check if the option was set correct
     * if not use the defaultOption
     */
  checkCorrectValueFallback(options) {
    const fallbackOption = _.forIn(options, (value, key, object) => {
      let val = value;
      const index = key;
      const opt = object;
      switch (index) {
        case "square":
        case "greyscale":
        case "responsive":
          opt[index] = _.isBoolean(val) ? val : this.defaultOptions[index];
          break;
        case "storage":
          val = String(val).toLowerCase();
          opt[index] = _.includes(this.allowedStorageSystems, val)
            ? val : this.defaultOptions[index];
          break;
        case "output":
          val = String(val).toLowerCase();
          opt[index] = _.includes(this.allowedOutputFormats, val)
            ? val : this.defaultOptions[index];
          break;
        case "quality":
          val = _.isFinite(val) ? val : Number(val);
          opt[index] = (val && val >= 0 && val <= 100) ? val : this.defaultOptions[index];
          break;
        case "threshold":
          val = _.isFinite(val) ? val : Number(val);
          opt[index] = (val && val >= 0) ? val : this.defaultOptions[index];
          break;
        default:
          break;
      }
    });

    this.setOptionDependence(fallbackOption);

    return fallbackOption;
  }

  setOptionDependence(options) {
    // Set the upload path
    this.uploadPathDir = options.responsive ? path.join(this.uploadPath, "responsive") : this.uploadPath;

    // Set the upload base url
    this.uploadBaseUrl = options.responsive ? path.join(this.baseUrl, "responsive") : this.baseUrl;

    if (options.storage === "local") {
      /** If upload path does not exit,
         *  create the upload path structure
    */
      if (!fs.existsSync(this.uploadPathDir)) mkdirp.sync(this.uploadPathDir);
    }
  }
  /**
     * Generate a random cryptographic filename with
     * @method generateRandomFilename
     */
  generateRandomFilename() {
    // create pseudo random bytes
    const bytes = crypto.pseudoRandomBytes(32);

    // create the md5 hash of the random bytes
    const checksum = crypto.createHash("MD5").update(bytes).digest("hex");

    // return as filename the hash with the output extension
    return `${checksum}.${this.options.output}`;
  }

  // this creates a Writable stream for a filepath
  createOutputStream(filepath, callback) {
    // create a writable stream from the filepath
    const output = fs.createWriteStream(filepath);

    // set callback function as handler for the error event
    output.on("error", callback);

    // set handler for the finish event
    output.on("finish", () => {
      callback(null, {
        destination: this.uploadPath,
        baseUrl: this.uploadBaseUrl,
        filename: path.basename(filepath),
        storage: this.options.storage,
      });
    });
    // return the output stream
    return output;
  }

  // this process the Jimp image buffer
  processImage(image, callback) {
    let batch = [];

    // the responsive sizes
    const sizes = ["lg", "md", "sm"];

    // the generate the filename
    const filename = this.generateRandomFilename();

    // use the default image extension
    let mime = Jimp.MIME_PNG;

    // create a clone of the Jimp image
    let clone = image.clone();

    // fetch the Jimp image dimension
    const { width, height } = clone.bitmap.width;
    let square = Math.min(width, height);
    const { threshold } = this.options;

    // resolve the jimp mime type
    switch (this.options.output) {
      case "jpg":
        mime = Jimp.MIME_JPEG;
        break;
      case "png":
      default:
        mime = Jimp.MIME_PNG;
        break;
    }

    // auto scale the image dimension to fit the threshold requirement
    if (threshold && square > threshold) {
      clone = (square === width) ?
        clone.resize(threshold, Jimp.AUTO) : clone.resize(Jimp.AUTO, threshold);
    }

    // crop the image to square if enabled
    if (this.options.square) {
      if (threshold) square = Math.min(square, threshold);
      clone = clone.crop((clone.bitmap.width - square) / 2, square, square);
    }

    // convert the image to greyscale if enabled
    if (this.options.greyscale) clone = clone.greyscale();

    // set the image output quanlity
    clone = clone.quality(this.options.quality);

    if (this.options.responsive) {
      // map through the responsive sizes and push them to the batch
      batch = _.map(sizes, (size) => {
        let images = null;
        // split the filename from its extension
        let filepath = filename.split(".");

        // create the complete filepath and create a writable stream for it
        filepath = `${filepath[0]}_${size}.${filepath[1]}`;
        filepath = path.join(this.uploadPathDir, filepath);
        const outputStream = this.createOutputStream(filepath, callback);

        switch (size) {
          case "sm":
            images = clone.clone().scale(0.3);
            break;
          case "md":
            images = clone.clone().scale(0.7);
            break;
          case "lg":
            images = clone.clone();
            break;
          default:
            break;
        }

        // return an object of the stream and the jimp image
        return {
          stream: outputStream,
          image: images,
        };
      });
    } else {
      batch.push({
        stream: this.createOutputStream(path.join(this.uploadPathDir, filename), callback),
        image: clone,
      });
    }

    // process the batch sequence
    _.each(batch, (current) => {
      // get the buffer of the Jimp image using the output mime type
      current.image.getBuffer(mime, (err, buffer) => {
        if (this.options.storage === "local") {
          // create a read stream from the buffer and pipe it to the outout stream
          streamifier.createReadStream(buffer).pipe(current.stream);
        }
      });
    });
  }

  // multer requires this for handling the uploaded file
  _handleFile(req, files, callback) {
    /**
         * Create a writable stream using concat-stream that will
         * concatenate all the buffers written to it and pass the
         * complete buffer to a callback function
         */
    const fileManipulate = concat((imageData) => {
      /**
              * read the image buffer with Jimp
              * it return a promise
              */
      Jimp.read(imageData)
        .then((image) => {
          // precess the Jimp image buffer
          this.processImage(image, callback);
        })
        .catch(callback);
    });

    // write the uploaded file buffer to the fileManipulate stream
    files.stream.pipe(fileManipulate);
  }


  // multer requires this for the destroying file
  _removeFile(req, file, callback) {
    let matches;
    let pathsplit;
    const { filename } = file;
    const reqFile = file;
    const links = path.join(this.uploadPath, filename);
    let paths = [];

    // delete the file properties
    delete reqFile.filename;
    delete reqFile.destination;
    delete reqFile.baseUrl;
    delete reqFile.storage;

    // create paths for responsive images
    if (this.options.responsive) {
      pathsplit = links.split("/");
      /**
             * Get the last element of pathsplit @func pathsplit.pop()
             * split the last element using the regex
             */
      matches = pathsplit.pop().match(/^(.+?)_.+?\.(.+)$/i);

      if (matches) {
        paths = _.map(["lg", "md", "sm"], size => `${pathsplit.join("/")}/${matches[1]}_${size}.${matches[2]}`);
      }
    } else {
      paths = [links];
    }

    // delete the files from the filesystem
    _.each(paths, link => fs.unlink(link, callback));
  }
}

export default ImageUploader;

