import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
   loading = false;
   ver = false;
  
   producto: any = [];
   tipo!: string;
   tipo1!: string;
   tipo2!: string;
   tipo3!: string;
   tipo4!: string;
   tipo5!: string;
   primero!: number;
   segundo!: number;
   tercero!: number;
   cuarto!: number;
   quinto!: number;
   sexto!: number;
   cliente: any = [];
   empleado: any = [];
   codigo!: number;
   codigo1!: number;
   res!: number;
   res1!: number;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.tipo = 'GASOLINA SUPER';
    this.tipo1 = 'GASOLINA REGULAR';
    this.tipo2 = 'DIESEL FULL';
    this.tipo3 = 'ACEITE CASTROL';

    this.buscarProductos();
    this.buscarProductosRegular();
    this.buscarProductosSuper();
    this.buscarProductosDiesel();
    this.buscarProductosAceite();
    this.buscarEmpleados();
    this.buscarClientes();
    this.buscarProductosCliente1();
    this.buscarProductosCliente2();
  }
  buscarEmpleados(){
    this.loading = true;
    this.buscarUsuariosEmpleado().subscribe(
      (response: any) => this.llenarEmpleados(response)
    );
  }
  buscarUsuariosEmpleado(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Empleado/buscar').pipe(
      catchError(e => 'error')
      );
  }
  llenarEmpleados(empleado: any){
    this.empleado = empleado;
    this.loading = false;
   }
   buscarClientes(){
    this.loading = true;
    this.buscarUsuariosCliente().subscribe(
      (response: any) => this.llenarClientes(response)
    );
  }
  buscarUsuariosCliente(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Cliente/buscar').pipe(
      catchError(e => 'error')
      );
  }
  llenarClientes(cliente: any){
    this.cliente = cliente;
    this.loading = false;
   }
 
  buscarProductos(){
    this.loading = true;
    this.buscarUsuariosServicio().subscribe(
      (response: any) => this.llenarProductos(response)
    );
  }
  buscarUsuariosServicio(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Factura/buscar').pipe(
      catchError(e => 'error')
      );
  }
  llenarProductos(productos: any){
    this.producto = productos;
    this.loading = false;
   }
   buscarProductosRegular(){
    this.loading = true;
    this.buscarUsuariosServicioRegular().subscribe(
      (response: number) => this.llenarProductosRegular(response)
    );
  }
  buscarUsuariosServicioRegular(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Factura/buscar/super/'+this.tipo).pipe(
      catchError(e => 'error')
      );
  }
  llenarProductosRegular(primero: number){
    this.primero= primero;
    this.loading = false;
   }
   buscarProductosCliente1(){
    this.loading = true;
    this.buscarUsuariosServicioCliente1().subscribe(
      (response: number) => this.llenarProductosCliente1(response)
    );
  }
  buscarUsuariosServicioCliente1(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Factura/buscar/empleado/'+this.codigo).pipe(
      catchError(e => 'error')
      );
  }
  llenarProductosCliente1(primero: number){
    this.res= primero;
    this.loading = false;
   }

   buscarProductosCliente2(){
    this.loading = true;
    this.buscarUsuariosServicioCliente2().subscribe(
      (response: number) => this.llenarProductosCliente2(response)
    );
  }
  buscarUsuariosServicioCliente2(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Factura/buscar/cliente/'+this.codigo1).pipe(
      catchError(e => 'error')
      );
  }
  llenarProductosCliente2(primero: number){
    this.res1= primero;
    this.loading = false;
   }

   buscarProductosSuper(){
    this.loading = true;
    this.buscarUsuariosServicioSuper().subscribe(
      (response: number) => this.llenarProductosSuper(response)
    );
  }
  buscarUsuariosServicioSuper(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Factura/buscar/super/'+this.tipo1).pipe(
      catchError(e => 'error')
      );
  }
  llenarProductosSuper(segundo: number){
    this.segundo= segundo;
    this.loading = false;
   }
   buscarProductosDiesel(){
    this.loading = true;
    this.buscarUsuariosServicioDiesel().subscribe(
      (response: number) => this.llenarProductosDiesel(response)
    );
  }
  buscarUsuariosServicioDiesel(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Factura/buscar/super/'+this.tipo2).pipe(
      catchError(e => 'error')
      );
  }
  llenarProductosDiesel(tercero: number){
    this.tercero= tercero;
    this.loading = false;
   }
   buscarProductosAceite(){
    this.loading = true;
    this.buscarUsuariosServicioAceite().subscribe(
      (response: number) => this.llenarProductosAceite(response)
    );
  }
  buscarUsuariosServicioAceite(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Factura/buscar/super/'+this.tipo3).pipe(
      catchError(e => 'error')
      );
  }
  llenarProductosAceite(cuarto: number){
    this.cuarto= cuarto;
    this.loading = false;
   }
   buscarProductosCliente(){
    this.loading = true;
    this.buscarUsuariosServicioCliente().subscribe(
      (response: number) => this.llenarProductosCliente(response)
    );
  }
  buscarUsuariosServicioCliente(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Factura/buscar/super/'+this.tipo3).pipe(
      catchError(e => 'error')
      );
  }
  llenarProductosCliente(cuarto: number){
    this.cuarto= cuarto;
    this.loading = false;
   }
   salir(){
     location.href = '/admin';
   }

   verVenta(){
     this.ver = !this.ver;
   }

  
}
