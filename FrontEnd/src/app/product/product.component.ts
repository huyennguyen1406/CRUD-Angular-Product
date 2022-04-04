import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoryService} from "./service/category.service";
import {ProductService} from "./service/product.service";
import {finalize, Observable} from "rxjs";
import {Category} from "./model/category";
import {Product} from "./model/product";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {
  formProduct!: FormGroup;
  products?: Product[];
  product?: Product;

  categories?: Category[];
  category?: Category;

  search: string = "";

  selectedFile?: File;
  fb: string = "";
  downloadURL?: Observable<string>;

  constructor(private productService: ProductService,
  private categoryService: CategoryService,
  private formGroup: FormBuilder,
  private storage: AngularFireStorage) { }

  onFileSelected($event: Event) {
    var n = Date.now();
    // @ts-ignore
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task.snapshotChanges().pipe(
      finalize(() =>{
        this.downloadURL = fileRef.getDownloadURL();
        // @ts-ignore
        this.downloadURL.subscribe(url => {
          if (url){
            this.fb = url;
          }
          console.log(this.fb);
        })
      })
    )
      .subscribe((url: any) =>{
        if (url){
          console.log(url);
        }
      })

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllProduct();
    console.log("có thay đổi")
  }

  ngOnInit(): void {
    this.formProduct = this.formGroup.group({
      idProduct: [''],
      nameProduct: [''],
      priceProduct: [''],
      imgUrl: [''],
      category: ['']
    });
    this.getAllProduct();
    this.getAllCategory();
  }
  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(data => this.categories = data);
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe(data => this.products = data);
  }

  openCreate() {
    // @ts-ignore
    document.getElementById('formEditProduct').hidden = false;
  }

  createProduct() {
    const product = {
      idProduct: this.formProduct.value.idProduct,
      nameProduct: this.formProduct.value.nameProduct,
      priceProduct: this.formProduct.value.priceProduct,
      imgUrl: this.fb,
      category: {
        idCategory: this.formProduct.value.category
      },
    }
    console.log(product);
    this.productService.createProduct(product).subscribe(() => {
      console.log(product)
      if (product.idProduct == '') {
        alert("Create Successful");
      } else {
        alert("Update Successful")
      }

      this.formProduct.reset();
      // @ts-ignore
      document.getElementById('formEditProduct').hidden = true;
      this.getAllProduct()
    });
  }

  deleteProduct(idProduct: any) {
    if (confirm("Do you want to delete?")) {
      console.log("hello")
      this.productService.deleteProduct(idProduct).subscribe(() => {
          alert("Delete Successful");
          this.getAllProduct();
        }, error => {
          console.log(error)
        }
      );
    } else {
      alert("Thank you")
    }
  }

  editProduct(idProduct: any) {
    // @ts-ignore
    document.getElementById("formEditProduct").hidden = false;
    this.productService.getProductById(idProduct).subscribe((product: { [key: string]: any; }) => this.formProduct.patchValue(product))
  }

  viewDetail(idProduct: any) {
    this.productService.getProductById(idProduct).subscribe((data: Product) => this.products = [data])
  }

  Search() {
    if (this.search == "") {
      this.getAllProduct()
    } else {
      this.productService.getProductByName(this.search).subscribe(data => {
        console.log(data);
        this.products = data;
      })
    }
  }

}
