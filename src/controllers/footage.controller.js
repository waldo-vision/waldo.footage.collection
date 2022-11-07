"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFootage = exports.getAllFootage = exports.deleteFootage = exports.createFootage = void 0;
const uuid_1 = require("uuid");
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const fs = __importStar(require("fs"));
const footage_interface_1 = require("../models/footage.interface");
const createFootage = async (req, res) => {
    const { id, username, url } = req.body;
    if (!id || !username || !url) {
        return res.status(422).json({ message: 'The fields id, username, and URL are required' });
    }
    const footageId = (0, uuid_1.v4)();
    const footageInput = {
        id: footageId,
        discordId: id,
        username,
        youtubeUrl: url,
        isCsgoFootage: false,
        isAnalyzed: false,
    };
    try {
        // Validate that the URL contains a video that can be downloaded.
        await ytdl_core_1.default.getInfo(url);
        // Download video and save as a local MP4 to be used for processing.
        await (0, ytdl_core_1.default)(url).pipe(fs.createWriteStream(`${footageId}.mp4`));
        // TODO: Implement functionality to trigger python kill shot parsing script.
        // https://www.tutorialspoint.com/run-python-script-from-node-js-using-child-process-spawn-method
        // https://github.com/waldo-vision/aimbot-detection-prototype/blob/main/auto_clip.py
        // If we get resulting clips, then isCsgoFootage should be true.
        // TODO: Implement functionality to trigger logic to shrink video capture width & height.
        // It would be best to do this logic directly within Python script when saving the clip files.
        // Otherwise cropping could be achieved by using FFMPEG or something along those lines.
        // TODO: Submit clips with unique IDs and association to footage ID (API to set DB & FS to create clip file).
        // Each clip should be submitted to the database as a ClipInput.
        // Each clip should be stored to a location on the local server where it can be obtained by the Analysis team.
        const footageCreated = await footage_interface_1.Footage.create(footageInput);
        return res.status(201).json({ data: footageInput });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(404).json({ message: 'Something went wrong parsing video from URL' });
    }
};
exports.createFootage = createFootage;
const getAllFootage = async (req, res) => {
    const footage = await footage_interface_1.Footage.find().sort('-createdAt').exec();
    return res.status(200).json({ data: footage });
};
exports.getAllFootage = getAllFootage;
const getFootage = async (req, res) => {
    const { id } = req.params;
    const footage = await footage_interface_1.Footage.findOne({ _id: id });
    if (!footage) {
        return res.status(404).json({ message: `Footage with id "${id}" not found.` });
    }
    return res.status(200).json({ data: footage });
};
exports.getFootage = getFootage;
// TODO: Implement getUserFootage endpoint to get all footage based on user ID.
// const getUserFootage = async (req: Request, res: Response) => {
//
// };
// TODO: Implement getFootageClips endpoint to get all associated clips based on footage ID.
// const getFootageClips = async (req: Request, res: Response) => {
//
// };
// TODO: Implement updateFootage endpoint to update after parsing & analysis.
// const updateFootage = async (req: Request, res: Response) => {
//
// };
const deleteFootage = async (req, res) => {
    const { id } = req.params;
    await footage_interface_1.Footage.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Footage deleted successfully.' });
};
exports.deleteFootage = deleteFootage;
