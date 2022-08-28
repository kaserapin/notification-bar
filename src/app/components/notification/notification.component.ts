import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { Company } from '../../Company';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() company!: Company;

  constructor() {}

  ngOnInit(): void {}
}
