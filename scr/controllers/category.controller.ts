import { RequestHandler } from "express";
import { CategoryService } from "../services/category.service"

class CategoryController {
  constructor(private categoryService: CategoryService) { }

  public GetCategoryById: RequestHandler = async (req, res) => {
    const id = req.params.id

    const { status, ...other } = await this.categoryService.GetCategoryById(id)

    res.status(status).json({ ...other })
  }

  public GetCategoryBySubPath: RequestHandler = async (req, res) => {
    const subPath = req.params.subPath as string

    const { status, ...other } = await this.categoryService.GetCategoryBySubPath(subPath)

    res.status(status).json({ ...other })
  }

  public Find: RequestHandler = async (req, res) => {
    const payload = req.query
    const { status, ...other } = await this.categoryService.Find(payload)

    res.status(status).json({ ...other })
  }

  public UpdateCategory: RequestHandler = async (req, res) => {
    const id = req.params.id

    const { status, ...other } = await this.categoryService.updateCategory(id, req.body)

    res.status(status).json({ ...other })
  }

  public getTags: RequestHandler = async (req, res) => {

    const paths = req.params['path'] as any;
    let fullPath = ''
    if (Array.isArray(paths)) {
      fullPath = paths.join('/')
    }
    else {
      fullPath = paths
    }

    const { status, ...other } = await this.categoryService.getTags(fullPath)

    res.status(status).json({ ...other })
  }

  public getCategoryTree: RequestHandler = async (req, res) => {

    const { status, ...other } = await this.categoryService.getCategoryTree()

    res.status(status).json({ ...other })
  }

  public uploadCatalogJson: RequestHandler = async (req, res) => {
    const jsonTree = req.body;

    const { status, ...other } = await this.categoryService.uploadCatalogJson(jsonTree)

    res.status(status).json({ ...other })
  }

  public createCategory: RequestHandler = async (req, res) => {

    const { status, ...other } = await this.categoryService.createCategory(req.body)

    res.status(status).json({ ...other })
  }

  public deleteCategory: RequestHandler = async (req, res) => {
    const { path } = req.params;

    const { status, ...other } = await this.categoryService.deleteCategory(path)

    res.status(status).json({ ...other })
  }
}

export { CategoryController }