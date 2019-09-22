import config from "./build-config";

const DEFAULT_WAIT_TIME = config.WAIT_TIME;

export default function wait(waitTime = DEFAULT_WAIT_TIME) {
  return new Promise(resolve => {
    setTimeout(resolve, waitTime);
  });
}
