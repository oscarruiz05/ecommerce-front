import { Injectable } from '@angular/core';
import { ItemCart } from '@app/common/item-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: Map<number, ItemCart> = new Map<number, ItemCart>();

  itemList: ItemCart[] = [];

  constructor() { }

  addItemCart(item: ItemCart): void {
    console.log('add', item)
    // if (this.items.has(item.productId)) {
    //   const itemCart = this.items.get(item.productId);
    //   if (itemCart) {
    //     itemCart.quantity += item.quantity;
    //     this.items.set(item.productId, itemCart);
    //   }
    // } else {
    // }
    this.items.set(item.productId, item);
  }

  removeItemCart(productId: number): void {
    this.items.delete(productId);
  }

  totalCart(): number {
    return this.itemList.reduce((total, item) => total + item.getTotalPriceItem(), 0);
  }

  converToListFromMap(): ItemCart[] {
    return Array.from(this.items.values());
  }
}
