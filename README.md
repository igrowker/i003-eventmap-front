
![portada](/src/assets/images/Eventmap1.png)
![portada](/src/assets/images/Eventmap2.png)




# Introducción:

**Descripción General:** 

**El problema:**
Los conductores de aplicaciones de pasajeros (ej. Uber, Didi, Cabify,
etc) a veces salen a dar vueltas sin saber exactamente dónde y cuándo
ir. Esto implica una inversión de tiempo y dinero sin un retorno de
inversión claro y conciso.
Un conductor que desde el Gran Buenos Aires viaja hacia CABA sin
tener un destino concreto, y además sin saber qué eventos se
desarrollan en la zona, es un conductor que va “a ciegas” por la ciudad
esperando conseguir un pasajero.
Dada la cantidad de conductores de estas aplicaciones, este problema
no solo resulta en un desperdicio enorme de recursos personales como
combustible y tiempo, sino que también contribuye al aumento de la
congestión vehicular y a la contaminación ambiental, agravando los
problemas de sostenibilidad en la ciudad.
La falta de información precisa y actualizada sobre la demanda de
pasajeros también incrementa innecesariamente la huella de carbono,
haciendo evidente la necesidad urgente de una solución digital
eficiente.

**Solución Propuesta:**

Para mitigar los problemas de los conductores, nuestro sponsor
invitado Sin Jr No Hay Sr propone crear una aplicación de mapa tipo
heatmaps (ej. Windy) con los eventos de las ciudades, con un timeline
de hasta 7 días donde se muestren las zonas de posible alta demanda.
Esto permite a los conductores acercarse a zonas como estadios,
teatros, etc.., sabiendo que muy posiblemente allí alguien esté pidiendo
el servicio a través de las apps.
Los datos de estos eventos y espectáculos son públicos (y normalmente
se publican con anticipación), a saber: recitales, partidos de fútbol y
otros eventos deportivos, obras de teatro, eventos en vivo y similares.
Todo esto permite trazar una idea desde dónde y cuándo ir con el
vehículo, y así poder aumentar la posibilidad de un buen ROI al salir a
trabajar en estas aplicaciones de movilidad.


## Características principales
* Mapas: Información clara y detallada sobre eventos con sus respectivas coordenas e
  información correspondiente constrastadas con OpenStreetMap

* Autenticación: Registro y login para Organizadores de eventos.

* Escalabilidad: Se considera la posibilidad de utilizar caché para
mejorar el rendimiento del servicio de heatmap.

* Mobile first : la aplicacion está diseñada especificamente para dispositivos mobiles

* Seguridad: Implementar autenticación y autorización para los
endpoints de creación, actualización y eliminación de eventos.

* Disponibilidad: Se despliega la base de datos en Neon para
aprovechar sus características de escalabilidad y alta disponibilidad.

* Respecto de la funcionalidad:
La aplicación no se encarga de dar la ruta más corta o
económica, para ello el conductor utiliza las herramientas
habituales como Waze o Google Maps.


## Demo
https://eventmap-mvp.vercel.app/



## Estado Actual del Proyecto:

**1. Funcionalidades y Componentes Implementados:**

- **Autenticación y Sesiones:**
  - Se ha implementado un sistema de autenticación que permite a los organizadores de eventos registrarse, dar de alta o modificar un evento a promocionar. La lógica de autenticación se maneja a través de un contexto de usuario y hooks personalizados.

- **Navegación y UI:**
  - El proyecto incluye una barra de navegación que utiliza un diseño responsivo para mobile. 
  - Se han creado componentes reutilizables para la presentación de proyectos y acciones del usuario.
  - Para el diseño de EventMap, optamos por ajustar la paleta de colores y el logo, buscando que la interfaz fuera menos impactante visualmente para los conductores, de modo que no experimenten distracciones mientras conducen. 

- **Búsqueda y Filtros:**
  - Se despliega un menú de filtrado donde el usuario podrá seleccionar distintas categorias y verificar los elementos que se despliegan de las mismas

- **Carga y Estado:**
  - Un componente de carga muestra una animación de carga mientras los datos están siendo recuperados del backend.

- **Mapas:**
- Se muestra un mapa interactivo con capas de eventos que
  indiquen la posible demanda.
