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
  @Input() product!: ProductData;
  @Output() productSelectDetail = new EventEmitter<ProductData>();
  @Output() productAddToCart = new EventEmitter<ProductData>();

  constructor() {}

  onViewDetails(): void {
    this.productSelectDetail.emit(this.product);
  }

  onProductSelectedToCart(): void {
    this.productAddToCart.emit(this.product);
  }
}
