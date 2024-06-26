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
  public title = 'gersonbsoft';
  public monedas_list: any[] = [];
  public tipos_list: any[] = [];
  public moneda1: string = 'USD';
  public moneda2: string = 'PEN';
  public monto: number = 0;
  public resultado: number = 0;
  public most3: any = 0;
  public usuarioFormGroup: FormGroup = new FormGroup({});
  // historial
  public historial: any[] = [];
  public isVisible: boolean = false;

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
        // console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  convert(): void {
    if (this.monto === 0) {
      console.log('no se convierte ');
      return;
    }
    if (isNaN(this.monto)) {
      alert('Ingrese un valor numérico');
      this.monto = 0;
      return;
    }

    const rateUSD = this.tipos_list.find(
      (item) => item.code === this.moneda1
    ).value;
    const rateOther = this.tipos_list.find(
      (item) => item.code === this.moneda2
    ).value;
    this.resultado = (this.monto / rateUSD) * rateOther;
    this.most3 = this.resultado.toFixed(2);

    // pushear para el historial
    // Add conversion details to history
    if (this.monto !== 0) {
      this.historial.push({
        date: new Date().toISOString(), // Add timestamp
        monto_uno: this.monto,
        tipo_moneda1: this.moneda1,
        result: this.most3,
        tipo_moneda2: this.moneda2,
      });
    }
  }

  change(): void {
    if (this.monto === 0) {
      console.log('no se cambia');
      return;
    }
    const temp = this.moneda1;
    this.moneda1 = this.moneda2;
    this.moneda2 = temp;
    this.monto = this.most3;
    this.convert();
  }

  verhistorial(): void {
    // console.log(this.historial);
    this.isVisible = !this.isVisible;
    // este boton se abre cuando clickeas y se cierra cuando vuelves a cliquear
  }
}
