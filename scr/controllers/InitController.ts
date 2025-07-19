import { RequestHandler } from "express";
import Category from "../models/category.model";
import Product from "../models/product.model";
import { faker } from '@faker-js/faker';

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
      cat.tags = cat.tags || {} as Map<string, any>;
      cat.tags.set(`category${i}`, {tags:product.tags,type:'horizontal'});

      cat.save()
    }
  })

  res.json({ success: true })
}

function generateProduct(categoryPath: string): any {
  const productName = faker.commerce.productName() + ' ' + faker.string.uuid().slice(0, 6);
  const url = { url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', name: 'some image' }

  return {
    name: productName,
    discription: faker.commerce.productDescription(),
    tags: [faker.commerce.productAdjective(), faker.commerce.department()],
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

async function generateProductsForCategories(productsPerCategory = 10) {
  const categories = await Category.find({ isDeleted: false });
  console.log(`Found ${categories.length} categories`);

  const productsToInsert: any[] = [];

  for (const cat of categories) {
    for (let i = 0; i < productsPerCategory; i++) {
      productsToInsert.push(generateProduct(cat.fullPath));
    }
  }

  console.log(`Generating ${productsToInsert.length} products...`);
  await Product.insertMany(productsToInsert);
  console.log('✅ Products inserted successfully!');
}

export { InitProducts, generateTags }