![portada](logo_eventmap.png)
<a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://motor.elpais.com/tecnologia/compartir-ubicacion-en-google-maps-todas-las-formas-de-hacerlo/" alt="Logo" width="80" height="80">
  </a>

# Introducción:

**Descripción General:** 

El problema:
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

*Disponibilidad: Se despliega la base de datos en Neon para
aprovechar sus características de escalabilidad y alta disponibilidad.

*Respecto de la funcionalidad:
La aplicación no se encarga de dar la ruta más corta o
económica, para ello el conductor utiliza las herramientas
habituales como Waze o Google Maps.


## Demo
https://eventmap-mvp.vercel.app/



## Estado Actual del Proyecto:

**1. Funcionalidades y Componentes Implementados:**

- **Autenticación y Sesiones:**
  - Se ha implementado un sistema de autenticación que permite a los usuarios registrarse, iniciar sesión y cerrar sesión. La lógica de autenticación se maneja a través de un contexto de usuario y hooks personalizados.

- **Navegación y UI:**
  - El proyecto incluye una barra de navegación que utiliza un diseño responsivo con un menú hamburguesa animado. Se ha implementado la funcionalidad de mostrar y ocultar el menú en dispositivos móviles utilizando solo CSS.
  - Se han creado componentes reutilizables para la presentación de proyectos y acciones del usuario.

- **Búsqueda y Filtros:**
  - La sección de oportunidades incluye un sistema de búsqueda y filtrado de proyectos, permitiendo a los usuarios buscar proyectos específicos por título. La lógica de filtrado se maneja con un hook de estado y se actualiza dinámicamente según la entrada del usuario.

- **Publicación y Postulación de Proyectos:**
  - Los perfiles de empresa pueden publicar y editar proyectos detallados en la plataforma, especificando requisitos, presupuestos y otros detalles relevantes. Los perfiles de freelancers pueden buscar estos proyectos y postularse, facilitando la conexión entre talentos y oportunidades laborales.

- **Perfiles editables:**
  - Los perfiles de empresa y freelancer pueden ser editados y actualizados en cualquier momento asegurando una mejor dinámica y conexión entre ambas partes.

- **Carga y Estado:**
  - Un componente de carga muestra una animación de carga mientras los datos están siendo recuperados del backend.

**2. Estado de Desarrollo y Consideraciones:**

- **Responsividad:**
  - La interfaz se ha optimizado para ser responsiva, con un enfoque en mejorar la experiencia de usuario en dispositivos móviles. Las clases de Bootstrap se han utilizado para asegurar la adaptabilidad, y se ha añadido CSS personalizado para elementos específicos.

- **Optimización de Código:**
  - Se ha mantenido un enfoque modular, utilizando componentes y hooks personalizados para una mejor organización y reutilización del código.

- **Estilización:**
  - Se han utilizado variables CSS para gestionar colores, fuentes y otros estilos, lo que facilita el mantenimiento y la consistencia del diseño.

**3. Próximos Pasos:**

- **Integración de Funcionalidades Avanzadas:**
  - Implementación de funcionalidades avanzadas como notificaciones, chat en vivo entre freelancers y empleadores, y un sistema de calificaciones y reseñas.

- **Sistema de Pago:**
  - Se planea implementar un sistema de pago que permita a las empresas realizar pagos a los freelancers de manera segura y eficiente a través de la plataforma. Esto incluirá la integración de métodos de pago populares y el manejo de transacciones financieras dentro del sistema.

- **Páginas de Información:**
  - Se completarán y mejorarán las páginas de información relacionadas con TalentPlace, incluyendo formularios de contacto, información respecto al uso de la plataforma. Esto ayudará a los usuarios a comprender mejor los servicios ofrecidos y cómo aprovecharlos al máximo.





### Tecnologías


- Frontend:

  - **Typescript**
  - **Next**
  - **Vite Js**
  - **Leaflet**
  - **Zustand**

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
| `Back End`       | Santiago Balbarey       | [![Github]](https://github.com/SashaFran) [![linkedin]](https://www.linkedin.com/in/sasha-ailen-franchini/)           |                               |
| `Back End`       | Ulises Rodriguez      | [![Github]](https://github.com/SashaFran) [![linkedin]](https://www.linkedin.com/in/sasha-ailen-franchini/)           | 
| `Front End`      | Gabriel Aviles     | [![GitHub]](https://github.com/LucaasN) [![linkedin]](https://www.linkedin.com/in/lucas-n-nunez/)                      |
| `Front End`      | Christian Zamora   | [![GitHub]](https://github.com/JoaquinxHerrera) [![linkedin]](https://www.linkedin.com/in/joaquinherrera1/)                      |
| `Front End`      | Franco Huayller       | [![GitHub]](https://github.com/ParkerPiter) [![linkedin]](https://www.linkedin.com/in/gabriel-lea-n/)                             |
| `Fullstack`      | Nicolás Agüero       | [![Github]](https://github.com/XabierGallardo) [![linkedin]](https://www.linkedin.com/in/javier-rodriguez-3267712b2/)           |
| `QA`             | Mariana Carmona       | [![Github]](https://github.com/Marianoafx22) [![linkedin]](https://www.linkedin.com/in/mariano-sosa-alvarez-a52440284/)           |
| `Ux/Ui`          | Sol Gayarin       | [![Github]](https://github.com/Marianoafx22) [![linkedin]](https://www.linkedin.com/in/mariano-sosa-alvarez-a52440284/)           |
| `Ux/Ui`          | Justina Cid       | [![Github]](https://github.com/Marianoafx22) [![linkedin]](https://www.linkedin.com/in/mariano-sosa-alvarez-a52440284/)           |
| `PM`             | Pamela Sol Pilotti      | [![Github]](https://github.com/Marianoafx22) [![linkedin]](https://www.linkedin.com/in/mariano-sosa-alvarez-a52440284/)           |
| `Lider Tecnico`  | Cesar Augusto Ausa Vasquez | [![GitHub]](https://github.com/DEV-AusA) [![linkedin]](https://www.linkedin.com/in/dev-ausa//) |
| `DevOps`         | Adrián Ramos         | [![GitHub]](https://github.com/aramos20)  |


