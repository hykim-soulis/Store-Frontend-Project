import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-modal',
  templateUrl: './add-to-cart-modal.component.html',
  styleUrls: ['./add-to-cart-modal.component.css'],
})
export class AddToCartModalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  openModal() {
    const modalDiv = document.getElementById('addToCartModal');
    if (modalDiv) modalDiv.classList.add('show');
  }

  closeModal() {
    const modalDiv = document.getElementById('addToCartModal');
    if (modalDiv) modalDiv.classList.remove('show');
  }
}
