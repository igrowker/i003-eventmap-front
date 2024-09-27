import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Event {
  id: number;
  name: string;
  type: string;
  date: string;
  time: string;
  location: {
    lat: string;
    lon: string;
  };
  photos: string[];
  description: string;
  amount: number;
  createdAt: string;
  userId: number;
}

interface MediaCardProps {
  event: Event;
}

const events: Event[] = [{
  "id": 1,
  "name": "Evento Prueba 1",
  "type": "Artístico",
  "date": "2024-09-12",
  "time": "15:45",
  "location": {
      "lat": "40.7128",
      "lon": "-58.648416"
  },
  "photos": [
      "https://res.cloudinary.com/dyi5til4r/image/upload/v1721516995/669c42a6fdd4ca72f282d5dc/restaurant-photos/669c42a6fdd4ca72f282d5dc/1721516995007.webp",
      "https://example.com/anotherphoto.jpg"
  ],
  "description": "Descripción del evento prueba nueva schema prisma",
  "amount": 0.8,
  "createdAt": "2024-09-15T20:03:58.892Z",
  "userId": 1
},
{
  "id": 2,
  "name": "Evento Prueba 2",
  "type": "Artístico",
  "date": "2024-09-12",
  "time": "15:45",
  "location": {
      "lat": "46.7128",
      "lon": "-58.648416"
  },
  "photos": [
      "https://res.cloudinary.com/dyi5til4r/image/upload/v1721516995/669c42a6fdd4ca72f282d5dc/restaurant-photos/669c42a6fdd4ca72f282d5dc/1721516995007.webp",
      "https://example.com/anotherphoto.jpg"
  ],
  "description": "Descripción del evento prueba nueva schema prisma",
  "amount": 0.8,
  "createdAt": "2024-09-15T20:03:58.892Z",
  "userId": 1
},
{
  "id": 3,
  "name": "Evento Prueba 3",
  "type": "Deportivo",
  "date": "2024-09-12",
  "time": "15:45",
  "location": {
      "lat": "40.7128",
      "lon": "-58.648416"
  },
  "photos": [
      "https://res.cloudinary.com/dyi5til4r/image/upload/v1721516995/669c42a6fdd4ca72f282d5dc/restaurant-photos/669c42a6fdd4ca72f282d5dc/1721516995007.webp",
      "https://example.com/anotherphoto.jpg"
  ],
  "description": "Descripción del evento prueba nueva schema prisma",
  "amount": 0.8,
  "createdAt": "2024-09-15T20:03:58.892Z",
  "userId": 1
},
{
  "id": 4,
  "name": "Evento Prueba 4",
  "type": "Gastrónomico",
  "date": "2024-09-12",
  "time": "15:45",
  "location": {
      "lat": "40.7128",
      "lon": "-58.648416"
  },
  "photos": [
      "https://res.cloudinary.com/dyi5til4r/image/upload/v1721516995/669c42a6fdd4ca72f282d5dc/restaurant-photos/669c42a6fdd4ca72f282d5dc/1721516995007.webp",
      "https://example.com/anotherphoto.jpg"
  ],
  "description": "Descripción del evento prueba nueva schema prisma",
  "amount": 0.8,
  "createdAt": "2024-09-15T20:03:58.892Z",
  "userId": 1
}];

const MediaCard: React.FC<MediaCardProps> = ({ event }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={event.photos[0]}
        alt={event.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ubicación: {event.location.lat}, {event.location.lon}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Compartir</Button>
        <Button size="small">Aprender más</Button>
      </CardActions>
    </Card>
  );
};

const EventList: React.FC = () => {
  return (
    <div>
      {events.map((event) => (
        <MediaCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;