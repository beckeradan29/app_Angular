import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cliente: any = {};
  loading = false;
  errorInicio = false;
  crear = false;
  constructor(private http: HttpClient) {
   }

  ngOnInit(): void {
    }

    // tslint:disable-next-line: typedef
    crearInicio(){
    const formulario: any = document.getElementById('crear');
    const formularioValido: boolean = formulario.reportValidity();
    if (formularioValido){
    this.loading = true;
    this.InicioService().subscribe(data => this.IniciarSecion(data));
     }
    }

    // tslint:disable-next-line: typedef
    IniciarSecion(resultado: any){
      this.loading = false;
      if (resultado){
        localStorage.setItem('cliente', JSON.stringify(resultado));
        location.href = '/header';
      }else{
        this.errorInicio = true;
      }
    }
    // tslint:disable-next-line: typedef
    administrador(){
      if (this.cliente.nombre === 'admin' && this.cliente.correo === 'admin@admin.com'){
        location.href = '/admin';
      }
    }
    // tslint:disable-next-line: typedef
    InicioService(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('http://localhost:9090/Cliente/login', this.cliente, httpOptions);
    }

    // tslint:disable-next-line: typedef
    crearCuenta(){
      location.href = '/cuenta';
    }

}
