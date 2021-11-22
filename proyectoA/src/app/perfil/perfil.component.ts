import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  loading = false;
  crear = false;
  crear1 = false;
  actualizar: any = {};
  cliente: any = [];
  producto: any = {};
  productos: any = [];
  codigo!: Number;
  telefono!: string;
  direccion!: string;
  producto1: any = {};
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const dato = localStorage.getItem("cliente");
    if(dato) this.cliente = JSON.parse(dato);
    this.codigo = this.cliente.codcliente;
    this.producto = {codCliente:this.codigo, telefono: this.telefono};
    this.producto1 = {codCliente:this.codigo, direccion: this.direccion};
    this.actualizar = {nombre: this.cliente.nombre, correo: this.cliente.correo};
    if (!this.cliente){
    location.href = '/';
  }else{
    this.productos = [];
    this.crearInicio();
  }
  }
  // tslint:disable-next-line: typedef
  salir(){
  location.href = '/header';
  }

  crearTelefono(): void {
    const formulario: any = document.getElementById('crear');
    const formularioValido: boolean = formulario.reportValidity();
    if (formularioValido){
      this.loading = true;
      this.createService().subscribe(data => this.confirmar(data) );
      this.crearInicio();
    }
  }
  
   createService(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.producto = {codCliente:this.codigo, telefono: this.telefono};
    return this.http.post<any>('http://localhost:9090/TelefonoCli/guardar', this.producto, httpOptions);
   }

   confirmar(resultado: any){
    this.loading = false;
    if (resultado){
      alert('Telefono Agregado');
      this.crearInicio();
      this.producto = {};
      this.telefono = '';
    }
}

crearDireccion(): void {
  const formulario: any = document.getElementById('crear1');
  const formularioValido: boolean = formulario.reportValidity();
  if (formularioValido){
    this.loading = true;
    this.createService1().subscribe(data => this.confirmar1(data) );
    this.crearInicio();
  }
}

 createService1(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  this.producto1 = {codCliente:this.codigo, direccion: this.direccion};
  return this.http.post<any>('http://localhost:9090/Direccion_Cliente/guardar', this.producto1, httpOptions);
 }

 confirmar1(resultado: any){
  this.loading = false;
  if (resultado){
    alert('Direccion Agregada');
    this.crearInicio();
    this.producto = {};
    this.direccion = '';
  }
}

  mostrar():void{
    this.crear = !this.crear;
  }
  mostrar1():void{
    this.crear1 = !this.crear1;
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
