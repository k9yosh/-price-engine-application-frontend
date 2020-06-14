import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../service/product.service';
import {PriceService} from '../service/price.service';
import {Product} from '../model/product';
import {OptimalPrice} from '../model/optimal-price';

@Component({
  selector: 'app-price-calc',
  templateUrl: './price-calc.component.html',
  styleUrls: ['./price-calc.component.css']
})
export class PriceCalcComponent implements OnInit {

  selectedProduct: Product;
  selectedUnits = 0;
  selectedCartons = 0;
  products: Product[] = [];
  optimalPrice: OptimalPrice = new OptimalPrice();

  constructor(private router: Router,
              private productService: ProductService,
              private priceService: PriceService) { }

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

  calculatePrice() {

    this.priceService.calculateOptimalPrice(this.selectedProduct.id, this.selectedUnits, this.selectedCartons).subscribe( data => {
      const price = data.body as any;

      this.optimalPrice = new OptimalPrice();
      this.optimalPrice.requestedUnits = price.requestedUnits;
      this.optimalPrice.requestedCartons = price.requestedCartons;
      this.optimalPrice.units = price.units;
      this.optimalPrice.cartons = price.cartons;
      this.optimalPrice.unitPrice = price.unitPrice;
      this.optimalPrice.discount = price.discount;
      this.optimalPrice.finalPrice = price.finalPrice;

    });
  }

  showPriceList() {
    this.router.navigate(['price-list']);
  }
}
