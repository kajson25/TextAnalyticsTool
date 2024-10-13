import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimilarityComponentComponent } from './components/similarity-component/similarity-component.component';
import { HomeComponent } from './components/home/home.component';
import { ExtractionComponent } from './components/extraction/extraction.component';
import { DetectionComponent } from './components/detection/detection.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';

@NgModule({
  declarations: [
    // AppComponent,
    SimilarityComponentComponent,
    HomeComponent,
    ExtractionComponent,
    DetectionComponent,
    SentimentComponent
  ],
  // imports: [
  //   BrowserModule,
  //   AppRoutingModule
  // ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule { }
