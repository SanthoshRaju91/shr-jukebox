import mongoose from "mongoose";
import logger from "../../common/utils/logger";

function dbStart(options) {
  mongoose
    .connect(options.url, { useNewUrlParser: true })
    .then(() => logger.info(`MongoDB started on ${options.url}`))
    .catch(err => logger.error(err));
}

export default dbStart;
