import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEvenComponent } from './ajout-even.component';

describe('AjoutEvenComponent', () => {
  let component: AjoutEvenComponent;
  let fixture: ComponentFixture<AjoutEvenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutEvenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutEvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
