import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  producto: any = {};
  turno: any = {};
  sucursal: any = {};
  puesto: any = {};
  productos: any = [];
  loading = false;
  crear = false;
  lista:string[]=['Masculino','Femenino'];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // tslint:disable-next-line: no-unused-expression
    this.producto = {idTurno: this.turno.idturno, codSucursal: this.sucursal.codsucursal,
    idPuesto: this.puesto.idpuesto,  edireccion: [],  etelefono: []};
    this.productos = [];
    this.buscarProductos2();
  }
  // tslint:disable-next-line: typedef
  crearProducto(){
    const formulario: any = document.getElementById('crear');
    const formularioValido: boolean = formulario.reportValidity();
    if (formularioValido){
      this.loading = true;
      this.createService().subscribe(data => this.confirmar(data) );
    }
  }
   // tslint:disable-next-line: typedef
   createService(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('http://localhost:9090/Cliente/guardar', this.producto, httpOptions);
   }

   // tslint:disable-next-line: typedef
   confirmar(resultado: any){
    this.loading = false;
    if (resultado){
      alert('Cuenta creada');
      this.producto = {};
    }
}

buscarProductos2(){
  this.loading = true;
  this.buscarUsuariosServicio2().subscribe(
    (response: any) => this.llenarProductos2(response)
  );
}
buscarUsuariosServicio2(): Observable<any>{
  return this.http.get<any>('http://localhost:9090/Vehiculo/buscar').pipe(
    catchError(e => 'error')
    );
}
llenarProductos2(productos: any){
  this.productos = productos;
  this.loading = false;
 }

}

