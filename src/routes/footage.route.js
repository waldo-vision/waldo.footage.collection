"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.footageRoute = void 0;
const express_1 = require("express");
const footage_controller_1 = require("../controllers/footage.controller");
const footageRoute = () => {
    const router = (0, express_1.Router)();
    router.post('/', footage_controller_1.createFootage);
    router.get('/', footage_controller_1.getAllFootage);
    router.get('/:id', footage_controller_1.getFootage);
    // router.get('/user/:id', getUserFootage);
    // router.get('/clips/:id', getFootageClips);
    // router.patch('/:id', updateFootage);
    router.delete('/:id', footage_controller_1.deleteFootage);
    return router;
};
exports.footageRoute = footageRoute;
