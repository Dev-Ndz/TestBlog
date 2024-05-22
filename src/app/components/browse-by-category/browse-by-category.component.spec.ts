import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseByCategoryComponent } from './browse-by-category.component';

describe('BrowseByCategoryComponent', () => {
  let component: BrowseByCategoryComponent;
  let fixture: ComponentFixture<BrowseByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseByCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
