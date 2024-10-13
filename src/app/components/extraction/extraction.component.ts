import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-extraction',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './extraction.component.html',
  styleUrls: ['./extraction.component.css']
})
export class ExtractionComponent {
  text: string = '';
  minConfidence: number = 0.5;
  includeOptions: { image: boolean; abstract: boolean; categories: boolean } = {
    image: false,
    abstract: false,
    categories: false
  };  // Object for checkboxes
  extractedEntities: any[] = [];  // To hold the result from the API
  apiKey: string = '929931ca479c4ad0b6375b2c6c78fcd8';  // Replace with your Dandelion API key

  constructor(private http: HttpClient) {}

  // Method to send entity extraction request to Dandelion API
  extractEntities() {
    const url = `https://api.dandelion.eu/datatxt/nex/v1`;
    
    // Prepare the 'include' parameter based on checked options
    let includeParams = [];
    if (this.includeOptions.image) includeParams.push('image');
    if (this.includeOptions.abstract) includeParams.push('abstract');
    if (this.includeOptions.categories) includeParams.push('categories');

    const params: any = {
      text: this.text,
      token: this.apiKey,
      min_confidence: this.minConfidence
    };

    // Add 'include' parameter if any options are selected
    if (includeParams.length > 0) {
      params.include = includeParams.join(',');
    }

    // Make the API call
    this.http.get<any>(url, { params }).subscribe(
      (response) => {
        // Handle the API response, store the entities
        this.extractedEntities = response.annotations;  // Assuming 'annotations' contains the entity data
      },
      (error) => {
        console.error('Error extracting entities', error);
        this.extractedEntities = [];
      }
    );
  }

  isAnyIncludeSelected() {
    return this.includeOptions.image || this.includeOptions.abstract || this.includeOptions.categories;
  }
}
