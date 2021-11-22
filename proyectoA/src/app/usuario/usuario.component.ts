import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  producto: any = {};
  productos: any = [];
  productos1: any = [];
  productos2: any = [];
  loading = false;
  crear = false;
  modificar = false;
  codigo: Number | undefined;
  entradas: any = [];
  entrada: any = {};
  cliente: any = [];
  lista:string[]=['Puma','Shell','Texaco', 'Pacific','Castrol'];
  lista1:string[]=['GASOLINA SUPER','GASOLINA REGULAR','DIESEL FULL', 'ACEITE CASTROL'];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    this.producto = {};
    this.productos = [];
    this.productos1 = [];
    this.productos2 = [];
    this.entrada = {};
    this.entradas = [[]];
    this.buscarProductos();
    this.buscarProductos1();
    this.buscarProductos2();
  }
  buscarProductos2(){
    this.loading = true;
    this.buscarUsuariosServicio2().subscribe(
      (response: any) => this.llenarProductos2(response)
    );
  }
  buscarUsuariosServicio2(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Cuenta/buscar').pipe(
      catchError(e => 'error')
      );
  }
  llenarProductos2(productos: any){
    this.productos2 = productos;
    this.loading = false;
   }

  buscarProductos1(){
    this.loading = true;
    this.buscarUsuariosServicio1().subscribe(
      (response: any) => this.llenarProductos1(response)
    );
  }
  buscarUsuariosServicio1(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Producto/buscar').pipe(
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
    return this.http.get<any>('http://localhost:9090/Compra/buscar').pipe(
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
    return this.http.post<any>('http://localhost:9090/Compra/guardar', this.producto, httpOptions);
   }
   confirmar(resultado: any){
    this.loading = false;
    if (resultado){
      alert('Producto Comprado');
      this.producto = {};
      this.buscarProductos();
    }
  }
  agregar(){
    this.crear = !this.crear;
  }
  
  agregar1(){
    this.modificar = !this.modificar;
    }

    nuevo(){
      this.producto = {};
    }
}
