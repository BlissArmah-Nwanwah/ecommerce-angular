import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCardComponent } from './item-card.component';
import { MatButtonModule } from '@angular/material/button';
import { cartProduct } from '../../utils/utils';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;

  const mockProduct = cartProduct;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, ItemCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit "detail" action when onViewDetails is called', () => {
    const productActionSpy = jest.spyOn(component.productAction, 'emit');

    component.onViewDetails();

    expect(productActionSpy).toHaveBeenCalledWith({
      type: 'detail',
      data: mockProduct,
    });
  });

  it('should emit "addToCart" action when onProductSelectedToCart is called', () => {
    const productActionSpy = jest.spyOn(component.productAction, 'emit');

    component.onProductSelectedToCart();

    expect(productActionSpy).toHaveBeenCalledWith({
      type: 'addToCart',
      data: mockProduct,
    });
  });
});
