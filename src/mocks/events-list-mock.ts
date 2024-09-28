import { eventTypes } from "@/types/events-list-types";

export const EVENTS_LIST: eventTypes[] = [
  {
    id: 1,
    name: "Evento Prueba 1",
    type: "Artístico",
    date: "2024-09-27",
    time: "15:45",
    location: {
      lat: "40.7128",
      lon: "-58.648416",
    },
    photos: [
      "https://res.cloudinary.com/dyi5til4r/image/upload/v1721516995/669c42a6fdd4ca72f282d5dc/restaurant-photos/669c42a6fdd4ca72f282d5dc/1721516995007.webp",
    ],
    description: "Descripción del evento prueba nueva schema prisma",
    amount: 0.8,
    createdAt: "2024-09-27T20:03:58.892Z",
    userId: 1,
  },
  {
    id: 2,
    name: "Evento Prueba 2",
    type: "Artístico",
    date: "2024-09-27",
    time: "16:00",
    location: {
      lat: "46.7128",
      lon: "-58.648416",
    },
    photos: [
      "https://www.iniseg.es/blog/seguridad/wp-content/uploads/2018/06/Blog-Aucal-41-820x410.png",
    ],
    description: "Descripción del evento prueba nueva schema prisma",
    amount: 1.2,
    createdAt: "2024-09-27T20:03:58.892Z",
    userId: 2,
  },
  {
    id: 3,
    name: "Evento Prueba 3",
    type: "Gastronómico",
    date: "2024-09-27",
    time: "18:30",
    location: {
      lat: "40.7128",
      lon: "-58.648416",
    },
    photos: [
      "https://elolivar.es/olivar-content/uploads/2021/06/salones-para-eventos.png",
    ],
    description: "Evento gastronómico de prueba",
    amount: 0.5,
    createdAt: "2024-09-27T12:15:00.000Z",
    userId: 3,
  },
  {
    id: 4,
    name: "Evento Prueba 4",
    type: "Deportivo",
    date: "2024-09-28",
    time: "10:00",
    location: {
      lat: "41.1234",
      lon: "-57.1234",
    },
    photos: [
      "https://www.example.com/images/deporte-evento.jpg",
    ],
    description: "Competencia deportiva de prueba",
    amount: 2.0,
    createdAt: "2024-09-28T08:00:00.000Z",
    userId: 4,
  },
  {
    id: 5,
    name: "Evento Prueba 5",
    type: "Artístico",
    date: "2024-09-28",
    time: "20:00",
    location: {
      lat: "42.1234",
      lon: "-60.5678",
    },
    photos: [
      "https://www.example.com/images/arte-evento.jpg",
    ],
    description: "Exposición artística de prueba",
    amount: 1.5,
    createdAt: "2024-09-28T19:45:00.000Z",
    userId: 5,
  },
  {
    id: 6,
    name: "Evento Prueba 6",
    type: "Gastronómico",
    date: "2024-09-30",
    time: "14:00",
    location: {
      lat: "40.9876",
      lon: "-59.1234",
    },
    photos: [
      "https://www.example.com/images/food-evento.jpg",
    ],
    description: "Feria gastronómica de prueba",
    amount: 0.3,
    createdAt: "2024-09-30T14:30:00.000Z",
    userId: 6,
  },
  {
    id: 7,
    name: "Evento Prueba 7",
    type: "Deportivo",
    date: "2024-09-30",
    time: "09:00",
    location: {
      lat: "43.5678",
      lon: "-60.9876",
    },
    photos: [
      "https://www.example.com/images/deporte-evento2.jpg",
    ],
    description: "Carrera de prueba",
    amount: 3.0,
    createdAt: "2024-09-30T09:15:00.000Z",
    userId: 7,
  },
  {
    id: 8,
    name: "Evento Prueba 8",
    type: "Artístico",
    date: "2024-09-30",
    time: "19:00",
    location: {
      lat: "40.8765",
      lon: "-59.4321",
    },
    photos: [
      "https://www.example.com/images/art-evento2.jpg",
    ],
    description: "Concierto de prueba",
    amount: 2.5,
    createdAt: "2024-09-30T18:30:00.000Z",
    userId: 8,
  }
];
