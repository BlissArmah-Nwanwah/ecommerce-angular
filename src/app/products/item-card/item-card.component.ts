import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductData } from '../../services/product-data';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [MatButtonModule,CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  @Input() public product!: ProductData;
  @Output() public productAction = new EventEmitter<{ type: 'detail' | 'addToCart', data: ProductData }>();

  private emitProductAction(type: 'detail' | 'addToCart'): void {
    this.productAction.emit({ type, data: this.product });
  }

  public onViewDetails(): void {
    this.emitProductAction('detail');
  }

  public onProductSelectedToCart(): void {
    this.emitProductAction('addToCart');
  }


}
