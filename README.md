# Plataforma de pedidos de Cafe Central

## Descripcion del proyecto

Cafe Central desea implementar un sistema para administrar sus clientes, productos y pedidos. Actualmente la informacion se registra en hojas de calculo, lo que dificulta consultar rapidamente los pedidos de los clientes, conocer los productos mas vendidos y mantener la informacion actualizada.

El objetivo de este proyecto es proponer una base de datos que permita almacenar la informacion de la cafeteria de forma persistente, organizada y flexible, facilitando consultas frecuentes sobre clientes, productos y pedidos.

## Problematica

La cafeteria presenta los siguientes problemas:

- La informacion se encuentra dispersa en hojas de calculo.
- Es dificil consultar rapidamente los pedidos realizados por un cliente.
- No existe una forma eficiente de conocer los productos mas vendidos.
- La informacion de clientes, productos y pedidos puede quedar desactualizada.
- El crecimiento de registros dificulta la administracion manual de los datos.

## Objetivo general

Diseñar una base de datos para una plataforma de pedidos de una cafeteria que permita registrar, consultar, actualizar y administrar clientes, productos y pedidos de manera eficiente.

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
| RNF01 | El sistema debera almacenar la informacion de manera persistente en una base de datos. |
| RNF02 | La base de datos debera organizar la informacion de clientes, productos y pedidos de forma clara y flexible. |
| RNF03 | Las consultas frecuentes, como pedidos por cliente y productos mas vendidos, deberan ejecutarse en un tiempo razonable. |
| RNF04 | El sistema debera controlar el acceso a la informacion mediante usuarios autorizados. |
| RNF05 | La informacion de clientes, productos y pedidos debera mantenerse integra y consistente. |
| RNF06 | La base de datos debera permitir aumentar la cantidad de clientes, productos y pedidos sin rediseñar completamente la estructura. |
| RNF07 | El sistema debera contar con mecanismos de respaldo de la informacion. |
| RNF08 | La aplicacion debera ser compatible con la base de datos seleccionada. |
| RNF09 | La base de datos debera evitar duplicidad de informacion cuando sea posible, por ejemplo en correos electronicos de clientes. |
| RNF10 | El sistema debera conservar el historial de pedidos aunque se actualice la informacion de productos o clientes. |

## Entidades principales

### Cliente

Representa a las personas que realizan pedidos en la cafeteria.

Campos sugeridos:

- id_cliente
- nombre
- apellido
- correo_electronico
- telefono
- direccion
- fecha_registro

### Producto

Representa los articulos que ofrece la cafeteria.

Campos sugeridos:

- id_producto
- nombre
- categoria
- precio
- descripcion
- ingredientes
- disponibilidad

### Pedido

Representa una compra realizada por un cliente.

Campos sugeridos:

- id_pedido
- id_cliente
- fecha
- total
- estado

### DetallePedido

Representa los productos incluidos dentro de un pedido.

Campos sugeridos:

- id_detalle
- id_pedido
- id_producto
- cantidad
- precio_unitario
- subtotal

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

## Posible modelo de base de datos

Una estructura recomendada para la base de datos seria:

- Cliente 1 a N Pedido
- Pedido 1 a N DetallePedido
- Producto 1 a N DetallePedido

Esto permite que un cliente tenga varios pedidos, que un pedido incluya varios productos y que un producto pueda aparecer en diferentes pedidos.
