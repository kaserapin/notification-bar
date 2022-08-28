import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { Company } from '../../Company';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() company!: Company;
  daysToHardlock!: number;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getDaysToHardlock();
  }

  getDaysToHardlock() {
    const notifications = this.company.notifications;
    const lastNote = notifications.slice(-1)[0];

    const lastNotificationDate =
      this.notificationService.getCorrectDateFormat(lastNote);

    const difference = Math.abs(
      new Date(lastNotificationDate).getTime() - new Date().getTime()
    );
    const formattedDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));

    this.daysToHardlock = formattedDifference;
  }
}
