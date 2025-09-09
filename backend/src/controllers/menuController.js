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
exports.deleteMenu = exports.updateMenu = exports.createMenu = exports.getAllMenus = void 0;

const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const global_1 = require("../global");
const fs_1 = __importDefault(require("fs"));

const prisma = new client_1.PrismaClient({ errorFormat: "pretty" });

/** GET ALL MENUS (with filter search & categori) */
const getAllMenus = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, category } = request.query;

        /** Build where clause */
        const whereClause = {};

        if (search) {
            whereClause.name = {
                contains: search.toString(),
                mode: "insensitive"
            };
        }

        if (category && category.toString().toUpperCase() !== "ALL") {
            whereClause.category = category.toString().toUpperCase();
        }

        /** Fetch menus */
        const allMenus = yield prisma.menu.findMany({
            where: whereClause
        });

        return response.status(200).json({
            status: true,
            data: allMenus,
            message: `Menus have been retrieved`
        });
    } catch (error) {
        console.error(error);
        return response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        });
    }
});
exports.getAllMenus = getAllMenus;

/** CREATE MENU */
const createMenu = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, category, description } = request.body;
        const uuid = (0, uuid_1.v4)();
        let filename = "";

        if (request.file) filename = request.file.filename;

        const newMenu = yield prisma.menu.create({
            data: {
                uuid,
                name,
                price: Number(price),
                category,
                description,
                picture: filename
            }
        });

        return response.status(200).json({
            status: true,
            data: newMenu,
            message: `New Menu has been created`
        });
    } catch (error) {
        console.error(error);
        return response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        });
    }
});
exports.createMenu = createMenu;

/** UPDATE MENU */
const updateMenu = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const { name, price, category, description } = request.body;

        const findMenu = yield prisma.menu.findFirst({
            where: { id: Number(id) }
        });

        if (!findMenu) {
            return response.status(200).json({
                status: false,
                message: `Menu is not found`
            });
        }

        let filename = findMenu.picture;
        if (request.file) {
            filename = request.file.filename;
            let path = `${global_1.BASE_URL}/../public/menu_picture/${findMenu.picture}`;
            let exists = fs_1.default.existsSync(path);
            if (exists && findMenu.picture !== ``) fs_1.default.unlinkSync(path);
        }

        const updatedMenu = yield prisma.menu.update({
            data: {
                name: name || findMenu.name,
                price: price ? Number(price) : findMenu.price,
                category: category || findMenu.category,
                description: description || findMenu.description,
                picture: filename
            },
            where: { id: Number(id) }
        });

        return response.status(200).json({
            status: true,
            data: updatedMenu,
            message: `Menu has been updated`
        });
    } catch (error) {
        console.error(error);
        return response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        });
    }
});
exports.updateMenu = updateMenu;

/** DELETE MENU */
const deleteMenu = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;

        const findMenu = yield prisma.menu.findFirst({
            where: { id: Number(id) }
        });

        if (!findMenu) {
            return response.status(200).json({
                status: false,
                message: `Menu is not found`
            });
        }

        let path = `${global_1.BASE_URL}/../public/menu_picture/${findMenu.picture}`;
        let exists = fs_1.default.existsSync(path);
        if (exists && findMenu.picture !== ``) fs_1.default.unlinkSync(path);

        const deletedMenu = yield prisma.menu.delete({
            where: { id: Number(id) }
        });

        return response.status(200).json({
            status: true,
            data: deletedMenu,
            message: `Menu has been deleted`
        });
    } catch (error) {
        console.error(error);
        return response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        });
    }
});
exports.deleteMenu = deleteMenu;
