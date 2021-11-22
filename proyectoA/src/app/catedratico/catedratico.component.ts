import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-catedratico',
  templateUrl: './catedratico.component.html',
  styleUrls: ['./catedratico.component.css']
})
export class CatedraticoComponent implements OnInit {
  producto: any = {};
  productos: any = [];
  loading = false;
  crear = false;
  modificar = false;
  // tslint:disable-next-line: ban-types
  codigo: Number | undefined;
  entradas: any = [];
  entrada: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // tslint:disable-next-line: no-unused-expression
    this.producto = {};
    this.productos = [];
    this.entrada = {};
    this.entradas = [[]];
    this.buscarProductos();
  }

  // tslint:disable-next-line: typedef
  buscarProductos(){
    this.loading = true;
    this.buscarUsuariosServicio().subscribe(
      (response: any) => this.llenarProductos(response)
    );
  }
  // tslint:disable-next-line: typedef
  buscarProductoId(){
    this.loading = true;
    this.buscarId().subscribe(
      (response: any) => this.llenarProducto(response)
    );
  }
  // tslint:disable-next-line: typedef
  borrarProducto(){
    // tslint:disable-next-line: prefer-const
    let valida = confirm('Está seguro que desea eliminar el registro?');
    // tslint:disable-next-line: triple-equals
    if (valida == true)
    {
    this.loading = true;
    this.eliminarProductoServicio().subscribe(
      (response: any) => this.llenarProducto(response)
    );
    alert('Catedratico borrado');
    this.buscarProductos();
    }else{
      alert('Proceso de eliminacion Canselado');
    }
  }
  // tslint:disable-next-line: typedef
  llenarProducto(entradas: any){
   this.entradas = entradas;
   this.loading = false;
  }
  // tslint:disable-next-line: typedef
  llenarProductos(productos: any){
    this.productos = productos;
    this.loading = false;
   }
  buscarId(): Observable<any>{
    return this.http.get<any>('http://localhost:8063/ConsultaCatedra/' + this.codigo).pipe(
      catchError(e => 'error'));
  }
  buscarUsuariosServicio(): Observable<any>{
return this.http.get<any>('http://localhost:8063/ListaCatedra').pipe(
  catchError(e => 'error')
  );
  }
  eliminarProductoServicio(): Observable<any>{
    return this.http.delete<any>('http://localhost:8063/EliminaCatedra/' + this.codigo).pipe(
      catchError(e => 'error')
      );
      }
  // tslint:disable-next-line: typedef
  ModificarProducto(){
    const formulario: any = document.getElementById('modificar');
    const formularioValido: boolean = formulario.reportValidity();
    if (formularioValido){
      this.loading = true;
      this.ModificarService().subscribe((data => this.confirmarModificacion(data) ) );
    }
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
  ModificarService(){
    let h = {};
    let e;
    for (const entrada  of this.entradas){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    h = httpOptions;
    e = entrada;
  }
  return this.http.post<any>('http://localhost:8063/InsertaCatedra', e, h);
}
   // tslint:disable-next-line: typedef
   createService(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('http://localhost:8063/InsertaCatedra', this.producto, httpOptions);
   }

   // tslint:disable-next-line: typedef
   confirmar(resultado: any){
    this.loading = false;
    if (resultado){
      alert('Catedratico creado');
    }

    this.crear = false;
    this.buscarProductos();
   }
   // tslint:disable-next-line: typedef
   confirmarModificacion(resultado: any){
    this.loading = false;
    if (resultado){
      alert('Catedratico Modificado');
    }
    this.modificar = false;
    this.buscarProductos();
   }
  // tslint:disable-next-line: typedef
  agregar(){
    this.crear = !this.crear;
  }
  // tslint:disable-next-line: typedef
  agregar1(){
    this.modificar = !this.modificar;
    }

    // tslint:disable-next-line: typedef
    nuevo(){
      this.producto = {};
    }
}

