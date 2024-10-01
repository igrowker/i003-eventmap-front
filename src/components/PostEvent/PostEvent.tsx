"use client";

import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";

type EventFormData = {
  name: string;
  address: string;
  date: string;
  type: "Gastronomico" | "Artistico" | "Deportivo";
  time: string;
  description: string;
  capacity: "Menos de 500" | "Entre 500 y 2000" | "Entre 2000 y 5000" | "Más de 5000";
  location: { lat: string; lon: string };
};

export default function PostEvent() {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    address: "",
    date: "",
    type: "Gastronomico",
    time: "",
    description: "",
    capacity: "Menos de 500",
    location: { lat: "", lon: "" },
  });

  const [suggestions, setSuggestions] = useState<{ label: string; latitude: number; longitude: number }[]>([]);
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    const loadProvider = async () => {
      const { OpenStreetMapProvider } = await import('leaflet-geosearch');
      const osmProvider = new OpenStreetMapProvider();
      setProvider(osmProvider);
    };

    loadProvider();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "address" && provider) {
      fetchSuggestions(e.target.value);
    }
  };

  const fetchSuggestions = async (input: string) => {
    if (!input || !provider) {
      setSuggestions([]);
      return;
    }

    const results = await provider.search({ query: input });
    const formattedResults = results.map((result: { label: any; y: any; x: any; }) => ({
      label: result.label,
      latitude: result.y,
      longitude: result.x,
    }));

    setSuggestions(formattedResults);
  };

  const handleSuggestionClick = (suggestion: { label: string; latitude: number; longitude: number }) => {
    setFormData((prevData) => ({
      ...prevData,
      address: suggestion.label,
      location: {
        lat: suggestion.latitude.toString(),
        lon: suggestion.longitude.toString(),
      },
    }));
    setSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData); //enviar formData al backend
  };

  return (
    <main className="max-w-lg mx-auto p-4 rounded-lg bg-bgHome">
      <BiArrowBack size={30} />
      <form className="pt-5" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-8">Crear evento</h1>

        <div className="mb-4">
          <label className="text-gray-700 text-sm">Nombre</label>
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

        <div className="mb-4 relative">
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
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {suggestion.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción del evento"
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-3xl resize-none h-32"
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

        <button
          type="submit"
          className="w-full bg-createEventButton text-white py-2 rounded-full"
        >
          Publicar
        </button>
      </form>
    </main>
  );
}