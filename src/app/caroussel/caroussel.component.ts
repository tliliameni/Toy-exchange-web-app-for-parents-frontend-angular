import { Component, OnInit } from '@angular/core';
import { map, filter, take, switchMap } from 'rxjs';
import { LazyLoadScriptService } from '../lazy-load-script-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-carousel',
  templateUrl: './caroussel.component.html',
  styleUrls: ['./caroussel.component.css']
})
export class CarouselComponent  implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
