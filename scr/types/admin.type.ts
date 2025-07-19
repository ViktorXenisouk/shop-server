interface Admin {
name:string;
passwordHash:string;
email?:string;
discription?:string;
securityLvl:number;
imgUrl:string;
isMain:boolean;
}

export {Admin}