const { log } = require('console');
const {File} = require('../models');
const stream = require('stream');

exports.list = async (req, res) => {
  try {
    const { list_size = 10, page = 1 } = req.query;
    const userId = req.user.id;

    const files = await File.findAll({
      where: { UserId: userId },
      attributes: {exclude: 'data'},
      limit: parseInt(list_size),
      offset: (page - 1) * list_size
    });    
    console.log("fe", files);
    return res.json(files);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.byId = async (req, res) => {
  try{
    const file = await File.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    });
    if (!file) return res.status(400).json({ message: 'File is not found!' });
    return res.json(file);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.upload = async (req, res) => {
  try{
    const originalName = req.file.originalname;
    const splitName = originalName.split('.');
    const extension = splitName.length > 1 ? splitName.pop() : '';
    const name = splitName.join('.');
    
    await File.create({
      name: name,
      extension: extension,
      mimeType: req.file.mimetype,
      size: req.file.size,
      data: req.file.buffer,
      UserId: req.user.id
    });

    res.json({msg: 'File ' + req.file.originalname + ' is uploaded successfully!'});
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  try{
    const { id } = req.params;
    const file = await File.findByPk(id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const originalName = req.file.originalname;
    const splitName = originalName.split('.');
    const extension = splitName.length > 1 ? splitName.pop() : '';
    const name = splitName.join('.');
    
    await file.update({
      name: name,
      extension: extension,
      mimeType: req.file.mimetype,
      size: req.file.size,
      data: req.file.buffer,
      UserId: req.user.id
    });
    await file.save();

    res.json({msg: 'File updated successfully!'});

  } catch (error) {
    res.status(500).send(error);
  }
};

exports.download = async(req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const fileContents = Buffer.from(file.data, "base64");
    const readStream = new stream.PassThrough();
    readStream.end(fileContents); 

    const encodedFileName = encodeURIComponent(`${file.name}.${file.extension}`);

    res.set('Content-disposition', `attachment; filename="${encodedFileName}"`);
    res.set('Content-Type', file.mimeType);

    readStream.pipe(res);
    console.log(4);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findByPk(id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    await file.destroy();

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};