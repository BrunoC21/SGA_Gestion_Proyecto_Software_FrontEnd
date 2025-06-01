import { Routes } from '@angular/router';
import { GestionInventarioComponent } from './pages/gestion-inventario/gestion-inventario.component';
import { GestionProductoComponent } from './pages/gestion-producto/gestion-producto.component';
import { GestionBodegaComponent } from './pages/gestion-bodega/gestion-bodega.component';
import { HomeComponent } from './pages/home/home.component';
import { Component } from '@angular/core';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'inventario', component: GestionInventarioComponent },
    { path: 'productos', component: GestionProductoComponent},
    { path: 'bodega', component: GestionBodegaComponent}
];
