import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sentiment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent {
  text: string = '';
  selectedLang: string = 'auto';
  sentimentScore: number | null = null;
  detectedLang: string = '';
  errorMessage: string = '';
  apiKey: string = '929931ca479c4ad0b6375b2c6c78fcd8';

  constructor(private http: HttpClient) {}

  analyzeSentiment() {
    if (this.selectedLang === 'auto') {
      this.detectLanguage().then((detectedLang) => {
          this.detectedLang = detectedLang;
          this.performSentimentAnalysis(detectedLang);
      }).catch((error) => {
        console.error('Error detecting language', error);
        this.errorMessage = 'Error detecting language.';
        this.sentimentScore = null;
      });
    } else {
      this.performSentimentAnalysis(this.selectedLang);
    }
  }

  async detectLanguage(): Promise<string> {
    const url = `https://api.dandelion.eu/datatxt/li/v1`;
    const params = {
      text: this.text,
      token: this.apiKey
    };

    return this.http.get<any>(url, { params }).toPromise().then((response) => {
      if (response.detectedLangs && response.detectedLangs.length > 0) {
        const mostLikelyLang = response.detectedLangs.reduce((prev: any, curr: any) => {
          return curr.confidence > prev.confidence ? curr : prev;
        });

        console.log(response)
        console.log(mostLikelyLang.lang)
        return mostLikelyLang.lang;
      } else {
        throw new Error('No language detected');
      }
    });
  }

  performSentimentAnalysis(language: string) {
    const url = `https://api.dandelion.eu/datatxt/sent/v1`;
    const params: any = {
      text: this.text,
      token: this.apiKey,
      lang: language
    };

    console.log(params)

    this.http.get<any>(url, { params }).subscribe(
      (response) => {
        console.log(response)
        this.sentimentScore = response.sentiment.score;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error fetching sentiment analysis', error);
        this.errorMessage = 'Error fetching sentiment analysis.';
        this.sentimentScore = null;
      }
    );
  }

  getSentimentGradient(): string {
    if (this.sentimentScore === null) {
      return '';
    }

    const score = this.sentimentScore;

    // Map score (-1 to 1) to red (negative), brown (neutral), green (positive) gradient
    const red = score <= 0 ? 255 : Math.floor(255 - score * 255);
    const green = score >= 0 ? 255 : Math.floor(255 + score * 255);
    const blue = 0;  // Keep blue constant for a smooth transition

    return `rgb(${red}, ${green}, ${blue})`;
  }
}
