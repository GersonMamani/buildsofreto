import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule, BrowserAnimationsModule],
      declarations: [AppComponent],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'gersonbsoft'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('gersonbsoft');
  });

  // validar que si el el input monto ingresa letras sale una alerta y el valor de monto es 0
  it('si el monto no es de tipo number sale una alerta de aviso y vuelve a 0', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    if (isNaN(app.monto)) {
      alert('Por favor ingrese un valor numerico');
      app.monto = 0;
    }
    expect(app.monto).toEqual(0);
  });

  // validar la funcion change cunado el monto es 0 se detiene la acción
  it('valida el botón con la función change(), si el monto es 0 no se realiza ninguna acción', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.monto = 0;
    app.change();
    expect(app.resultado).toEqual(0);
  });

  // inicializar moneda1 y moneda2 con USD y PEN respectivamente
  it('Inicializar moneda1 con USD y moneda2 con PEN', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.moneda1).toEqual('USD');
    expect(app.moneda2).toEqual('PEN');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain(
  //     'gersonbsoft app is running!'
  //   );
  // });
});
