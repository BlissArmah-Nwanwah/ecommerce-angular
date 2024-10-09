import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateproductmodalComponent } from './createproductmodal.component';

describe('CreateproductmodalComponent', () => {
  let component: CreateproductmodalComponent;
  let fixture: ComponentFixture<CreateproductmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateproductmodalComponent]
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(CreateproductmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
