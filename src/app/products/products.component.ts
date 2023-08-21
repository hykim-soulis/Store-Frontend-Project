import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor() {}

  public category = 'All';

  ngOnInit(): void {}

  updateProductList(event: string) {
    this.category = event;
  }

  onCloseModal() {
    const modalDiv = document.getElementById('addToCartModal');
    if (modalDiv) modalDiv.style.display = 'none';
    console.log(modalDiv);
  }
}
