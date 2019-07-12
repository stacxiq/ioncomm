import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductPage } from '../product/product';
import { AuthProvider } from '.././services/auth/auth';
import { AuthPage } from '../auth/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from "@ionic/storage";
import { CartPage } from '../cart/cart';
import { Router, ActivatedRoute } from '@angular/router';
import { ExtrasService } from '../extras.service';
@Component({
  selector: 'page-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomePage implements OnInit {
  items: any = [];
  i = 0;
  constructor(public router: Router,
    private db: AngularFireDatabase, 
    private _AuthProvider: AuthProvider,
     private storage: Storage,
              private  _ExtrasService: ExtrasService
     ) {

  }

  ngOnInit(): void {
    this.storage.get("id").then(userid => {
      this.db
        .list(`cart/${userid}`)
        .valueChanges()
        .subscribe(data => {
          console.log(data);
          this.items = data;
          this.i = data.length;
        });
    });
    console.log(this.items);
  }
  buy(item: string) {
    if (this._AuthProvider.isLoggedIn()) {
      //this.app.getRootNav().push(ProductPage,item);
      this.router.navigate(['/product/'],{
            queryParams: {item},
            
      });

    } else {
      this.router.navigate(['/auth']);

      //this.app.getRootNav().push(AuthPage);
      //this.navCtrl.goToRoot;
    }

  }
  gotocart() {
    console.log(this.items);
    console.log(this.i);
    this._ExtrasService.setExtras(this.items);
    this.router.navigate(['/cart/']);

  }

}
