"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const PORT = process.env.APP_PORT || '8081';
    //parse incoming requests data;
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.get("/test", (req, res) => res.status(200).send({
        message: "Showing Test Page",
    }));
    //default catch-all route that sends a JSON response.
    app.get("*", (req, res) => res.status(401).send({
        message: "Welcome to CompAPI",
        version: '0.0.1',
    }));
    // Runner
    app.listen(PORT, () => {
        console.log(`\x1b[33m --Server running at Port ${PORT}-- \x1b[0m`);
    });
}))();
//# sourceMappingURL=app.js.map