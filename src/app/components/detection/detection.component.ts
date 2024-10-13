import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detection',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './detection.component.html',
  styleUrls: ['./detection.component.css']
})
export class DetectionComponent {
  text: string = '';
  clean: boolean = false;
  detectedLanguages: { lang: string, confidence: number }[] = [];
  apiKey: string = '929931ca479c4ad0b6375b2c6c78fcd8';

  constructor(private http: HttpClient) {}

  // Method to detect language via Dandelion API
  detectLanguage() {
    const url = `https://api.dandelion.eu/datatxt/li/v1`;

    // Set up the parameters
    const params: any = {
      text: this.text,
      token: this.apiKey
    };

    // Add the 'clean' parameter if the checkbox is checked
    if (this.clean) {
      params.clean = true;
    }

    // Make the API call
    this.http.get<any>(url, { params }).subscribe(
      (response) => {
        // Assuming response is a list of languages with confidence scores
        this.detectedLanguages = response.detectedLangs.map((langData: any) => ({
          lang: langData.lang,
          confidence: langData.confidence * 100  // Convert confidence to percentage
        }));
      },
      (error) => {
        console.error('Error detecting language', error);
        this.detectedLanguages = [];
      }
    );
  }
}
