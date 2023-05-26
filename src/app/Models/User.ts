export class User{
  id:number;
  username:String;
  email:String;
  password:String;
  createdAt: Date;
  roles: Role[];
  //file:File;
  photo:File;
  imagedataUrl:String;
  phoneNumber:string;
}

interface Role {
  id: number;
  name: string;
}
