import Dedicate from "../models/dedicate";
import { addJobQueue } from "../Queue";

export async function createDedicate({ groupId, song, to, message }) {
  try {
    const newDedicate = new Dedicate({
      groupId,
      song,
      to,
      message,
      isQueued: false,
      isShown: false
    });
    addJobQueue(newDedicate);
    return await newDedicate.save();
  } catch (err) {
    throw new Error(err);
  }
}

export async function getDedicateList(groupId) {
  try {
    const dedicateList = await Dedicate.find({ groupId }).sort({ date: -1 });
    return dedicateList;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteDedicate(dedicateId) {
  try {
    const dedicate = await Dedicate.findByIdAndRemove(dedicateId);
    return dedicate;
  } catch (err) {
    throw new Error(err);
  }
}

export async function queuedDedicate(groupId) {
  try {
    const queued = await Dedicate.findOne({ groupId, isShown: false, isQueued: true });
    const queueResponse = {
      groupId: queued.groupId,
      song: {
        id: queued.song.id,
        title: queued.song.title,
        link: queued.song.link,
        preview: queued.song.preview,
        album: {
          title: queued.song.album.title,
          cover: queued.song.album.cover
        }
      },
      to: queued.to,
      message: queued.message
    };
    return queueResponse;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
