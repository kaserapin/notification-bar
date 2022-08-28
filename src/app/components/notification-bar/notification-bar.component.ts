import { Component, OnInit } from '@angular/core';
import { Company } from '../../Company';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss'],
})
export class NotificationBarComponent implements OnInit {
  companies: Company[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService
      .getCompanies()
      .subscribe((companies) => (this.companies = companies));
  }
}
