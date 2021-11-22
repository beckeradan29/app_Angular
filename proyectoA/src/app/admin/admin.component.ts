import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loading = false;
  crear = false;
  crear1 = false;
  producto: any = {};
  productos: any = [];
  producto1: any = {};
  productos1: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.buscarProductos();
    this.buscarProductos1();
  }
  mostrarSucursal(response: any){
   this.loading = false;
   this.producto1 = response;
   this.buscarProductos1();
  }
  eliminarSucursal(sucursal: any){
    let valida = confirm('Está seguro que desea eliminar el registro?');
    if (valida == true){
    this.loading = true;
    this.eliminarSucursalService(sucursal.codsucursal).subscribe(
      (response: any) => this.mostrarSucursal(response)
    );
    alert('Sucursal borrado');
    this.buscarProductos1();
    }else{
      alert('Proceso de eliminacion Canselado');
    }
  }
  eliminarSucursalService(id: any):Observable<any>{
    return this.http.delete<any>('http://localhost:9090/Sucursal/eliminar/'+id).pipe(
      catchError(e=> 'Error')
    );
  }

  mostrarAnuncio(response: any){
    this.loading = false;
    this.producto = response;
    this.buscarProductos();
   }
   eliminarAnuncio(anuncio: any){
     let valida = confirm('Está seguro que desea eliminar el registro?');
     if (valida == true){
     this.loading = true;
     this.eliminarAnuncioService(anuncio.idanuncio).subscribe(
       (response: any) => this.mostrarAnuncio(response)
     );
     alert('Anuncio borrado');
     this.buscarProductos();
     }else{
       alert('Proceso de eliminacion Canselado');
     }
   }
   eliminarAnuncioService(id: any):Observable<any>{
     return this.http.delete<any>('http://localhost:9090/anuncio/eliminar/'+id).pipe(
       catchError(e=> 'Error')
     );
   }

  buscarProductos1(){
    this.loading = true;
    this.buscarUsuariosServicio1().subscribe(
      (response: any) => this.llenarProductos1(response)
    );
  }
  buscarUsuariosServicio1(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Sucursal/buscar').pipe(
      catchError(e => 'error')
      );
  }
  llenarProductos1(productos: any){
    this.productos1 = productos;
    this.loading = false;
   }

  buscarProductos(){
    this.loading = true;
    this.buscarUsuariosServicio().subscribe(
      (response: any) => this.llenarProductos(response)
    );
  }
  buscarUsuariosServicio(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/anuncio/buscar').pipe(
      catchError(e => 'error')
      );
  }
  llenarProductos(productos: any){
    this.productos = productos;
    this.loading = false;
   }


  crearProducto(){
    const formulario: any = document.getElementById('crear');
    const formularioValido: boolean = formulario.reportValidity();
    if (formularioValido){
      this.loading = true;
      this.createService().subscribe(data => this.confirmar(data) );
    }
  }
  createService(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('http://localhost:9090/anuncio/guardar', this.producto, httpOptions);
   }
   confirmar(resultado: any){
    this.loading = false;
    if (resultado){
      alert('Anuncio agregado');
      this.crear = false;
      this.producto = {};
      this.buscarProductos();
    }

  }
  agregar(){
    this.crear = !this.crear;
  }

  crearProducto1(){
    const formulario: any = document.getElementById('crear1');
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
    return this.http.post<any>('http://localhost:9090/Sucursal/guardar', this.producto1, httpOptions);
   }
   confirmar1(resultado: any){
    this.loading = false;
    if (resultado){
      alert('Succursal agregado');
      this.crear1 = false;
      this.producto1 = {};
      this.buscarProductos1();
    }

  }
  agregar1(){
    this.crear = !this.crear;
  }
  agregar2(){
    this.crear1 = !this.crear1;
  }

  compraProducto(){
    location.href = '/usuario';
    }
    // tslint:disable-next-line: typedef
    verPerfil(){
    
    }
    // tslint:disable-next-line: typedef
    salir(){
    location.href = '/';
    }
    // tslint:disable-next-line: typedef
    verProducto(){
      location.href = '/empleado';
    }
    verOpciones(){
      location.href = '/opcion';
    }
    verClientes(){
   location.href = '/cliente';
    }
    verVentas(){
      location.href = '/venta';
    }
}
