import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // For ngModel
import { CommonModule } from '@angular/common';  // For *ngIf and other common directives

@Component({
  selector: 'app-sentiment',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Import FormsModule and CommonModule
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent {
  text: string = '';  // Holds the input text from the textarea
  selectedLang: string = 'auto';  // Default language option is 'auto'
  sentimentScore: number | null = null;  // Holds the sentiment score (-1 to 1)
  detectedLang: string = '';  // Holds the detected language for auto detection
  errorMessage: string = '';  // Holds error messages for unsupported languages
  apiKey: string = '929931ca479c4ad0b6375b2c6c78fcd8';  // Replace with your Dandelion API key

  constructor(private http: HttpClient) {}

  // Method to detect language first and then perform sentiment analysis
  analyzeSentiment() {
    if (this.selectedLang === 'auto') {
      this.detectLanguage().then((detectedLang) => {
        // if (detectedLang === 'en' || detectedLang === 'it') {
          this.detectedLang = detectedLang;
          this.performSentimentAnalysis(detectedLang);
        // } else {
        //   this.errorMessage = `Language '${detectedLang}' is not supported for sentiment analysis.`;
        //   this.sentimentScore = null;
        // }
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

  // Method to perform sentiment analysis via Dandelion API
  performSentimentAnalysis(language: string) {
    const url = `https://api.dandelion.eu/datatxt/sent/v1`;
    const params: any = {
      text: this.text,
      token: this.apiKey,
      lang: language
    };

    console.log(params)

    // Make the API call
    this.http.get<any>(url, { params }).subscribe(
      (response) => {
        console.log(response)
        this.sentimentScore = response.sentiment.score;
        this.errorMessage = '';  // Clear error message if any
      },
      (error) => {
        console.error('Error fetching sentiment analysis', error);
        this.errorMessage = 'Error fetching sentiment analysis.';
        this.sentimentScore = null;
      }
    );
  }

  // Method to calculate gradient color based on sentiment score
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
