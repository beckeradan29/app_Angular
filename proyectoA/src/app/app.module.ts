import { ProductoComponent } from './producto/producto.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CatedraticoComponent } from './catedratico/catedratico.component';
import { CursoComponent } from './curso/curso.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ReporteComponent } from './reporte/reporte.component';
import { PersonaComponent } from './persona/persona.component';
import { AdminComponent } from './admin/admin.component';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { HeaderComponent } from './header/header.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CompraComponent } from './compra/compra.component';
import { ProductosComponent } from './productos/productos.component';
import { ClienteComponent } from './cliente/cliente.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { VentaComponent } from './venta/venta.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductoComponent,
    CatedraticoComponent,
    CursoComponent,
    UsuarioComponent,
    ReporteComponent,
    PersonaComponent,
    AdminComponent,
    AnuncioComponent,
    CuentaComponent,
    HeaderComponent,
    PerfilComponent,
    CompraComponent,
    ProductosComponent,
    ClienteComponent,
    OpcionesComponent,
    VentaComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
