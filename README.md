# Plataforma de pedidos de Cafe Central

## Descripcion

Cafe Central desea implementar un sistema para administrar sus clientes, productos y pedidos. Actualmente la informacion se registra en hojas de calculo, lo que dificulta consultar rapidamente los pedidos de los clientes, conocer los productos mas vendidos y mantener la informacion actualizada.

El objetivo de este proyecto es proponer una base de datos orientada a documentos que permita almacenar la informacion de la cafeteria de forma persistente, organizada y flexible, facilitando consultas frecuentes sobre clientes, productos y pedidos.

## Problematica

La cafeteria presenta los siguientes problemas:

- La informacion se encuentra dispersa en hojas de calculo.
- Es dificil consultar rapidamente los pedidos realizados por un cliente.
- No existe una forma eficiente de conocer los productos mas vendidos.
- La informacion de clientes, productos y pedidos puede quedar desactualizada.
- El crecimiento de registros dificulta la administracion manual de los datos.

## Objetivo general

Diseñar una base de datos orientada a documentos para una plataforma de pedidos de una cafeteria que permita registrar, consultar, actualizar y administrar clientes, productos y pedidos de manera eficiente.

## Informacion que debe manejar el sistema

### Clientes

- Nombre
- Apellido
- Correo electronico
- Telefono
- Direccion
- Fecha de registro

### Productos

- Nombre
- Categoria
- Precio
- Descripcion
- Ingredientes
- Disponibilidad

### Pedidos

- Cliente que realiza el pedido
- Fecha del pedido
- Productos solicitados
- Cantidad de cada producto
- Precio de cada producto
- Total del pedido
- Estado del pedido

## Requisitos funcionales

| ID | Requisito funcional |
| --- | --- |
| RF01 | El sistema debera permitir registrar clientes con nombre, apellido, correo electronico, telefono, direccion y fecha de registro. |
| RF02 | El sistema debera permitir consultar la informacion de los clientes registrados. |
| RF03 | El sistema debera permitir actualizar los datos de un cliente. |
| RF04 | El sistema debera permitir eliminar o desactivar clientes cuando sea necesario. |
| RF05 | El sistema debera permitir registrar productos con nombre, categoria, precio, descripcion, ingredientes y disponibilidad. |
| RF06 | El sistema debera permitir consultar los productos registrados. |
| RF07 | El sistema debera permitir actualizar la informacion de los productos. |
| RF08 | El sistema debera permitir modificar la disponibilidad de un producto. |
| RF09 | El sistema debera permitir crear pedidos asociados a un cliente. |
| RF10 | El sistema debera permitir agregar uno o varios productos a un pedido. |
| RF11 | El sistema debera permitir registrar la cantidad de cada producto solicitado en un pedido. |
| RF12 | El sistema debera calcular el total de un pedido con base en los productos, cantidades y precios. |
| RF13 | El sistema debera permitir consultar todos los pedidos registrados. |
| RF14 | El sistema debera permitir consultar los pedidos realizados por un cliente especifico. |
| RF15 | El sistema debera permitir actualizar el estado de un pedido. |
| RF16 | El sistema debera permitir consultar los productos mas vendidos. |
| RF17 | El sistema debera permitir consultar pedidos por fecha o estado. |

## Requisitos no funcionales

| ID | Requisito no funcional |
| --- | --- |
| RNF01 | El sistema debera almacenar la informacion de manera persistente en una base de datos orientada a documentos. |
| RNF02 | La base de datos debera permitir estructuras flexibles mediante documentos, arreglos y objetos anidados. |
| RNF03 | Las consultas frecuentes, como pedidos por cliente y productos mas vendidos, deberan ejecutarse en un tiempo razonable. |
| RNF04 | El sistema debera controlar el acceso a la informacion mediante usuarios autorizados. |
| RNF05 | La informacion de clientes, productos y pedidos debera mantenerse integra y consistente. |
| RNF06 | La base de datos debera permitir aumentar la cantidad de clientes, productos y pedidos sin rediseñar completamente la estructura. |
| RNF07 | El sistema debera contar con mecanismos de respaldo de la informacion. |
| RNF08 | La aplicacion debera ser compatible con la base de datos orientada a documentos seleccionada. |
| RNF09 | La base de datos debera evitar duplicidad de informacion cuando sea posible, por ejemplo en correos electronicos de clientes. |
| RNF10 | El sistema debera conservar el historial de pedidos aunque se actualice la informacion de productos o clientes. |

