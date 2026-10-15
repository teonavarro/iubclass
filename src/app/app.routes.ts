import { Routes } from '@angular/router';
import { Tablero } from './tablero/tablero';
import { Puesto } from './puesto/puesto';
import { Acerca } from './acerca/acerca';
import { S03 } from './s03/s03';
import { S04 } from './s04/s04';
import { Pedido } from './taller03/pedido';
import { Inventario } from './parcial1/inventario';

export const routes: Routes = [
  { path: '', redirectTo: 'tablero', pathMatch: 'full' },
  { path: 'tablero', component: Tablero },
  { path: 'puesto', component: Puesto },
  { path: 's03', component: S03 },
  { path: 's04', component: S04 },
  { path: 'acerca', component: Acerca },
  { path: 'taller03', component: Pedido },
  { path: 'parcial1', component: Inventario },
  { path: '**', redirectTo: 'tablero' },
];