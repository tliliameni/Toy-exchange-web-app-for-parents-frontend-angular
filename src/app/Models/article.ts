import { User } from "./User";
import { Category } from "./category";

export class Article {
  id: number;
 title!:string;
 description!:string;
 exchange!:string;
 price!:String;
 image:File;
 user: User;
 imagedataUrl:String;
category:  Category ;
}
