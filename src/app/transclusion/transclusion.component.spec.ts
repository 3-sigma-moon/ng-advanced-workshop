import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransclusionComponent } from './transclusion.component';

describe('TransclusionComponent', () => {
  let component: TransclusionComponent;
  let fixture: ComponentFixture<TransclusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransclusionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
