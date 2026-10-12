import { Component, input, output, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export interface Producto {
  nombre: string;
  precio: number;
  existencias: number;
}

@Component({
  selector: 'app-tarjeta-producto',
  imports: [CurrencyPipe],
  template: `
    <article>
      <h3>{{ producto().nombre }}</h3>

      <p>Precio: {{ producto().precio | currency:'COP':'symbol-narrow':'1.0-0':'es-CO' }}</p>

      <p>Disponibles: {{ disponibles() }}</p>

      <button
        type="button"
        [disabled]="disponibles() <= 0"
        (click)="agregar.emit(producto().nombre)">
        Agregar
      </button>
    </article>
  `,
  styles: [`
    article {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      margin: 8px;
    }

    button {
      padding: 8px 16px;
      cursor: pointer;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `]
})
export class TarjetaProducto {
  producto = input.required<Producto>();
  enPedido = input(0);

  agregar = output<string>();

  disponibles = computed(() =>
    Math.max(0, this.producto().existencias - this.enPedido())
  );
}