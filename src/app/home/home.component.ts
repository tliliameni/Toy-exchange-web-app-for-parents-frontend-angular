import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../Models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private categoryService: CategoryService) { }

  categories: Array<Category>;
  images = ['../../assets/images/playtherapy-removebg-preview.png', '../../assets/images/age +6.webp', '../../assets/images/specialneeds.png', '../../assets/images/babyavatar.png', '../../assets/images/littlegirl.png', '../../assets/images/littleboy.jpg'];

  getCategories() {
    this.categoryService.getAllCategories().subscribe(data => this.categories = data);
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
