import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { CatedraticoComponent } from './catedratico/catedratico.component';
import { CursoComponent } from './curso/curso.component';
import { ReporteComponent } from './reporte/reporte.component';
import { PersonaComponent } from './persona/persona.component';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { HeaderComponent } from './header/header.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CompraComponent } from './compra/compra.component';
import { ProductosComponent } from './productos/productos.component';
import { ClienteComponent } from './cliente/cliente.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'producto', component: ProductoComponent},
{path: 'curso', component: CursoComponent},
{path: 'clientes', component: CatedraticoComponent},
{path: 'usuario', component: UsuarioComponent},
{path: 'reporte', component: ReporteComponent},
{path: 'empleado', component: PersonaComponent},
{path: 'admin', component: AdminComponent},
{path: 'anuncio', component: AnuncioComponent},
{path: 'cuenta', component: CuentaComponent},
{path: 'header', component: HeaderComponent},
{path: 'perfil', component: PerfilComponent},
{path: 'compra', component: CompraComponent},
{path: 'productos', component: ProductosComponent},
{path: 'cliente', component: ClienteComponent},
{path: 'opcion', component: OpcionesComponent},
{path: 'venta', component: VentaComponent}
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
