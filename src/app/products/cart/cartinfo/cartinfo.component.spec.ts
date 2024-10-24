import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartinfoComponent } from './cartinfo.component';

describe('CartinfoComponent', () => {
  let component: CartinfoComponent;
  let fixture: ComponentFixture<CartinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartinfoComponent]
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(CartinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
