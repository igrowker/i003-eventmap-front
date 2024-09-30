"use client";

import React from "react";
import { useState } from "react";

type EventFormData = {
  name: string;
  address: string;
  date: string;
  type: "Gastronomico" | "Artistico" | "Deportivo";
  time: string
  description: string
  capacity: "Menos de 500" | "Entre 500 y 2000" | "Entre 2000 y 5000" | "Más de 5000";
};

export default function PostEvent() {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    address: "",
    date: "",
    type: "Gastronomico",
    time:"",
    description: "",
    capacity: "Menos de 500",
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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-8">Crear evento</h1>

      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre del evento"
          required
          className="w-full px-3 py-2 border border-gray-400 rounded-full"
        />
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="w-1/2">
          <label className="block text-gray-700">Fecha</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-full"
          />
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700">Hora</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-full"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Dirección</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Dirección del evento"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Descripción</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción del evento"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Tipo de evento</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-full"
        >
          <option value="Gastronomico">Gastronómico</option>
          <option value="Artistico">Artístico</option>
          <option value="Deportivo">Deportivo</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Capacidad</label>
        <select
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-full"
        >
          <option value="Menos de 500">Menos de 500</option>
          <option value="Entre 500 y 2000">Entre 500 y 2000</option>
          <option value="Entre 2000 y 5000">Entre 2000 y 5000</option>
          <option value="Más de 5000">Más de 5000</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
        Agregar evento
      </button>
    </form>
  );
}