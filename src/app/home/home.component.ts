import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../Models/category';
import { PageHomeService } from '../services/pageHome.service';
import { HomePage } from '../Models/HomePage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private CategoriesService: CategoryService,private homePageservice: PageHomeService) { }

homePage1: HomePage;
homePage2:HomePage;
homePage3:HomePage;
  CategoriesList: Category[] = [];

  ngOnInit(): void {
    this.getCategories();
    this.getSection1();
    this.getSection2();
    this.getSection3();
  }
  getSection1(): void {
    this.homePageservice.getHomePageById(1)
      .subscribe(
        data => {
          this.homePage1 = data;
            this.homePageservice.getImage(1)
              .subscribe(
                image => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    this.homePage1.imagedataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          },)}

   getSection2(): void {
            this.homePageservice.getHomePageById(2)
              .subscribe(
                data => {
                  this.homePage2 = data;
                    this.homePageservice.getImage(this.homePage2.id)
                      .subscribe(
                        image => {
                          const reader = new FileReader();
                          reader.readAsDataURL(image);
                          reader.onload = () => {
                            this.homePage2.imagedataUrl = reader.result as string;
                          };
                        },
                        error => console.log(error)
                      );
      },)}
      getSection3(): void {
        this.homePageservice.getHomePageById(3)
          .subscribe(
            data => {
              this.homePage3= data;
                this.homePageservice.getImage(this.homePage3.id)
                  .subscribe(
                    image => {
                      const reader = new FileReader();
                      reader.readAsDataURL(image);
                      reader.onload = () => {
                        this.homePage3.imagedataUrl = reader.result as string;
                      };
                    },
                    error => console.log(error)
                  );
  },)}

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
