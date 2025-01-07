export class Product {
  constructor(
    public id: number,
    public code: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public image: string,
    public categoryId: number,
    public categoryName: string,
    public userId: number
  ) {}
}
