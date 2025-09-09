import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../global";
import fs from "fs";

const prisma = new PrismaClient({ errorFormat: "pretty" });

/** Get all menus with optional search and category filter */
export const getAllMenus = async (request: Request, response: Response) => {
  try {

    const { search, category } = request.query;

    const whereClause: any = {};

    if (search) {
      whereClause.name = {
        contains: search.toString(),
        mode: "insensitive" 
      };
    }

    if (category && category.toString().toUpperCase() !== "ALL") {
      whereClause.category = category.toString().toUpperCase();    
    }

    const allMenus = await prisma.menu.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" }
    });

    return response.status(200).json({
      status: true,
      data: allMenus,
      message: "Menus have been retrieved"
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: `There is an error. ${error}`
    });
  }
};

/** Create a new menu */
export const createMenu = async (request: Request, response: Response) => {
  try {
    const { name, price, category, description } = request.body;
    const uuid = uuidv4();

    let filename = "";
    if (request.file) filename = request.file.filename;

    const newMenu = await prisma.menu.create({
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
      message: "New menu has been created"
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: `There is an error. ${error}`
    });
  }
};

/** Update an existing menu */
export const updateMenu = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, price, category, description } = request.body;

    const findMenu = await prisma.menu.findFirst({ where: { id: Number(id) } });
    if (!findMenu) {
      return response.status(404).json({
        status: false,
        message: "Menu not found"
      });
    }

    let filename = findMenu.picture;
    if (request.file) {
      filename = request.file.filename;

      const path = `${BASE_URL}/../public/menu_picture/${findMenu.picture}`;
      if (fs.existsSync(path) && findMenu.picture !== "") {
        fs.unlinkSync(path);
      }
    }

    const updatedMenu = await prisma.menu.update({
      where: { id: Number(id) },
      data: {
        name: name || findMenu.name,
        price: price ? Number(price) : findMenu.price,
        category: category || findMenu.category,
        description: description || findMenu.description,
        picture: filename
      }
    });

    return response.status(200).json({
      status: true,
      data: updatedMenu,
      message: "Menu has been updated"
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: `There is an error. ${error}`
    });
  }
};

/** Delete a menu */
export const deleteMenu = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const findMenu = await prisma.menu.findFirst({ where: { id: Number(id) } });
    if (!findMenu) {
      return response.status(404).json({
        status: false,
        message: "Menu not found"
      });
    }

    const path = `${BASE_URL}/../public/menu_picture/${findMenu.picture}`;
    if (fs.existsSync(path) && findMenu.picture !== "") {
      fs.unlinkSync(path);
    }

    const deletedMenu = await prisma.menu.delete({
      where: { id: Number(id) }
    });

    return response.status(200).json({
      status: true,
      data: deletedMenu,
      message: "Menu has been deleted"
    });
  } catch (error) {
    return response.status(400).json({
      status: false,
      message: `There is an error. ${error}`
    });
  }
};
