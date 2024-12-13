import { TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { PRODUCT_ACTIONS } from '../products.actions';
import { cartProduct as product } from '../../utils/utils';

describe('CartComponent', () => {
  let component: CartComponent;
  let storeMock: any;
  let routerMock: any;

  beforeEach(() => {
    storeMock = {
      selectSignal: jest.fn(),
      dispatch: jest.fn(),
    };

    routerMock = {
      navigateByUrl: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        CartComponent,
        { provide: Store, useValue: storeMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    component = TestBed.inject(CartComponent);
  });

  it('should initialize cartProducts and totalAmount from the store', () => {
    const cartProductsMock = [{ id: '1', name: 'Product 1' }];
    const totalAmountMock = 1;
    storeMock.selectSignal.mockReturnValueOnce(cartProductsMock);
    storeMock.selectSignal.mockReturnValueOnce(totalAmountMock);

    expect(component.cartProducts).toEqual(cartProductsMock);
    expect(component.totalAmount).toEqual(totalAmountMock);
  });

  it('should dispatch incrementProductCount action on incrementCount', () => {
    const productId = '123';
    component.incrementCount(productId);

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      PRODUCT_ACTIONS.incrementProductCount({ productId })
    );
  });

  it('should dispatch decrementProductCount action on decrementCount', () => {
    const productId = '123';
    storeMock.selectSignal.mockReturnValueOnce([]);
    component.decrementCount(productId);

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      PRODUCT_ACTIONS.decrementProductCount({ productId })
    );
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/empty-cart');
  });

  it('should not navigate to /empty-cart if cartProducts is not empty on decrementCount', () => {
    const productId = '123';
    storeMock.selectSignal.mockReturnValueOnce([{ id: '123' }]);
    component.decrementCount(productId);

    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should dispatch incrementProductCount action on removeProduct', () => {
    component.removeProduct(product);

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      PRODUCT_ACTIONS.incrementProductCount({ productId: product.id })
    );
  });

  it('should navigate to /empty-cart if no products left after removeProduct', () => {
    storeMock.selectSignal.mockReturnValueOnce([]);
    component.removeProduct(product);

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/empty-cart');
  });
});
