import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  producto: any = {};
  productos: any = [];
  loading = false;
  crear = false;
  modificar = false;
  // tslint:disable-next-line: ban-types
  codigo: Number | undefined;
  entradas: any = [];
  entrada: any = {};
  lista:string[]=['Masculino','Femenino'];
  sucursal: any = [];
  puesto: any = [];
  turno: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.producto = {edireccion: [], etelefono: []};
    this.productos = [];
    this.entrada = {};
    this.entradas = [[]];
    this.sucursal = [];
    this.puesto = [];
    this.turno = [];
    this.buscarProductos();
    this.buscarSUcursal();
    this.buscarTurno();
    this.buscarPuesto();
  }
  mostrarEmpleado(response: any){
    this.loading = false;
    this.productos = response;
    this.buscarProductos();
   }
   eliminarEmpleado(empleado: any){
     let valida = confirm('Está seguro que desea eliminar el registro?');
     if (valida == true){
     this.loading = true;
     this.eliminarEmpleadoService(empleado.codempleado).subscribe(
       (response: any) => this.mostrarEmpleado(response)
     );
     alert('Empleado borrado');
     this.buscarProductos();
     }else{
       alert('Proceso de eliminacion Canselado');
     }
   }
   eliminarEmpleadoService(id: any):Observable<any>{
     return this.http.delete<any>('http://localhost:9090/Empleado/eliminar/'+id).pipe(
       catchError(e=> 'Error')
     );
   }

  buscarSUcursal(){
    this.loading = true;
    this.buscarSu().subscribe(
      (response: any) => this.llenarSucursal(response)
    );
  }
  llenarSucursal(sucursal: any){
    this.sucursal = sucursal;
    this.loading = false;
  }
  buscarSu(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Sucursal/buscar').pipe(
      catchError(e => 'error'));
  }

  buscarTurno(){
    this.loading = true;
    this.buscarTu().subscribe(
      (response: any) => this.llenarTurno(response)
    );
  }
  llenarTurno(turno: any){
    this.turno = turno;
    this.loading = false;
  }
  buscarTu(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Turno/buscar').pipe(
      catchError(e => 'error'));
  }

  buscarPuesto(){
    this.loading = true;
    this.buscarPu().subscribe(
      (response: any) => this.llenarPuesto(response)
    );
  }
  llenarPuesto(puesto: any){
    this.puesto = puesto;
    this.loading = false;
  }
  buscarPu(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Puesto/buscar').pipe(
      catchError(e => 'error'));
  }

  buscarProductos(){
    this.loading = true;
    this.buscarUsuariosServicio().subscribe(
      (response: any) => this.llenarProductos(response)
    );
  }
  buscarUsuariosServicio(): Observable<any>{
    return this.http.get<any>('http://localhost:9090/Empleado/buscar').pipe(
      catchError(e => 'error')
      );
      }
      llenarProductos(productos: any){
        this.productos = productos;
        this.loading = false;
       }

  borrarProducto(){
    let valida = confirm('Está seguro que desea eliminar el registro?');
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

   llenarProducto(productos: any){
    this.productos = productos;
    this.loading = false;
   }

  eliminarProductoServicio(): Observable<any>{
    return this.http.delete<any>('http://localhost:8063/EliminaCatedra/' + this.codigo).pipe(
      catchError(e => 'error')
      );
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
    return this.http.post<any>('http://localhost:9090/Empleado/guardar', this.producto, httpOptions);
   }

   confirmar(resultado: any){
    this.loading = false;
    if (resultado){
      alert('Empleado creado');
    }
    this.producto = {edireccion: [], etelefono: []};
    this.crear = false;
    this.buscarProductos();
   }

   agregarTelefono(){
     this.producto.etelefono.push({});
   }
   borrarTelefono(telefono: any){
     this.producto.etelefono.splice(this.producto.etelefono.indexOf(telefono),1);
   }
   agregarDireccion(){
    this.producto.edireccion.push({});
  }
  borrarDireccion(direccion: any){
    this.producto.edireccion.splice(this.producto.edireccion.indexOf(direccion),1);
  }
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


