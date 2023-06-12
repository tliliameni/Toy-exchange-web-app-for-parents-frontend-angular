import { Component, OnInit } from '@angular/core';
import { HomePage } from '../Models/HomePage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PageHomeService } from '../services/pageHome.service';

@Component({
  selector: 'app-admin-page-home',
  templateUrl: './admin-page-home.component.html',
  styleUrls: ['./admin-page-home.component.css']
})
export class AdminPageHomeComponent implements OnInit {
  newsId: number;
  editForm: FormGroup;

  imageURL: string;
 Contact:HomePage;
  List:  any = [];

  constructor(private newsService: PageHomeService,public dialog: MatDialog, private formBuilder: FormBuilder,
   private snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      photo: ['', Validators.required]
    })

this.getAll();
    this.newsService.getHomePageById(1).subscribe(data => {
      console.log(data)
      console.log(data.photo)
      this.Contact = data;
      this.editForm.patchValue(this.Contact);
    });
    this.newsService.getHomePageById(2).subscribe(data => {
      console.log(data)
      console.log(data.photo)
      this.Contact = data;

    });
    this.newsService.getHomePageById(3).subscribe(data => {
      console.log(data)
      console.log(data.photo)
      this.Contact = data;

    });


  }
  viewmore() {
    this.router.navigate(['/home']);
  }
  edit(id: number) {
    this.router.navigate(['/admin/editHome', id]);
  }
  getAll(): void {
    this.newsService.getAll()
      .subscribe(
        data => {
          this.List = data;
          for (let i of this.List) {
            this.newsService.getImage(i.id)
              .subscribe(
                image => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    i.imageDataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          }
        },
        error => console.log(error)
      );
  }


  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editForm.get('photo').setValue(file);
    }

  }
 
}


