import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatedraticoComponent } from './catedratico.component';

describe('CatedraticoComponent', () => {
  let component: CatedraticoComponent;
  let fixture: ComponentFixture<CatedraticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatedraticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatedraticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
