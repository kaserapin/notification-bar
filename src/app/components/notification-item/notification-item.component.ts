import { Component, OnInit, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NotificationService } from '../../services/notification.service';
import {
  faCalendar,
  faCircleCheck,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent implements OnInit {
  @Input() notification!: string;
  @Input() firstItem!: boolean;
  @Input() lastItem!: boolean;
  @Input() previousNote!: string;
  @Input() nextNote!: string;
  notificationDate!: Date;
  dateToShow!: string;
  previousNotificationDate!: Date;
  nextNotificationDate!: Date;
  daysBetweenNotefications!: number;
  progressBarwidth!: string;
  iconColor!: string;
  notificationOver!: boolean;
  faCalendar = faCalendar;
  faCircleCheck = faCircleCheck;
  faCircleInfo = faCircleInfo;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getNotificationDateInDateFormat();
    this.getPreviousNotificationDateInDateFormat();
    this.getNextNotificationDateInDateFormat();
    this.getDatetoShow();
    this.getIconColor();
    this.isOver();
    this.getDaysToNotification();
    this.getProgressBarWidth();
  }

  isOver(): void {
    this.notificationOver = new Date() > new Date(this.notificationDate);
  }

  getProgressBarWidth(): void {
    if (
      this.notificationOver &&
      new Date(this.nextNotificationDate) > new Date()
    ) {
      const daysUntilNextNote = Math.ceil(
        (new Date(this.nextNotificationDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      );

      const daysBetweenThisAndNextNote = Math.ceil(
        (new Date(this.nextNotificationDate).getTime() -
          new Date(this.notificationDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      const difference = daysBetweenThisAndNextNote - daysUntilNextNote;

      this.progressBarwidth = `${Math.round(
        (difference / daysBetweenThisAndNextNote) * 100
      )}%`;
    } else if (
      this.notificationOver &&
      new Date(this.nextNotificationDate) < new Date()
    ) {
      this.progressBarwidth = '100%';
    } else {
      this.progressBarwidth = '0%';
    }
  }

  getDaysToNotification(): void {
    const difference =
      new Date(this.nextNotificationDate).getTime() -
      new Date(this.notificationDate).getTime();

    const formattedDifference = difference / (1000 * 60 * 60 * 24);

    this.daysBetweenNotefications = formattedDifference;
  }

  getIcon(): IconProp {
    return new Date() > new Date(this.notificationDate)
      ? this.faCircleCheck
      : this.faCalendar;
  }

  getIconColor(): void {
    this.iconColor =
      new Date(this.notificationDate) > new Date() ? '#aaa' : 'darkblue';
  }

  getDatetoShow(): void {
    this.dateToShow = this.notification.split('/').join('.');
  }

  getNextNotificationDateInDateFormat(): void {
    if (this.nextNote === undefined || this.nextNote === null) {
      return;
    }

    this.nextNotificationDate = this.notificationService.getCorrectDateFormat(
      this.nextNote
    );
  }

  getPreviousNotificationDateInDateFormat(): void {
    if (this.previousNote === undefined || this.previousNote === null) {
      return;
    }

    this.previousNotificationDate =
      this.notificationService.getCorrectDateFormat(this.previousNote);
  }

  getNotificationDateInDateFormat(): void {
    if (this.notification === undefined || this.notification === null) {
      return;
    }
    this.notificationDate = this.notificationService.getCorrectDateFormat(
      this.notification
    );
  }
}
