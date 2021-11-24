import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  ver = false;
  ver1 = false;
  loading = false;
  modificar = false;
  crear = false;
  cliente: any = [];
  producto1: any = {};
  productos: any = [];
  entrada: any = {};
  entradas: any = [];
  // tslint:disable-next-line: ban-types
  codigo: Number | undefined;
  factura: any = {};
  efacturas: any = [];
  codCliente!: Number;
  codEmpleado!: Number;
  nit!: string;
  telefono!: string;
  producto!: string;
  cantidad!: number;
  costo!: number;
  tipoPago!: string;
  fechaEmision!: string;
  lista:string[]=['Efectivo','Cheque','Cupon'];
  lista1:string[]=['GASOLINA SUPER','GASOLINA REGULAR','DIESEL FULL','ACEITE CASTROL'];
  nombre!: string;
  unida!: string;
  vehiculo!: string;
  empleado: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const dato = localStorage.getItem("cliente");
    if(dato) this.cliente = JSON.parse(dato);

    this.codCliente = this.cliente.codcliente;
    this.nit = this.cliente.nit;
    this.nombre = this.cliente.nombre;
    this.factura = {codCliente: this.codCliente, codEmpleado: this.codEmpleado, nombre: this.nombre, nit: this.nit, telefono: this.telefono,
    producto: this.producto, cantidad: this.cantidad, costo: this.costo, tipoPago: this.tipoPago, fechaEmision: this.fechaEmision};

    this.producto1 = {};
    this.productos = [];
    this.entrada = {};
    this.entradas = [];
    this.buscarProductos();
    this.buscarEmpleados();
  }
  buscarEmpleados(){
    this.loading = true;
    this.buscarEmpleadoServicio().subscribe(
      (response: any) => this.llenarEmpleados(response)
    );
  }
  buscarEmpleadoServicio(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Empleado/buscar').pipe(
      catchError(e => 'error')
      );
      }
      llenarEmpleados(empleado: any){
        this.empleado = empleado;
        this.loading = false;
       }

  mostrar1(): void{
  this.ver = !this.ver;
  }
  mostrar2(): void{
    this.ver1 = !this.ver1;
    }
  
  buscarProductos(){
    this.loading = true;
    this.buscarUsuariosServicio().subscribe(
      (response: any) => this.llenarProductos(response)
    );
  }
  buscarUsuariosServicio(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Producto/buscar').pipe(
      catchError(e => 'error')
      );
  }

  llenarProductos(productos: any){
    this.productos = productos;
    this.loading = false;
   }
   
   
  // tslint:disable-next-line: typedef
  salir(){
  location.href = '/header';
  }
  // tslint:disable-next-line: ban-types
  Comprar(): void{
    this.mostrar();
  
  }
  GuardarFactura(){
    const formulario: any = document.getElementById('modificar');
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
    this.factura = {codCliente: this.codCliente, codEmpleado: this.codEmpleado, nombre: this.nombre, nit: this.nit, telefono: this.telefono,
      producto: this.producto, cantidad: this.cantidad, costo: this.costo, tipoPago: this.tipoPago, fechaEmision: this.fechaEmision};
    return this.http.post<any>('http://localhost:9090/Factura/guardar', this.factura, httpOptions);
   }

   // tslint:disable-next-line: typedef
   confirmar(resultado: any){
    this.loading = false;
    if (resultado){
      alert('Compra Realizada');
      this.factura = {};
      this.modificar = false;
      this.ngOnInit();
      this.GuardarFacturaPDF();
    }
}
 GuardarFacturaPDF(){
  var fac = new jsPDF();
  var text = 'Empresa De Combustibles Y Lubricantes De Guatemala S.A';
  var text1 = 'Facturacion Por la compra de Productos De Nuestra Empresa';
  if(this.cliente.idvehiculo === 1){
    this.vehiculo = 'AUTOMOVIL';
  }else if(this.cliente.idvehiculo === 2){
    this.vehiculo = 'BUS';
  }else if(this.cliente.idvehiculo === 3){
    this.vehiculo = 'CAMEON';
  }else if(this.cliente.idvehiculo === 4){
    this.vehiculo = 'TRAILER';
  }else if(this.cliente.idvehiculo === 5){
    this.vehiculo = 'MOTOSICLETA';
  }
  var text2 = 'Producto: '+this.producto+" para tu vehiculo: "+this.vehiculo;
  var text3 = 'Cliente: '+this.cliente.nombre +" "+ this.cliente.apellido;
  var text4 = 'Nit: '+this.nit;
if(this.producto === 'GASOLINA SUPER'||this.producto === 'GASOLINA REGULAR'||this.producto === 'DIESEL FULL' ){
  this.unida = 'Galones';
}else{
  this.unida = 'Litros';
}
  var text5 = 'Cantidad: '+this.cantidad+" "+this.unida+"      Precio: "+this.costo;
  let number1 = this.costo;
  let number2 = this.cantidad;
  var text6 = 'Total Pagado: '+this.suma(number1,number2)+" quetzales";
  var text7 = 'Tipo de Pago: '+this.tipoPago;
  let date: Date = new Date();
  var text9 = 'Fecha de emision: '+date;
  var text8 = 'Gracias por tu Compra Te esperamos pronto.';
  fac.text(text, 30, 10);
  fac.text(text1, 10, 20);
  fac.text(text2, 10, 30);
  fac.text(text3, 10, 40);
  fac.text(text4, 10, 50);
  fac.text(text5, 10, 60);
  fac.text(text6, 10, 70);
  fac.text(text7, 10, 80);
  fac.setFontSize(13);
  fac.text(text9, 10, 90);
  fac.text(text8, 40, 110);
  fac.save('fac.pdf');
 }
 mostrar():void{
  this.modificar = !this.modificar;
}
suma(num1: number,num2: number){
return num1*num2;
}
}
