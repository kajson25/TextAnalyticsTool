import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimilarityComponent} from './components/similarity-component/similarity.component';
import { HomeComponent } from './components/home/home.component';
import { ExtractionComponent } from './components/extraction/extraction.component';
import { DetectionComponent } from './components/detection/detection.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    // AppComponent,
    // SimilarityComponent,
    // HomeComponent,
    ExtractionComponent,
    DetectionComponent,
    SentimentComponent
  ],
  // imports: [
  //   BrowserModule,
  //   AppRoutingModule
  // ],
  providers: [],
  imports: [
    BrowserAnimationsModule
  ],
  // bootstrap: [AppComponent]
})
export class AppModule { }
