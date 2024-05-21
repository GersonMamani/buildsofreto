import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  public path = 'https://openexchangerates.org/api';

  public config: any = {
    params: {
      app_id: '4fc7459f2df64246b63dc0fc583a9ce8',
    },
  };

  // simular api
  async consumirJSONLocal(): Promise<any> {
    try {
      const respuesta = await axios.get('assets/movies.json');
      return respuesta.data;
    } catch (error) {
      console.error('Error al consumir el archivo JSON:', error);
    }
  }

  async listarMonedas(): Promise<any> {
    try {
      const respuesta = await axios.get(`${this.path}/currencies.json`);
      return respuesta.data;
    } catch (error) {
      console.error('Error al consumir el archivo JSON:', error);
    }
  }

  async listarTipos(): Promise<any> {
    try {
      const respuesta = await axios.get(
        `${this.path}/latest.json`,
        this.config
      );
      return respuesta.data.rates;
    } catch (error) {
      console.error('Error al consumir el archivo JSON:', error);
    }
  }
  async listarCompraVenta(): Promise<any> {
    try {
      this.config.params.show_bid_ank = 1;
      const respuesta = await axios.get(
        `${this.path}/latest.json`,
        this.config
      );
      return respuesta.data.rates;
    } catch (error) {
      console.error('Error al consumir el archivo JSON:', error);
    }
  }
}
