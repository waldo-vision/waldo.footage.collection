"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clipRoute = void 0;
const express_1 = require("express");
const clip_controller_1 = require("../controllers/clip.controller");
const clipRoute = () => {
    const router = (0, express_1.Router)();
    router.post('/', clip_controller_1.createClip);
    router.get('/', clip_controller_1.getAllClips);
    router.get('/:id', clip_controller_1.getClip);
    // router.patch('/clip/:id', updateClip);
    router.delete('/:id', clip_controller_1.deleteClip);
    return router;
};
exports.clipRoute = clipRoute;
