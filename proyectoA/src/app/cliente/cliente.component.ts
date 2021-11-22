import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  loading = false;
  crear = false;
  crear1 = false;
  codigo!: Number;
  producto: any = {};
  productos: any = [];
  producto1: any = {};
  productos1: any = [];
  entradas: any = [];
  entrada: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.entradas = [];
    this. buscarProductos1();
  }
  mostrarCliente(response: any){
    this.loading = false;
    this.producto1 = response;
    this.buscarProductos1();
   }
   eliminarCliente(sucursal: any){
     let valida = confirm('Está seguro que desea eliminar el registro?');
     if (valida == true){
     this.loading = true;
     this.eliminarClienteService(sucursal.codclientel).subscribe(
       (response: any) => this.mostrarCliente(response)
     );
     alert('Cliente borrado');
     this.buscarProductos1();
     }else{
       alert('Proceso de eliminacion Canselado');
     }
   }
   eliminarClienteService(id: any):Observable<any>{
     return this.http.delete<any>('http://localhost:9090/Cliente/eliminar/'+id).pipe(
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
    return this.http.get<any>('http://localhost:9090/Cliente/buscar').pipe(
      catchError(e => 'error')
      );
  }
  llenarProductos1(productos: any){
    this.entradas = productos;
    this.loading = false;
   }
}
