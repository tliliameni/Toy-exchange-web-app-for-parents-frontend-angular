import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../Models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private CategoriesService: CategoryService) { }


  CategoriesList: Category[] = [];

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


}
