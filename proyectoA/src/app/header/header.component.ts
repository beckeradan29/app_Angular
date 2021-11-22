import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   loading = false;
   crear = false;
   cliente: any = {};
   anuncio: any = {};
   anuncios: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const dato = localStorage.getItem("cliente");
    if(dato) this.cliente = JSON.parse(dato);
    
    if (!this.cliente){
    location.href = '/';
  }else{
    this.anuncio = {};
    this.anuncios = [];
    this.buscarProductos();
  }
  }
  // tslint:disable-next-line: typedef
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
  // tslint:disable-next-line: typedef
  llenarProductos(productos: any){
    this.anuncios = productos;
    this.loading = false;
   }
  // tslint:disable-next-line: typedef
  verFactura(){
  location.href = '/compra';
  }
  // tslint:disable-next-line: typedef
  verPerfil(){
    location.href = '/perfil';
  }
  // tslint:disable-next-line: typedef
  salir(){
  localStorage.removeItem('cliente');
  location.href = '/';
  }
  // tslint:disable-next-line: typedef
  verProducto(){
  location.href = '/productos';
  }
}
