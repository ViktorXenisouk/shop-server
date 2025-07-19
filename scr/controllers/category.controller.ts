import { RequestHandler } from "express";
import { CategoryService } from "../services/category.service"

class CategoryController {
  constructor(private categoryService: CategoryService) { }

  public GetById: RequestHandler = async (req, res) => {
    const id = req.params.id

    const { status, ...other } = await this.categoryService.GetById(id)

    res.status(status).json({ ...other })
  }

  public GetBySubPath: RequestHandler = async (req, res) => {
    const subPath = req.params.subPath as string

    const { status, ...other } = await this.categoryService.GetBySubPath(subPath)

    res.status(status).json({ ...other })
  }

  public Find: RequestHandler = async (req, res) => {
    const payload = req.query
    const { status, ...other } = await this.categoryService.Find(payload)

    res.status(status).json({ ...other })
  }

  public Edit: RequestHandler = async (req, res) => {
    const id = req.params.id

    const { status, ...other } = await this.categoryService.Edit(id, req.body)

    res.status(status).json({ ...other })
  }

  public GetTags: RequestHandler = async (req, res) => {

    const paths = req.params['path'] as any;
    let fullPath = ''
    if (Array.isArray(paths)) {
      fullPath = paths.join('/')
    }
    else {
      fullPath = paths
    }

    const { status, ...other } = await this.categoryService.GetTags(fullPath)

    res.status(status).json({ ...other })
  }

  public GetCategoryTree: RequestHandler = async (req, res) => {

    const { status, ...other } = await this.categoryService.GetCategoryTree()

    res.status(status).json({ ...other })
  }

  public UploadCatalogJson: RequestHandler = async (req, res) => {
    const jsonTree = req.body;

    const { status, ...other } = await this.categoryService.UploadCatalogJson(jsonTree)

    res.status(status).json({ ...other })
  }

    public UploadCatalogJsonMultiple: RequestHandler = async (req, res) => {
    const jsonTree = req.body;

    const { status, ...other } = await this.categoryService.UploadCatalogJsonMultiple(jsonTree)

    res.status(status).json({ ...other })
  }

  public Create: RequestHandler = async (req, res) => {

    const { status, ...other } = await this.categoryService.Create(req.body)

    res.status(status).json({ ...other })
  }

  public Delete: RequestHandler = async (req, res) => {
    const { path } = req.params;

    const { status, ...other } = await this.categoryService.Delete(path)

    res.status(status).json({ ...other })
  }
}

export { CategoryController }