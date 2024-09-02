import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NavbarComponent, MatButtonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {}
