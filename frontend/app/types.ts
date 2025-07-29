export interface IMenu {
    id : number,
    uuid : string,
    name : string,
    price : number,
    picture : string,
    description : string,
    category : string,
    createdAt : string,
    updatedAt : string
 }
 

export interface IUser {
   id : number,
   uuid : string,
   name : string,
   email : string,
   password : string,
   profile_picture : string,
   role : string,
   createdAt : string,
   updatedAt : string
}

export interface IOrder {
   orderLists: any;
   id: number;
   uuid: string;
   customer: string;
   table_number: string;
   total_price: number;
   payment_method: string;
   status: string;
   createdAt: string;
   updatedAt: string;
   userId: number;
}


export interface IOrderList {
   id: number;
   uuid: string;
   quantity: number;
   note: string;   
   createdAt: string;
   updatedAt: string;
   menuId?: number;
   orderId?: number; 
}
