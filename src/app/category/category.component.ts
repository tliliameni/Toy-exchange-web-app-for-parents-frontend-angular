import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CategoryService } from '../services/category.service';
import { Category } from '../Models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  CategoriesList: Category[] = [];

  searchQuery: string = '';
  p: number = 1;
 id:number;
  constructor(
    private CategoriesService: CategoryService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private sanitizer: DomSanitizer // Inject the DomSanitizer service
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.CategoriesService.getAllCategories()
      .subscribe(
        data => {
          this.CategoriesList = data;

          for (let cat of this.CategoriesList) {
            this.CategoriesService.getImage(cat.id)
              .subscribe(
                image => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    cat.imagedataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          }
        },
        error => console.log(error)
      );
  }



  editCategories(id: number) {
    this.router.navigate(['/admin/editcategory', id]);
  }
  searchCategories(): void {
    this.CategoriesService.getAllCategoriesByMc(this.searchQuery)
      .subscribe(
        data => {
          this.CategoriesList = data;
        },
        error => console.log(error)
      );
  }

  openConfirmationDialog(value: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.CategoriesService.deleteCategory(value).subscribe(() => {
          this.snackBar.open('Categories deleted!', 'Dismiss', { duration: 3000 });
          location.reload(); // Refresh the page
        }, (error)=> console.log(error));

      }
    });
  }



}
