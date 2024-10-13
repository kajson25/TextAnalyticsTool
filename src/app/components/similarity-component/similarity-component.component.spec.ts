import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarityComponentComponent } from './similarity-component.component';

describe('SimilarityComponentComponent', () => {
  let component: SimilarityComponentComponent;
  let fixture: ComponentFixture<SimilarityComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimilarityComponentComponent]
    });
    fixture = TestBed.createComponent(SimilarityComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
