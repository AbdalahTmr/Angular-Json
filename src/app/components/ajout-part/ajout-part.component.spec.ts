import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPartComponent } from './ajout-part.component';

describe('AjoutPartComponent', () => {
  let component: AjoutPartComponent;
  let fixture: ComponentFixture<AjoutPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
