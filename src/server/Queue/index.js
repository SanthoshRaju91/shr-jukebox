import Queue from "bull";
import wait from "../../common/utils/wait";
import logger from "../../common/utils/logger";
import Dedicate from "../models/dedicate";

const ShrJukeboxQueue = new Queue("ShrJukebox", "redis://127.0.0.1:6379");

ShrJukeboxQueue.process(async (job, done) => {
  try {
    const { data } = job;
    await Dedicate.findByIdAndUpdate(data._id, { isQueued: true });
    await wait();
    await Dedicate.findByIdAndUpdate(data._id, { isShown: true });
    logger.info(`Job ${job.id} completed ${JSON.stringify(data)}`);
    done(null);
  } catch (err) {
    logger.error(`Job ${job.id} failed ${JSON.stringify(job.data)}`);
    logger.error(err);
    done(err);
  }
});

export const addJobQueue = jobData => {
  ShrJukeboxQueue.add(jobData);
};
