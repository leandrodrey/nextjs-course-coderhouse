<div align="center"> 
  <img height="100px" src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" />
<h1>Next JS Course from <a target="_blank" href="https://www.coderhouse.com">Coderhouse</a></h1>
</div>

# Rutas de la Aplicación

Este documento describe las diferentes rutas disponibles en la aplicación y su funcionalidad.

## Rutas Principales

### `/`

- **Descripción**: Esta es la página de inicio de la aplicación donde muestra en principio todos los productos
  disponibles.

### `/category/[id]`

- **Descripción**: Muestra todos los productos de una categoría filtrando por el id de la misma.

### `/detail/[id]`

- **Descripción**: Muestra el detalle de un producto específico según su id.

### `/cart`

- **Descripción**: Página donde se muestran los productos que se tienen en el carrito.

## Sección de Administración

### `/admin`

- **Descripción**: Página principal de administración para usuarios.
- **Layout Específico**: Utiliza otro layout que proporciona una barra lateral de navegación extra y un encabezado
  diferente.

## Rutas de Error

### `/404`

- **Descripción**: Página mostrada cuando una ruta no existe.

