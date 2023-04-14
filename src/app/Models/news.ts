export class News{
id:number;
title!:String;
description!:String;
file!:File;
formdata: FormData = new FormData();
image=this.formdata.append('file', this.file);
  imageDataUrl: string;


}
