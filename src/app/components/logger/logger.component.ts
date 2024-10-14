import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-logger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent {

  constructor(private loggerService: LoggerService){}

  showLogs(): string[] {
    return this.loggerService.allLogs()
  }

}
