"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClip = exports.getAllClips = exports.deleteClip = exports.createClip = void 0;
const uuid_1 = require("uuid");
const clip_interface_1 = require("../models/clip.interface");
const createClip = async (req, res) => {
    const { footage } = req.body;
    const uniqueId = (0, uuid_1.v4)();
    if (!footage) {
        return res.status(422).json({ message: 'The field footage is required' });
    }
    const clipInput = {
        id: uniqueId,
        footage,
    };
    const clipCreated = await clip_interface_1.Clip.create(clipInput);
    return res.status(201).json({ data: clipCreated });
};
exports.createClip = createClip;
const getAllClips = async (req, res) => {
    const clips = await clip_interface_1.Clip.find().sort('-createdAt').exec();
    return res.status(200).json({ data: clips });
};
exports.getAllClips = getAllClips;
const getClip = async (req, res) => {
    const { id } = req.params;
    const clip = await clip_interface_1.Clip.findOne({ _id: id });
    if (!clip) {
        return res.status(404).json({ message: `Clip with id "${id}" not found.` });
    }
    return res.status(200).json({ data: clip });
};
exports.getClip = getClip;
const deleteClip = async (req, res) => {
    const { id } = req.params;
    await clip_interface_1.Clip.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Clip deleted successfully.' });
};
exports.deleteClip = deleteClip;
