export class User{
  id:number;
  username:String;
  email:String;
  password:String;
  createdAt: Date;
  roles: Role[];
}

interface Role {
  id: number;
  name: string;
}
