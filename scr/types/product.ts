import mongoose from "mongoose";

interface IContentBlock {
    type: 'imageWithText' | 'paragraph' | 'gallery';
    title: string,
    variant?: 'center' | 'left' | 'right';
    text?: string;
    image?: string;
}

interface IProduct{
name:string,
discription:string,
tags:string[],
category:string,
imgs:{name:string,url:string}[],
price:number,
superTag:"best"|"value"|"popular"|"new",
numberOfProductsSold:number,
similarProductIds:[typeof mongoose.Schema.ObjectId]
comments:{id:typeof mongoose.Schema.ObjectId,text:string,rate:number}[],
blocks?:IContentBlock[],
parameters?:any,
media?:{type:string,url:string}
}

export {IContentBlock,IProduct}