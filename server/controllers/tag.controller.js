const tagService = require('../services/tag.service');

exports.createTag = (req, res, next) => {
  tagService.create(req.body).then(res.status(201).json({message: "Tag created successfully"})).catch(next)
}
exports.getAllTags = (req, res, next) => {
  tagService.findAll(req.params).then(data => res.status(200).json(data)).catch(next)
}
exports.getOneTag = (req, res, next) => {
  tagService.findOne(req.params.id).then(data => res.status(200).json(data)).catch(next)
}
exports.updateTag = (req, res, next) => {
  tagService.update(req.params.id, req.body).then(data => res.status(201).json({message: "Tag updated successfully"})).catch(next)
}
exports.deleteTag = (req, res, next) => {
  tagService.remove(req.params.id).then(data => res.status(200).json({message: "Tag deteted successfully"})).catch(next)
}


