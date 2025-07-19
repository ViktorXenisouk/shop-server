import * as AdminValidations from "./admin-validations";
import * as CatalogValidations from "./category-validations";
import * as ProductValidations from "./product.validations"
import * as UserValidations from "./user.validations"
import * as ImageValidations from "./image.validations"
import { idValidation } from "../middleware/public-validations"

export {
    AdminValidations,
    CatalogValidations,
    ProductValidations,
    UserValidations,
    ImageValidations,
    idValidation
}