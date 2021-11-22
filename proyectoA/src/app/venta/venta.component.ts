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
   producto: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.buscarProductos();
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

   salir(){
     location.href = '/admin';
   }
}
