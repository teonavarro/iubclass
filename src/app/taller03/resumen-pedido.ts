import { Component, input, output, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export interface Linea {
  nombre: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-resumen-pedido',
  imports: [CurrencyPipe],
  template: `
    <section>
      <h2>Resumen del pedido</h2>

      @for (linea of lineas(); track linea.nombre) {
        <article>
          <div>
            <strong>{{ linea.nombre }}</strong>
            <p>
              {{ linea.cantidad }} x
              {{ linea.precio | currency:'COP':'symbol-narrow':'1.0-0':'es-CO' }}
            </p>
          </div>

          <button type="button" (click)="quitar.emit(linea.nombre)">
            Quitar
          </button>
        </article>
      } @empty {
        <p>El pedido está vacío</p>
      }

      <hr>

      <p>
        Subtotal:
        {{ subtotal() | currency:'COP':'symbol-narrow':'1.0-0':'es-CO' }}
      </p>

      <p>
        Domicilio:
        @if (lineas().length === 0) {
          —
        } @else if (domicilio() === 0) {
          Gratis
        } @else {
          {{ domicilio() | currency:'COP':'symbol-narrow':'1.0-0':'es-CO' }}
        }
      </p>

      <h3>
        Total:
        {{ total() | currency:'COP':'symbol-narrow':'1.0-0':'es-CO' }}
      </h3>
    </section>
  `,
  styles: [`
    section {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      margin: 8px;
    }

    article {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }

    button {
      padding: 6px 12px;
      cursor: pointer;
    }
  `]
})
export class ResumenPedido {
  lineas = input.required<Linea[]>();

  quitar = output<string>();

  subtotal = computed(() =>
    this.lineas().reduce(
      (acumulado, linea) => acumulado + linea.precio * linea.cantidad,
      0
    )
  );

  domicilio = computed(() => {
    if (this.subtotal() === 0) {
      return 0;
    }

    return this.subtotal() < 20000 ? 3000 : 0;
  });

  total = computed(() => this.subtotal() + this.domicilio());
}