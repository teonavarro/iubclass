import { Component, signal, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FichaProducto, Producto } from './ficha-producto';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [FichaProducto, CurrencyPipe],
  template: `
    <div style="padding: 24px; max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

      <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 16px;">
        Pantalla de Inventario
      </h2>

      <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #cbd5e1; margin-bottom: 24px;">

        <p style="margin: 4px 0;">
          <strong>Valor Total:</strong>
          {{ valorTotal() | currency:'COP':'symbol':'1.0-0':'es-CO' }}
        </p>

        <p style="margin: 4px 0;">
          <strong>Unidades Totales:</strong>
          {{ unidadesTotales() }}
        </p>

        <p style="margin: 4px 0;">
          <strong>Productos Agotados:</strong>
          {{ productosAgotados() }}
        </p>

        <button
          type="button"
          (click)="vaciarLista()"
          style="margin-top: 12px; padding: 8px 16px; border-radius: 6px; background-color: #dc2626; color: white; border: none; font-weight: 600; cursor: pointer;">

          Vaciar lista
        </button>

      </div>

      <div>
        @for (prod of lista(); track prod.nombre) {
          <app-ficha
            [producto]="prod"
            (retirar)="retirarUnidad($event)">
          </app-ficha>
        } @empty {
          <p style="font-weight: bold; color: #64748b; padding: 16px 0;">
            No hay productos para mostrar
          </p>
        }
      </div>

    </div>
  `
})
export class Inventario {

  lista = signal<Producto[]>([
    { nombre: 'Teclado', precio: 38000, existencias: 6 },
    { nombre: 'Ratón', precio: 22000, existencias: 0 },
    { nombre: 'Cable HDMI', precio: 15000, existencias: 2 },
    { nombre: 'Cable de red', precio: 6500, existencias: 12 }
  ]);

  valorTotal = computed(() =>
    this.lista().reduce(
      (total, producto) =>
        total + producto.precio * producto.existencias,
      0
    )
  );

  unidadesTotales = computed(() =>
    this.lista().reduce(
      (total, producto) => total + producto.existencias,
      0
    )
  );

  productosAgotados = computed(() =>
    this.lista().filter(
      producto => producto.existencias === 0
    ).length
  );

  retirarUnidad(nombreProducto: string): void {
  console.log('Producto recibido:', nombreProducto);

  this.lista.update(productos =>
    productos.map(producto => {
      if (producto.nombre === nombreProducto) {
        if (producto.existencias <= 0) {
          console.log('Producto agotado');
          return producto;
        }

        console.log('Retirando una unidad de:', producto.nombre);

        return {
          ...producto,
          existencias: producto.existencias - 1
        };
      }

      return producto;
    })
  );
}

  vaciarLista(): void {
    this.lista.set([]);
  }

}