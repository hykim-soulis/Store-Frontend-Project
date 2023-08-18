import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-modal',
  templateUrl: './add-to-cart-modal.component.html',
  styleUrls: ['./add-to-cart-modal.component.css'],
})
export class AddToCartModalComponent implements OnInit {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  openModal() {}

  onCloseModal() {
    this.close.emit();
  }
}
