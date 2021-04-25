import { Component, OnInit } from '@angular/core';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public stockList = []



  // for bar chart
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];

  // pie chart
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  constructor(private _productService: ProductsService) { 
    this.getAllProducts()
  }

  

  ngOnInit(): void {
  }

  public getAllProducts() {

    this._productService.getProducts(environment.urls.getAllProducts).subscribe((response) => {
      var productsList = response
      productsList.forEach((product)=>{
        this.stockList.push({
          Name : product.productName,
          Stock: product.stock
        })

        this.barChartLabels.push(product.productName)
        this.pieChartLabels.push(product.productName)
        this.barChartData[0]['data'].push(product.stock)
        this.pieChartData.push(product.stock)

      })


    }, error => {

    })

  }

}
