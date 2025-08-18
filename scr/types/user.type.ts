interface IBasket{
    id:string,
    count:number
}

interface IUser {
    username:string,
email:string,
passwordHash:string,
telephone?:string
basketInfo?:IBasket[]
favourite:string[]
isBlocked:boolean
}

export {IUser,IBasket}