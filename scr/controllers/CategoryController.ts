import { Request, Response } from "express";
import { RequestHandler } from "express";
import * as CategoryService from "../services/categoryService"

/**
 * @function upsertCategory создает или обновляет категорию
 */
const updateCategory: RequestHandler = async (req, res) => {
  try {
    const updated = await CategoryService.updateCategory(req.body)

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

/**
 * @function getTags Получить теги
 */
const getTags: RequestHandler = async (req, res): Promise<any> => {
  try {
    const fullPath = req.params[0];
    const tags = await CategoryService.getTags(fullPath)
    if (!tags) return res.status(404).json({ success: false });

    res.json({ success: true, data: tags });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

// Обновить/добавить теги
const upsertTags: RequestHandler = async (req, res): Promise<any> => {
  try {
    const fullPath = req.params[0];
    const { categoryKey, tagData } = req.body;

    const { status, success, message } = await CategoryService.addOrUpdateTag(fullPath, categoryKey, tagData)

    res.status(status).json({ success, message });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

// Удалить категорию тегов
const removeTag: RequestHandler = async (req, res): Promise<any> => {
  try {
    const fullPath = req.params[0];
    const categoryKey = req.params.category;

    const { status, success, message } = await CategoryService.removeTag(fullPath, categoryKey)

    res.status(status).json({ success, message });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

const getCategoryTree: RequestHandler = async (req: Request, res: Response) => {
  try {
    const tree = await CategoryService.getCategoryTree()

    res.json({ success: true, data: tree });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

const uploadCatalogJson: RequestHandler = async (req, res): Promise<any> => {
  try {
    const jsonTree = req.body;

    const { success, status, message } = await CategoryService.uploadCatalogJson(jsonTree)

    res.status(status).json({ success, message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Ошибка загрузки." });
  }
};

const createCategory: RequestHandler = async (req, res): Promise<any> => {
  try {
    const { name, path, discription, imgUrl, tags } = req.body;

    const { status, success, message } = await CategoryService.createCategory(name, path, discription, imgUrl, tags)

    res.status(status).json({ success, message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Ошибка создания категории." });
  }
};

// Функция для удаления категории по пути
const deleteCategory: RequestHandler = async (req, res): Promise<any> => {
  try {
    const { path } = req.params;

    const { status, success, message } = await CategoryService.deleteCategory(path)

    res.status(status).json({ success, message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Ошибка удаления категории." });
  }
};

export { updateCategory, getTags, upsertTags, removeTag, getCategoryTree, uploadCatalogJson, createCategory, deleteCategory }