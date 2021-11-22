import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';


@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {
loading = false;
crear = false;
producto: any = {};
productos: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.buscarProductos();
  }
  crearDireccion(): void {
    const formulario: any = document.getElementById('crear');
    const formularioValido: boolean = formulario.reportValidity();
    if (formularioValido){
      this.loading = true;
      this.createService1().subscribe(data => this.confirmar1(data) );
    }
  }
  
   createService1(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('http://localhost:9090/Puesto/guardar', this.producto, httpOptions);
   }
  
   confirmar1(resultado: any){
    this.loading = false;
    if (resultado){
      alert('Direccion Agregada');
      this.producto = {};
    }
  }
  
    agregar():void{
      this.crear = !this.crear;
    }
  
    buscarProductos(){
      this.loading = true;
      this.buscarUsuariosServicio().subscribe(
        (response: any) => this.llenarProductos(response)
      );
    }
    buscarUsuariosServicio(): Observable<any>{
      return this.http.get<any>('http://localhost:9090/Bitacora/buscar').pipe(
        catchError(e => 'error')
        );
    }
    llenarProductos(productos: any){
      this.productos = productos;
      this.loading = false;
     }
  
}