- El mapa permite seleccionar un rango de tiempo dentro de los
  próximos 7 días.
- Las zonas con alta demanda están representadas mediante
  un mapa de calor (Heatmap)

**2. Estado de Desarrollo y Consideraciones:**

- **Responsividad:**
  - La interfaz se ha optimizado para ser mobile First, ya que la app está integramente diseñada para su uso en dispositivos móviles.
    
- **Optimización de Código:**
  - Se ha implementado Typescript, ademas de componentes y hooks personalizados para una mejor organización y reutilización del código.

- **Estilización:**
  - Se han utilizado Tailwind para gestionar colores, fuentes y otros estilos, lo que facilita el mantenimiento y la consistencia del diseño.




### Tecnologías


- Frontend:

  - **Typescript**
  - **Next**
  - **Vite Js**
  - **Leaflet**
  - **Zustand**

### Tecnologías

- Backend:

  - **Nest**
  - **Neont**
  - **Class-Validator**
  - **Bcrypt y JWT**
  - **Jest , SuperTest , Postman**

### Repositorio de FrontEnd: 
[FrontEnd  Github]https://github.com/igrowker/i003-eventmap-front


### Repositorio de BackEnd:
[Backend  Github](: https://github.com/igrowker/i003-eventmap-back).


### Uso de la app-web

1. Clonar el repositorio desde GitHub.

```bash
   git clone https://github.com/igrowker/i003-eventmap-front.git
```

2. Asegurarse que se está en la carpeta correcta para instala las dependencias.

```bash
    npm install
```

3. Ejecuta el proyecto.

```bash
    npm run dev
```




## Equipo:

| Rol               | Nombre               | Redes                                                                                                                             |
| :---------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `Back End`       | Octavio Quintero       | [![GitHub]](https://github.com/octa-quintero) [![linkedin]](https://www.linkedin.com/in/octavio-quintero/)                               |
| `Back End`       | Santiago Balbarey       | [![Github]](https://github.com/balbito) [![linkedin]](https://www.linkedin.com/in/santiagobalbarrey/)           |                               |
| `Back End`       | Ulises Rodriguez      | [![Github]](https://github.com/Ulises-Rodriguez-809) [![linkedin]](https://www.linkedin.com/in/ulises-rodriguez-desarrolloweb-fullstack/)           | 
| `Front End`      | Gabriel Aviles     | [![GitHub]](https://github.com/Gavbriel015) [![linkedin]](https://www.linkedin.com/in/gabriel-aviles-031465321/)                      |
| `Front End`      | Christian Zamora   | [![GitHub]](https://github.com/christianzamher) [![linkedin]](https://www.linkedin.com/in/christianzamorahermida/)                      |
| `Front End`      | Franco Huayller       | [![GitHub]](https://github.com/fhuayller) [![linkedin]](https://www.linkedin.com/in/franco-huayller-a80087235/)                             |
| `Fullstack`      | Nicolás Agüero       | [![Github]](https://github.com/nicolasAguero99) [![linkedin]](https://www.linkedin.com/in/nicolas-aguero99/)           |
| `QA`             | Mariana Carmona       | [![Github]](https://github.com/Mar2303) [![linkedin]](https://www.linkedin.com/in/mariana-carmona/)           |
| `Ux/Ui`          | Sol Gayarin       | [![Github]](https://github.com/SolGayarin) [![linkedin]](https://www.linkedin.com/in/sol-gayarin/)           |
| `Ux/Ui`          | Justina Cid       | [![Github]](https://github.com/Juscid) [![linkedin]](https://www.linkedin.com/in/justinacid/)           |
| `PM`             | Pamela Sol Pilotti      | [![Github]](https://github.com/Pamela198713) [![linkedin]](https://www.linkedin.com/in/pamela-sol-pilotti)           |
| `Lider Tecnico`  | Cesar Augusto Ausa Vasquez | [![GitHub]](https://github.com/DEV-AusA) [![linkedin]](https://www.linkedin.com/in/dev-ausa/) |
| `DevOps`         | Adrián Ramos         | [![GitHub]](https://github.com/aramos20)  | [![linkedin]](https://www.linkedin.com/in/adri%C3%A1nramos/) |