## Tipo de base de datos seleccionada

Para este proyecto se propone utilizar una base de datos orientada a documentos, como MongoDB. Este tipo de base de datos almacena la informacion en documentos con una estructura similar a JSON, lo que permite representar de forma flexible datos como clientes, productos y pedidos.

Esta opcion es adecuada para la cafeteria porque un pedido puede contener varios productos dentro del mismo documento, incluyendo cantidad, precio unitario y subtotal. Esto facilita consultar rapidamente el detalle completo de un pedido sin depender de multiples tablas intermedias.

## Colecciones principales

### clientes

Representa a las personas que realizan pedidos en la cafeteria.

Documento sugerido:

```json
{
  "_id": "ObjectId",
  "nombre": "Ana",
  "apellido": "Lopez",
  "correo_electronico": "ana@example.com",
  "telefono": "5551234567",
  "direccion": "Av. Central 123",
  "fecha_registro": "2026-08-31"
}
```

### productos

Representa los articulos que ofrece la cafeteria.

Documento sugerido:

```json
{
  "_id": "ObjectId",
  "nombre": "Cafe americano",
  "categoria": "Bebidas calientes",
  "precio": 35.00,
  "descripcion": "Cafe negro preparado al momento",
  "ingredientes": ["cafe", "agua"],
  "disponibilidad": true
}
```

### pedidos

Representa una compra realizada por un cliente.

Documento sugerido:

```json
{
  "_id": "ObjectId",
  "cliente": {
    "id_cliente": "ObjectId",
    "nombre": "Ana",
    "apellido": "Lopez",
    "correo_electronico": "ana@example.com"
  },
  "fecha": "2026-08-31",
  "productos": [
    {
      "id_producto": "ObjectId",
      "nombre": "Cafe americano",
      "categoria": "Bebidas calientes",
      "cantidad": 2,
      "precio_unitario": 35.00,
      "subtotal": 70.00
    }
  ],
  "total": 70.00,
  "estado": "pendiente"
}
```

En la coleccion de pedidos se recomienda guardar informacion resumida del cliente y de los productos. Esto conserva el historial del pedido aunque despues cambie el precio de un producto o se actualicen los datos del cliente.

## Consultas esperadas

La base de datos debera permitir realizar consultas como:

- Consultar todos los clientes registrados.
- Consultar todos los productos disponibles.
- Consultar los pedidos realizados por un cliente.
- Consultar el detalle de productos de un pedido.
- Calcular el total de un pedido.
- Consultar los productos mas vendidos.
- Consultar pedidos por fecha.
- Consultar pedidos por estado.

## Alcance del proyecto

El proyecto se enfoca en el diseño de una base de datos para administrar la informacion principal de una cafeteria. La practica contempla la definicion de requisitos, entidades, relaciones y consultas necesarias para gestionar clientes, productos y pedidos.

## Modelo de base de datos orientado a documentos

Una estructura recomendada para la base de datos seria:

- Coleccion `clientes`
- Coleccion `productos`
- Coleccion `pedidos`

Los pedidos almacenan un arreglo de productos solicitados dentro del mismo documento. Cada elemento del arreglo contiene el producto, la cantidad, el precio unitario y el subtotal.

Aunque los productos tambien existen en la coleccion `productos`, dentro de cada pedido se guarda una copia resumida de la informacion necesaria para mantener el historial de la venta.

## Ventajas del modelo documental

- Permite representar pedidos completos en un solo documento.
- Facilita consultar rapidamente los productos incluidos en un pedido.
- Permite manejar ingredientes como arreglos dentro del documento del producto.
- Ofrece flexibilidad para agregar nuevos campos en el futuro.
- Reduce la necesidad de uniones complejas para consultar pedidos.
- Es adecuada para consultas frecuentes como pedidos por cliente, pedidos por estado y productos mas vendidos.
