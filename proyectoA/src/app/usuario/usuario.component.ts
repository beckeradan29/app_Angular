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
  proevedor!: string;
  product!:  string;
  cantidad!: number;
  precio!: number;
  total!: number;
  unida!: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    this.producto = {proevedor: this.proevedor, producto: this.product, cantidad: this.cantidad, precio: this.precio,
    total: this.total};
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
    this.producto = {proevedor: this.proevedor, producto: this.product, cantidad: this.cantidad, precio: this.precio,
      total: this.total};
    return this.http.post<any>('http://localhost:9090/Compra/guardar', this.producto, httpOptions);
   }
   confirmar(resultado: any){
    this.loading = false;
    if (resultado){
      alert('Producto Comprado');
      this.crear = false;
      this.producto = {};
      this.buscarProductos();
      this.buscarProductos1();
      this.buscarProductos2();
      this.GuardarFacturaPDF();
    }
  }
  GuardarFacturaPDF(){
    var fac = new jsPDF();
    var text = 'Empresa De Combustibles Y Lubricantes '+this.proevedor;
    var text1 = 'Facturacion Por la compra de Productos';
    var text2 = 'Producto: '+this.product;
    var text3 = 'Cliente: Compra Por el Administrador';
    if(this.product === 'GASOLINA SUPER'||this.product === 'GASOLINA REGULAR'||this.product === 'DIESEL FULL' ){
      this.unida = 'Galones';
    }else{
      this.unida = 'Litros';
    }
    var text5 = 'Cantidad: '+this.cantidad+" "+this.unida+"    Precio: "+this.precio;
    let number1 = this.precio;
    let number2 = this.cantidad;
    var text6 = 'Total Pagado: '+this.suma(number1,number2)+" quetzales";
    let date: Date = new Date();
    var text9 = 'Fecha de emision: '+date;
    var text8 = 'Gracias por tu Compra Te esperamos pronto.';
    fac.text(text, 30, 10);
    fac.text(text1, 10, 20);
    fac.text(text2, 10, 30);
    fac.text(text3, 10, 40);
    fac.text(text5, 10, 50);
    fac.text(text6, 10, 60);
    fac.setFontSize(13);
    fac.text(text9, 10, 90);
    fac.text(text8, 40, 110);
    fac.save('fac.pdf');
   }
   suma(num1: number,num2: number){
    return num1*num2;
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
