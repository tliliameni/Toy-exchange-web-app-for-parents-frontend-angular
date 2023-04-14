import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  CategoriesList: any = [];

  searchQuery: string = '';
  p: number = 1;

  constructor(
    private CategoriesService: CategoryService,
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



        },
        error => console.log(error)
      );
  }

  editCategories(id: number) {
    this.router.navigate(['/admin/editCategory', id]);
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

  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        this.CategoriesService.deleteCategories(id).subscribe(() => {
          this.snackBar.open('Categories deleted!', 'Dismiss', { duration: 3000 });
          location.reload(); // Refresh the page
        }, (error)=> console.log(error));

      }
    });
  }



}
