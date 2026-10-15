import { Component, input, output, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export interface Producto {
  nombre: string;
  precio: number;
  existencias: number;
}

@Component({
  selector: 'app-ficha',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div style="border: 1px solid #cbd5e1; padding: 16px; margin-bottom: 12px; border-radius: 8px; background-color: #ffffff; color: #0f172a;">
      <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">{{ producto().nombre }}</h3>
      <p style="margin: 4px 0;">Precio: <strong>{{ producto().precio | currency:'COP':'symbol':'1.0-0':'es-CO' }}</strong></p>
      <p style="margin: 4px 0;">Existencias: {{ producto().existencias }}</p>
      
      <p style="margin: 8px 0;">
        Estado: 
        @switch (estado()) {
          @case ('Agotado') { <strong style="color: #dc2626;">Agotado</strong> }
          @case ('Inventario bajo') { <strong style="color: #d97706;">Inventario bajo</strong> }
          @case ('Disponible') { <strong style="color: #16a34a;">Disponible</strong> }
        }
      </p>

      <button 
        type="button"
        [disabled]="producto().existencias === 0" 
        (click)="retirarUnidad()"
        class="btn-retirar">
        Retirar 1
      </button>
    </div>
  `,
  styles: [`
    .btn-retirar {
      margin-top: 8px;
      padding: 8px 16px;
      border-radius: 6px;
      background-color: #2563eb;
      color: #ffffff;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    .btn-retirar:disabled {
      background-color: #94a3b8 !important;
      color: #f1f5f9 !important;
      cursor: not-allowed !important;
      opacity: 0.6;
    }
  `]
})
export class FichaProducto {
  producto = input.required<Producto>();
  retirar = output<string>();

  estado = computed(() => {
    const ex = this.producto().existencias;
    if (ex === 0) return 'Agotado';
    if (ex < 3) return 'Inventario bajo';
    return 'Disponible';
  });

  retirarUnidad() {
    if (this.producto().existencias > 0) {
      this.retirar.emit(this.producto().nombre);
    }
  }
}