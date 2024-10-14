import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenService } from 'src/app/services/token.service';

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
  };
  extractedEntities: any[] = [];
  apiKey: string = '';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  extractEntities() {
    this.apiKey = this.tokenService.getToken() || '';
    const url = `https://api.dandelion.eu/datatxt/nex/v1`;
    
    let includeParams = [];
    if (this.includeOptions.image) includeParams.push('image');
    if (this.includeOptions.abstract) includeParams.push('abstract');
    if (this.includeOptions.categories) includeParams.push('categories');

    const params: any = {
      text: this.text,
      token: this.apiKey,
      min_confidence: this.minConfidence
    };

    if (includeParams.length > 0) {
      params.include = includeParams.join(',');
    }

    this.http.get<any>(url, { params }).subscribe(
      (response) => {
        this.extractedEntities = response.annotations; 
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
