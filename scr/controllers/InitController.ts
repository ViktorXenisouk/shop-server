import { RequestHandler } from "express";
import Category from "../models/category.model";
import Product from "../models/product.model";
import { faker } from '@faker-js/faker';
import productModel from "../models/product.model";

import { ICategory } from "../types/category.type";

const InitProducts: RequestHandler = async (req, res): Promise<any> => {
  await generateProductsForCategories(5)
  res.json({ m: '' })
}

const generateTags: RequestHandler = async (req, res) => {
  const products = await Product.find()

  products.forEach(async (product, i) => {
    const fullpath = product.category
    const cat = await Category.findOne({ fullPath: fullpath })
    if (cat) {
      cat.filter = cat.filter || {} as Map<string, any>;
      const props : Map<string, any> = new Map()
      props.set('tags',product.tags)
      cat.filter.set(`category${i}`, {variant:'tags-vertical',props:props});

      cat.save()
    }
  })

  res.json({ success: true })
}

function generateProduct(cat:ICategory): any {
  const categoryPath = cat.fullPath
  const productName = faker.commerce.productName() + ' ' + faker.string.uuid().slice(0, 6);
  const url = { url: 'https://res.cloudinary.com/djdxksokm/image/upload/v1753359255/my-pet-project/whooqmb8vkdtsw7dqxrh.png', name: 'some image' }

  return {
    name: productName,
    discription: faker.commerce.productDescription(),
    tags: [],
    category: categoryPath,
    imgs: [url, url, url],
    numberOfProductsSold: faker.number.int({ min: 0, max: 1000 }),
  }
  /*media: [
    { type: 'video', url: faker.internet.url() },
    { type: 'manual', url: faker.internet.url() }
  ]
};*/
}

async function generateProductsForCategories(productsPerCategory = 10) { /// asd
  const categories = await Category.find({ isDeleted: false });
  console.log(`Found ${categories.length} categories`);

  const productsToInsert: any[] = [];

  for (const cat of categories) {
    for (let i = 0; i < productsPerCategory; i++) {
      productsToInsert.push(generateProduct(cat));
    }
  }

  console.log(`Generating ${productsToInsert.length} products...`);
  await Product.insertMany(productsToInsert);
  console.log('✅ Products inserted successfully!');
}

async function GenerateImages(req:any,res:any){
const products = await productModel.find()

products.forEach((item) => {
  item.imgs = [{name:'computer',url:'https://res.cloudinary.com/djdxksokm/image/upload/v1753359255/my-pet-project/whooqmb8vkdtsw7dqxrh.png'}]
  item.save()
})
res.send('good')
}

export { InitProducts, generateTags,GenerateImages }