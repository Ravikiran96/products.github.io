import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList : FormGroup;
    products:any;
    sortT='HightoLow';
    isDesc: boolean = false;
    column: string = 'type';
    sortType2: string;
    sortReverse: boolean = false;
    sortType3: string;
    sortReverse1: boolean = false;
    notscrolly=true;
    notEmptyPost=true;
    sortType4='LowtoHigh';
    itemsToShow:any;
    private noOfItemsToShowInitially: number = 12;
    // itemsToLoad - number of new items to be displayed
    private itemsToLoad: number = 12;
    // No need to call onScroll if full list has already been displayed
    public isFullListDisplayed: boolean = false;

  constructor(private http:HttpClient,private activatedRoute:ActivatedRoute,private router:Router,private formBuilder:FormBuilder,private spinner:NgxSpinnerService) {
    this.activatedRoute.queryParams.subscribe(params => {
      // this.getProducts();
  });
   }

  //for filters in dropdown
  sortType1=[
    {id : 1, type : 'HightoLow' },      
    {id : 2, type : 'LowtoHigh' }
  ]

  ngOnInit() {
    this.productList=this.formBuilder.group({
      list1:['',Validators.required],
    });
    this.getProducts();

    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.spinner.hide();
    }, 2000);
  }

  // Getting Products from json file
  getProducts(){
    this.http.get('assets/products.json').subscribe(data=>{
      console.log(data);
      this.products=data;
      this.itemsToShow = this.products.slice(0, this.noOfItemsToShowInitially);
      this.sortO();
        console.log(this.products);
   }); 
  }

  // Url Parameters displayed based on the selections from filters 
  change(){
    let sortType=this.sortT;
    let queryParams = {
     sortType
   }
  this.sortO();
   this.router.navigate(['list'], { queryParams , queryParamsHandling: 'merge'});
  }

 // Sorting the table based on price From LowtoHigh
  sortOrders(property) {
    this.sortType2 = property;
    this.sortReverse != this.sortReverse ;
    this.itemsToShow.sort(this.dynamicSort(property));
  }
  dynamicSort(property) {
    let sortOrder = -1;
  
    if (this.sortReverse) {
        sortOrder = 1;
    }
      return function (a, b) {
          let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result;
      }
  }

  //Sorting the table based on price from HightoLow
  sortOrdersr(property) {
    this.sortType3 = property;
    this.sortReverse1 != this.sortReverse;
    this.itemsToShow.sort(this.dynamicSortr(property));
  }
  dynamicSortr(property) {
    let sortOrder = -1;
  
    if (this.sortReverse) {
        sortOrder = 1;
    }
      return function (a, b) {
          let result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
          return result;
      }
  }

  //for attaching data to existing table
    onScroll() {
        if (this.noOfItemsToShowInitially <= this.products.length) {
            // Update ending position to select more items from the array
            this.noOfItemsToShowInitially += this.itemsToLoad;
            this.itemsToShow = this.products.slice(0, this.noOfItemsToShowInitially);
         this.sortO();
            // this.products.push(this.itemsToShow);
            console.log(this.itemsToShow);
            console.log("scrolled");
        } else {
            this.isFullListDisplayed = true;
        }
      }

      sortO(){
        if(this.sortT == this.sortType4){
          this.sortOrders('Price');
       }
         else{
          this.sortOrdersr('Price');
        }
      }
}
