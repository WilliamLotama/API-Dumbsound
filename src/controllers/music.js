const { music, artis } = require("../../models");

exports.musics = async (req, res) => {
  try {
    let musics = await music.findAll({
      include: {
        model: artis,
        as: "artis",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt"],
      },
      order: [["createdAt", "DESC"]],
    });

    musics = JSON.parse(JSON.stringify(musics));
    musics = musics.map((item) => {
      return {
        ...item,
        attache: process.env.PATH_FILE + item.attache,
        thumbnail: process.env.PATH_FILE + item.thumbnail,
      };
    });

    console.log(musics);

    res.send({
      status: "success",
      message: "User Successfully Get",
      data: {
        musics,
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addMusic = async (req, res) => {
  try {
    const data = req.body;
    const thumbnail = req.files?.imageSong[0]?.filename;
    const attache = req.files?.fileSong[0]?.filename;

    console.log(data);
    console.log(thumbnail);
    console.log(attache);

    const dataUpload = {
      ...data,
      thumbnail,
      attache,
    };

    await music.create(dataUpload);

    res.send({
      status: "success",
      message: "Upload data Music success",
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
