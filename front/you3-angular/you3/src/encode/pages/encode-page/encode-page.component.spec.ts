import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncodePageComponent } from './encode-page.component';

describe('EncodePageComponent', () => {
  let component: EncodePageComponent;
  let fixture: ComponentFixture<EncodePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncodePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
