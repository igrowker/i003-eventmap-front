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
  amount: string;
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
    amount: "Menos de 500",
    location: { lat: "", lon: "" },
  });

  const [suggestions, setSuggestions] = useState<
    { label: string; latitude: number; longitude: number }[]
  >([]);
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    const loadProvider = async () => {
      const { OpenStreetMapProvider } = await import("leaflet-geosearch");
      const osmProvider = new OpenStreetMapProvider();
      setProvider(osmProvider);
    };

    loadProvider();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "amount") {
      let numericAmount: number;
      switch (value) {
        case "Menos de 500":
          numericAmount = 0.3;
          break;
        case "Entre 500 y 2000":
          numericAmount = 0.5;
          break;
        case "Entre 2000 y 5000":
          numericAmount = 0.7;
          break;
        case "Más de 5000":
          numericAmount = 0.9;
          break;
        default:
          numericAmount = 0.3;
      }

      setFormData((prevData) => ({
        ...prevData,
        amount: value,
      }));
      console.log("amount:", numericAmount);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  //al hacer click en una sugerencia de dirección
  const handleSuggestionClick = (suggestion: {
    label: string;
    latitude: number;
    longitude: number;
  }) => {
    setFormData((prevData) => ({
      ...prevData,
      address: suggestion.label,
      location: {
        lat: suggestion.latitude.toString(),
        lon: suggestion.longitude.toString(),
      },
    }));

    console.log("Dirección seleccionada:", suggestion.label);
    console.log(
      "Latitud:",
      suggestion.latitude,
      "Longitud:",
      suggestion.longitude
    );

    setSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let numericAmount: number;
    switch (formData.amount) {
      case "Menos de 500":
        numericAmount = 0.3;
        break;
      case "Entre 500 y 2000":
        numericAmount = 0.5;
        break;
      case "Entre 2000 y 5000":
        numericAmount = 0.7;
        break;
      case "Más de 5000":
        numericAmount = 0.9;
        break;
      default:
        numericAmount = 0.3;
    }

    const finalData = {
      ...formData,
      amount: numericAmount, //valor numérico al backend
    };

    console.log("Final formData:", finalData);
  };

  //búsqueda de direcciones
  const handleAddressSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: value,
    }));

    if (provider && value.length > 3) {
      const results = await provider.search({ query: value });
      setSuggestions(
        results.map((result: any) => ({
          label: result.label,
          latitude: result.y,
          longitude: result.x,
        }))
      );
    } else {
      setSuggestions([]);
    }
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
            onChange={handleAddressSearch}
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
            name="amount"
            value={formData.amount}
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
          className="w-full bg-createEventButton text-white py-2 rounded-full hover:bg-violet-500"
        >
          Crear evento
        </button>
      </form>
    </main>
  );
};