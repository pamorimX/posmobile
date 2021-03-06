import {Component} from "@angular/core";
import {LoadingController, NavController} from "ionic-angular";
import {DBManager} from "../../providers/db-manager";

import {PessoaCreatePage} from "./create";
import {PessoaDetailsPage} from "./details";
import {Pessoa} from "../../classes/Pessoa";

/**
 * Generated class for the Pessoas page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-pessoas',
  templateUrl: 'list.html',
})
export class PessoaListPage {

  public pessoas:Pessoa[];

  constructor(public navCtrl: NavController, public dbManager: DBManager, public loadingCtrl: LoadingController) {}

  ionViewDidEnter() {
    let callback = db => {
      let loader = this.loadingCtrl.create({
        content: "Obtendo dados dos contatos..."
      });

      loader.present();

      let transaction = db.transaction("pessoas", "readwrite").objectStore("pessoas");
      let op = transaction.getAll();

      let setPessoas = (pessoas) => {
        this.pessoas = pessoas;
      };

      op.onerror = function (event) {
        alert(op.error);
        loader.dismiss();
      };

      op.onsuccess = function (event) {
        setPessoas(op.result);
        loader.dismiss();
      };
    };

    this.dbManager.run(callback)
  }

  goToNovo() {
    this.navCtrl.push(PessoaCreatePage);
  }

  showPessoaDetails(pessoa:Pessoa) {
    this.navCtrl.push(PessoaDetailsPage, pessoa);
  }
}
