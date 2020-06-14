import { Component, OnInit } from '@angular/core';
import {ProductService} from '../service/product.service';
import {Router} from '@angular/router';
import {Product} from '../model/product';
import {PriceService} from '../service/price.service';
import {OptimalPrice} from '../model/optimal-price';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  selectedProduct: Product;
  products: Product[] = [];
  optimalPrices: OptimalPrice[] = [];

  constructor(private router: Router,
              private productService: ProductService,
              private priceService: PriceService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(data => {
      const products = data.body as any;

      products.forEach(item => {
        const product: Product = new Product();
        product.id = item.id;
        product.name = item.name;

        this.products.push(item);
      });

    });
  }

  calculatePrices(product: Product, quantity: number) {

    this.optimalPrices = [];

    this.priceService.calculateOptimalPricesByProductQuantity(product.id, quantity).subscribe( data => {
      const pricesList = data.body as any;

      pricesList.forEach(price => {
        const optimalPrice: OptimalPrice = new OptimalPrice();
        optimalPrice.requestedUnits = price.requestedUnits;
        optimalPrice.requestedCartons = price.requestedCartons;
        optimalPrice.units = price.units;
        optimalPrice.cartons = price.cartons;
        optimalPrice.unitPrice = price.unitPrice;
        optimalPrice.discount = price.discount;
        optimalPrice.finalPrice = price.finalPrice;

        this.optimalPrices.push(optimalPrice);
      });

    });
  }

  showPriceCalc() {
    this.router.navigate(['price-calc']);
  }

}
