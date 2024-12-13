import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyCartComponent } from './empty-cart.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';

describe('EmptyCartComponent', () => {
  let component: EmptyCartComponent;
  let fixture: ComponentFixture<EmptyCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyCartComponent],
      providers: [
        provideMockStore({
          initialState: {
            goods: {
              isLoading: false,
              products: [],
              selectedProduct: null,
              cartProducts: [],
            },
          },
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {}, queryParams: {} },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navbar component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navbarElement = compiled.querySelector('app-navbar');
    expect(navbarElement).not.toBeNull();
  });

  it('should render the correct image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const imgElement = compiled.querySelector(
      'img.empty-cart-image'
    ) as HTMLImageElement;
    expect(imgElement).not.toBeNull();
    expect(imgElement?.src).toContain('assets/images/empty-cart.png');
    expect(imgElement?.alt).toBe('empty-cart');
  });

  it('should display the correct title text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('h1.empty-cart-title');
    expect(titleElement).not.toBeNull();
    expect(titleElement?.textContent).toBe('Your cart is empty and sad :(');
  });

  it('should display the correct message text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const messageElement = compiled.querySelector('p.empty-cart-message');
    expect(messageElement).not.toBeNull();
    expect(messageElement?.textContent).toBe('Add something to make it happy!');
  });

  it('should render the "Continue Shopping" button with the correct link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const linkElement = compiled.querySelector(
      'a.continue-shopping-button'
    ) as HTMLAnchorElement;
    expect(linkElement).not.toBeNull();
    expect(linkElement?.textContent).toBe('Continue Shopping');
    expect(linkElement?.href).toContain('/');
  });
});
