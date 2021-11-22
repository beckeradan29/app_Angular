import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  loading = false;
  modificar = false;
  crear = false;
  cliente: any = [];
  producto: any = {};
  productos: any = [];
  entrada: any = {};
  empleados: any = [];
  actualizar: any = {};
  // tslint:disable-next-line: ban-types
  codigo: Number | undefined;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const dato = localStorage.getItem("cliente");
    if(dato) this.cliente = JSON.parse(dato);
    this.actualizar = {nombre: this.cliente.nombre, correo: this.cliente.correo};
    if (!this.cliente){
    location.href = '/';
  }else{
    this.producto = {};
    this.productos = [];
    this.entrada = {};
    this.empleados = [];
    this.crearInicio();
  }
  }
  salir(): void{
  location.href = '/header';
  }
  // tslint:disable-next-line: ban-types
  Comprar(): void{
   let DATA = document.getElementById('resultado');
   if(DATA) html2canvas(DATA).then(canvas => {
     let filewith = 208;
     let fileheight = canvas.height * filewith / canvas.width;
     const FILEURI = canvas.toDataURL('image/png');
     let PDF = new jsPDF('p', 'mm', 'a4');
     let position = 30;
     PDF.text('TODAS TUS COMPRAS QUE HAS HECHO', 10, 10);
     PDF.text('Compras:', 20, 20);
     
     PDF.addImage(FILEURI, 'PNG', 0, position, filewith, fileheight);
     PDF.save('compra.pdf');
   });
  }
  crearInicio(){
    this.loading = true;
    this.InicioService().subscribe(data => this.IniciarSecion(data));
    }

    // tslint:disable-next-line: typedef
    IniciarSecion(resultado: any){
      this.loading = false;
      if (resultado){
        localStorage.setItem('cliente', JSON.stringify(resultado));
      }
    }
    
    InicioService(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.actualizar = {nombre: this.cliente.nombre, correo: this.cliente.correo};
    return this.http.post<any>('http://localhost:9090/Cliente/login', this.actualizar, httpOptions);
    }
}
