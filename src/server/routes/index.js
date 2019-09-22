import { Router } from "express";
import rapid from "../../common/utils/rapid";
import logger from "../../common/utils/logger";
import config from "../../common/utils/build-config";

import { createGroup, getGroup, deleteGroup } from "./group";
import { createUser } from "./user";
import { createDedicate, getDedicateList, deleteDedicate, queuedDedicate } from "./dedicate";

const router = Router();

function respondError(error, res) {
  logger.error("Error");
  logger.error(error);

  res.status(500).json({
    errorCode: 500,
    errorMessage: "Application error"
  });
}

router.post("/group", async (req, res) => {
  try {
    const { name, owner, invities_limit, description } = req.body;
    await createGroup({
      name,
      owner,
      invities_limit,
      description
    });
    res.status(200).send();
  } catch (err) {
    respondError(err, res);
  }
});

router.get("/group/:groupid", async (req, res) => {
  try {
    const { groupid } = req.params;
    const group = await getGroup(groupid);
    res.status(200).json({
      group
    });
  } catch (err) {
    respondError(err, res);
  }
});

router.delete("/group/:groupid", async (req, res) => {
  try {
    const { groupid } = req.params;
    await deleteGroup(groupid);
    res.status(200).send();
  } catch (err) {
    respondError(err, res);
  }
});

router.post("/user", async (req, res) => {
  try {
    const { firstname, lastname, emailAddress } = req.body;
    await createUser({
      firstname,
      lastname,
      emailAddress
    });
    res.status(200).send();
  } catch (err) {
    respondError(err, res);
  }
});

router.post("/song/search", async (req, res) => {
  try {
    const { search } = req.body;
    const response = await rapid(config.rapid.deezer.url, config.rapid.deezer.method, config.rapid.deezer.headers, {
      query: {
        q: search
      }
    });
    const dataResponse = response.data.map(data => ({
      id: data.id,
      title: data.title,
      link: data.link,
      preview: data.preview,
      album: {
        title: data.album.title,
        cover: data.album.cover_xl
      }
    }));
    res.status(200).json(dataResponse);
  } catch (err) {
    respondError(err, res);
  }
});

router.post("/dedicate", async (req, res) => {
  try {
    const { groupId, songId, songTitle, songLink, songPreview, songAlbumTitle, songAlbumCover, to, message } = req.body;
    const checkBadWordResponse = await rapid(
      config.rapid["bad-word"].url,
      config.rapid["bad-word"].method,
      config.rapid["bad-word"].headers,
      {
        form: {
          "censor-character": "*",
          content: message
        }
      }
    );

    if (!checkBadWordResponse["is-bad"]) {
      await createDedicate({
        groupId,
        song: {
          id: songId,
          title: songTitle,
          link: songLink,
          preview: songPreview,
          album: {
            title: songAlbumTitle,
            cover: songAlbumCover
          }
        },
        to,
        message
      });
      res.status(200).send();
    } else {
      res.status(400).json({
        errorCode: 400,
        errorMessage: "Contains bad words"
      });
    }
  } catch (err) {
    console.log(err);
    respondError(err, res);
  }
});

router.get("/dedicate/list/:groupid", async (req, res) => {
  try {
    const { groupid } = req.params;
    const list = await getDedicateList(groupid);
    res.status(200).json({
      list
    });
  } catch (err) {
    respondError(err, res);
  }
});

router.delete("/dedicate/list/:groupid/:dedicateid", async (req, res) => {
  try {
    const { dedicateid } = req.params;
    await deleteDedicate(dedicateid);
    res.status(200).send();
  } catch (err) {
    respondError(err, res);
  }
});

router.get("/dedicate/:groupid/queued", async (req, res) => {
  try {
    const { groupid } = req.params;
    const queued = await queuedDedicate(groupid);
    res.status(200).json({
      queued
    });
  } catch (err) {
    respondError(err, res);
  }
});

export default router;
