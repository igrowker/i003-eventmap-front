"use client";

import React from "react";
import { useState } from "react";

type EventFormData = {
  name: string;
  address: string;
  date: string;
  type: "Gastronomico" | "Artistico" | "Deportivo";
  lat: string;
  lon: string;
};

export default function PostEvent() {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    address: "",
    date: "",
    type: "Gastronomico",
    lat: "",
    lon: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //POST al backend
    try {
      const response = await fetch("endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          location: [{ lat: formData.lat, lon: formData.lon }],
        }),
      });

      if (response.ok) {
        console.log("Evento enviado con éxito");
      } else {
        console.error("Error al enviar el evento");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del evento</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Dirección del evento</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Fecha del evento</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Tipo de evento</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="Gastronomico">Gastronómico</option>
          <option value="Artistico">Artístico</option>
          <option value="Deportivo">Deportivo</option>
        </select>
      </div>

      {/* Hablar con christian para ver como recuperar latitud y longitud de abajo. */}
      {/* Buscar la forma de convertir direccion en lat y lon, georoutingmachine */}

      <div>
        <label>Latitud</label>
        <input
          type="text"
          name="lat"
          value={formData.lat}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Longitud</label>
        <input
          type="text"
          name="lon"
          value={formData.lon}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Agregar evento</button>
    </form>
  );
}
