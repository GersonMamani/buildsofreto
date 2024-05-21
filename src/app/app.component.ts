import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private service: AppService) {}
  title = 'gersonbsoft';
  public monedas_list: any[] = [];
  public tipos_list: any[] = [];
  public moneda1: string = 'USD';
  public moneda2: string = 'PEN';
  public monto: number = 0;
  public resultado: number = 0;
  public most3: any = 0;
  public usuarioFormGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.listar_monedas();
    this.listar_tipos();
    this.listarcompra_venta();
  }

  listarcompra_venta(): void {
    this.service
      .listarCompraVenta()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  listar_monedas(): void {
    if (localStorage.getItem('monedas') === null) {
      this.service
        .listarMonedas()
        .then((data) => {
          for (const key in data) {
            const value = data[key];
            const newObject = { code: key, value };
            this.monedas_list.push(newObject);
          }

          localStorage.setItem('monedas', JSON.stringify(this.monedas_list));
        })
        .catch((error) => {
          console.error('Error al consumir el archivo JSON:', error);
        });
    } else {
      this.monedas_list = JSON.parse(localStorage.getItem('monedas') || '{}');
    }
  }

  listar_tipos(): void {
    this.service
      .listarTipos()
      .then((data) => {
        for (const key in data) {
          const value = data[key];
          const newObject = { code: key, value };
          this.tipos_list.push(newObject);
        }
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  convert(): void {
    const rateUSD = this.tipos_list.find(
      (item) => item.code === this.moneda1
    ).value;
    const rateOther = this.tipos_list.find(
      (item) => item.code === this.moneda2
    ).value;
    this.resultado = (this.monto / rateUSD) * rateOther;
    this.most3 = this.resultado.toFixed(2);
  }

  change(): void {
    const temp = this.moneda1;
    this.moneda1 = this.moneda2;
    this.moneda2 = temp;
    this.monto = this.most3;
    this.convert();
  }
}
