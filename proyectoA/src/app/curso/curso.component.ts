import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  curso: any = {};
  cursos: any = [];
  loading = false;
  crear = false;
  modificar = false;
  // tslint:disable-next-line: ban-types
  codigo: Number | undefined;
  entradas: any = [];
  entrada: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // tslint:disable-next-line: no-unused-expression
    this.curso = {};
    this.cursos = [];
    this.entrada = {};
    this.entradas = [[]];
    this.buscarCursos();
  }

  // tslint:disable-next-line: typedef
  buscarCursos(){
    this.loading = true;
    this.buscarCursosServicio().subscribe(
      (response: any) => this.llenarCursos(response)
    );
  }
  // tslint:disable-next-line: typedef
  buscarCursoId(){
    this.loading = true;
    this.buscarId().subscribe(
      (response: any) => this.llenarCurso(response)
    );
  }
  // tslint:disable-next-line: typedef
  borrarCurso(){
    // tslint:disable-next-line: prefer-const
    let valida = confirm('Está seguro que desea eliminar el registro?');
    // tslint:disable-next-line: triple-equals
    if (valida == true)
    {
    this.loading = true;
    this.eliminarCursoServicio().subscribe(
      (response: any) => this.llenarCurso(response)
    );
    alert('Curso borrado');
    this.buscarCursos();
  }else{
    alert('Proceso de eliminacion Canselado');
  }
  }
  // tslint:disable-next-line: typedef
  llenarCurso(entradas: any){
   this.entradas = entradas;
   this.loading = false;
  }
  // tslint:disable-next-line: typedef
  llenarCursos(productos: any){
    this.cursos = productos;
    this.loading = false;
   }
  buscarId(): Observable<any>{
    return this.http.get<any>('http://localhost:8063/ConsultaCurso/' + this.codigo).pipe(
      catchError(e => 'error'));
  }
  buscarCursosServicio(): Observable<any>{
return this.http.get<any>('http://localhost:8063/ListaCursos').pipe(
  catchError(e => 'error')
  );
  }
  eliminarCursoServicio(): Observable<any>{
    return this.http.delete<any>('http://localhost:8063/EliminaCursos/' + this.codigo).pipe(
      catchError(e => 'error')
      );
      }
  // tslint:disable-next-line: typedef
  ModificarCurso(){
    const formulario: any = document.getElementById('modificar');
    const formularioValido: boolean = formulario.reportValidity();
    if (formularioValido){
      this.loading = true;
      this.ModificarService().subscribe((data => this.confirmarModificacion(data) ) );
    }
  }
  // tslint:disable-next-line: typedef
  crearCurso(){
    const formulario: any = document.getElementById('crear');
    const formularioValido: boolean = formulario.reportValidity();
    if (formularioValido){
      this.loading = true;
      this.createService().subscribe(data => this.confirmar(data) );
    }
  }
  // tslint:disable-next-line: typedef
  ModificarService(){
    let h = {};
    let e;
    for (const entrada  of this.entradas){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    h = httpOptions;
    e = entrada;
  }
  return this.http.post<any>('http://localhost:8063/InsertaCursos', e, h);
}
   // tslint:disable-next-line: typedef
   createService(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('http://localhost:8063/InsertaCursos', this.curso, httpOptions);
   }

   // tslint:disable-next-line: typedef
   confirmar(resultado: any){
    this.loading = false;
    if (resultado){
      alert('Curso creado');
    }

    this.crear = false;
    this.buscarCursos();
   }
   // tslint:disable-next-line: typedef
   confirmarModificacion(resultado: any){
    this.loading = false;
    if (resultado){
      alert('Curso Modificado');
    }
    this.modificar = false;
    this.buscarCursos();
   }
  // tslint:disable-next-line: typedef
  agregar(){
    this.crear = !this.crear;
  }
  // tslint:disable-next-line: typedef
  agregar1(){
    this.modificar = !this.modificar;
    }

    // tslint:disable-next-line: typedef
      nuevo(){
      this.curso = {};
    }
}
