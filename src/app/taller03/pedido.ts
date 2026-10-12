import { Component, signal } from '@angular/core';
import { TarjetaProducto, Producto } from './tarjeta-producto';
import { ResumenPedido, Linea } from './resumen-pedido';

@Component({
  selector: 'app-pedido',
  imports: [TarjetaProducto, ResumenPedido],
  template: `
    <main>
      <header class="encabezado">
        <p class="etiqueta">TALLER 03</p>
        <h1>Pedido de productos</h1>
        <p class="descripcion">
          Selecciona los productos que necesitas y administra tu pedido.
        </p>
      </header>

      <section class="productos">
        <h2>Productos disponibles</h2>

        <div class="rejilla-productos">
          @for (producto of productos(); track producto.nombre) {
            <app-tarjeta-producto
              [producto]="producto"
              [enPedido]="cantidadEnPedido(producto.nombre)"
              (agregar)="agregarProducto($event)"
            />
          }
        </div>
      </section>

      <app-resumen-pedido
        [lineas]="lineas()"
        (quitar)="quitarProducto($event)"
      />
    </main>
  `,
  styles: [`
    :host {
      display: block;
    }

    main {
      max-width: 900px;
      margin: 0 auto;
      color: #0f172a;
    }

    .encabezado {
      margin-bottom: 32px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e2e8f0;
    }

    .etiqueta {
      margin-bottom: 8px;
      color: #b45309;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.15em;
    }

    h1 {
      margin: 0 0 8px;
      font-size: 30px;
      line-height: 1.2;
      font-weight: 800;
      color: #0f172a;
    }

    .descripcion {
      margin: 0;
      color: #64748b;
      font-size: 14px;
      line-height: 1.6;
    }

    .productos {
      margin-bottom: 32px;
    }

    h2 {
      margin: 0 0 16px;
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
    }

    .rejilla-productos {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    app-tarjeta-producto {
      display: block;
      min-width: 0;
    }

    app-resumen-pedido {
      display: block;
    }

    @media (max-width: 640px) {
      .rejilla-productos {
        grid-template-columns: 1fr;
      }

      h1 {
        font-size: 26px;
      }
    }
  `]
})
export class Pedido {
  productos = signal<Producto[]>([
    { nombre: 'Mango', precio: 1800, existencias: 3 },
    { nombre: 'Aguacate', precio: 4500, existencias: 2 },
    { nombre: 'Limón', precio: 650, existencias: 10 },
    { nombre: 'Queso costeño', precio: 12000, existencias: 1 }
  ]);

  lineas = signal<Linea[]>([]);

  cantidadEnPedido(nombre: string): number {
    return this.lineas().find(
      linea => linea.nombre === nombre
    )?.cantidad ?? 0;
  }

  agregarProducto(nombre: string): void {
    const producto = this.productos().find(
      p => p.nombre === nombre
    );

    if (
      !producto ||
      this.cantidadEnPedido(nombre) >= producto.existencias
    ) {
      return;
    }

    this.lineas.update(lineas => {
      const existente = lineas.find(
        linea => linea.nombre === nombre
      );

      if (existente) {
        return lineas.map(linea =>
          linea.nombre === nombre
            ? { ...linea, cantidad: linea.cantidad + 1 }
            : linea
        );
      }

      return [
        ...lineas,
        {
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1
        }
      ];
    });
  }

  quitarProducto(nombre: string): void {
    this.lineas.update(lineas =>
      lineas.filter(linea => linea.nombre !== nombre)
    );
  }
}