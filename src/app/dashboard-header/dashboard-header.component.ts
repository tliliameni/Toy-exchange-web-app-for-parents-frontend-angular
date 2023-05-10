import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
declare var $: any;
@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})


export class DashboardHeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};
  public showSearch = false;
  isLoggedIn=false;
  username: String;

  constructor(private modalService: NgbModal,private authService: AuthService,private storageService: StorageService) {
  }

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();

      this.username = user.username;
    }
  }

logout(): void {
  this.authService.logout().subscribe({
    next: res => {
      console.log(res);
      this.storageService.clean();
      window.location.reload();

    },
    error: err => {
      console.log(err);
    }
  });
}
}
