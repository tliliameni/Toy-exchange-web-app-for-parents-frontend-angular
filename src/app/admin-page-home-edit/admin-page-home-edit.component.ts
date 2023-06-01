import { Component, OnInit } from '@angular/core';
import { PageHomeService } from '../services/pageHome.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-page-home-edit',
  templateUrl: './admin-page-home-edit.component.html',
  styleUrls: ['./admin-page-home-edit.component.css']
})
export class AdminPageHomeEditComponent implements OnInit{
  image: any;
  imageDataUrl: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private newsService: PageHomeService, private snackBar: MatSnackBar) { }
    ngOnInit(): void {
        
    }

}
