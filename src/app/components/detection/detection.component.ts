import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenService } from 'src/app/services/token.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-detection',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './detection.component.html',
  styleUrls: ['./detection.component.css']
})
export class DetectionComponent implements OnInit {
  text: string = '';
  clean: boolean = false;
  detectedLanguages: { lang: string, confidence: number }[] = [];
  apiKey: string = '';
  tokenMissing: boolean = false;

  constructor(private http: HttpClient, private tokenService: TokenService, private logger: LoggerService) {}

  ngOnInit(): void {
    if (!this.tokenService.isTokenAvailable()) {
      this.tokenMissing = true;
    }
  }

  detectLanguage() {
    if (this.clean) {
      this.text = this.cleanText(this.text);
    }

    this.apiKey = this.tokenService.getToken() || '';
    const url = `https://api.dandelion.eu/datatxt/li/v1`;

    const params: any = {
      text: this.text,
      token: this.apiKey
    };

    this.logger.log(url + params.text);

    this.http.get<any>(url, { params }).subscribe(
      (response) => {
        this.detectedLanguages = response.detectedLangs.map((langData: any) => ({
          lang: langData.lang,
          confidence: langData.confidence * 100
        }));
      },
      (error) => {
        console.error('Error detecting language', error);
        this.detectedLanguages = [];
      }
    );
  }

  cleanText(text: string): string {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const urlRegex = /https?:\/\/[^\s]+/g;
    const hashtagRegex = /#[\w]+/g;

    text = text.replace(emailRegex, '');
    text = text.replace(urlRegex, '');
    text = text.replace(hashtagRegex, '');

    return text.trim();
  }
}
