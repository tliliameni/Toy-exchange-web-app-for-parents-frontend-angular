import { Component, OnInit } from '@angular/core';
import { PageHomeService } from '../services/pageHome.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HomePage } from '../Models/HomePage';

@Component({
  selector: 'app-admin-page-home-edit',
  templateUrl: './admin-page-home-edit.component.html',
  styleUrls: ['./admin-page-home-edit.component.css']
})
export class AdminPageHomeEditComponent implements OnInit {
  newsId: number;
  editForm: FormGroup;

  imageURL: string;
 Contact:HomePage;
  List:  any = [];

  constructor(private newsService: PageHomeService,private route: ActivatedRoute,public dialog: MatDialog, private formBuilder: FormBuilder,
   private snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      photo: ['', Validators.required]
    })

    this.newsId = +this.route.snapshot.paramMap.get('id');
    this.newsService.getHomePageById(this.newsId).subscribe(data => {
      console.log(data)
      console.log(data.photo)
      this.Contact = data;
      this.editForm.patchValue(this.Contact);
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
  onSubmit(): void {
    const id = this.newsId;
    const photo = this.editForm.get('photo').value;
    const title = this.editForm.get('title').value;
    const subtitle = this.editForm.get('subtitle').value;
    const description = this.editForm.get('description').value;
    const formData = new FormData();
    formData.append('photo', this.editForm.get('photo').value);
    formData.append('title', this.editForm.get('title').value);
    formData.append('description', this.editForm.get('description').value);

    this.newsService.updateHomePage(id, photo, title, subtitle, description)
      .subscribe(
        () => {
          console.log('Page Home section 1 updated successfully!');
          this.snackBar.open('Page Home section updated successfully!', 'Dismiss', { duration: 3000 });
        },
        (error) => {
          console.error('Failed to update Page Home section', error);
          // Handle the error
          this.snackBar.open('Failed to update Page Home section', 'Dismiss', { duration: 3000 });
        }
      );
  }


}


