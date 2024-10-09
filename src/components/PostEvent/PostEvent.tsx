"use client";

//enviar por parametro (url) el id del usuario organizador para un getEventById
//id del evento a modificar por req.body (lo mismo para delete)
//por url el id del usuario que desea modificar su información

import React, {
  useReducer,
  useCallback,
  useEffect,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import { BiArrowBack } from "react-icons/bi";
import ModalPostEvent from "../modals/modalPostEvent/ModalPostEvent";
import Link from "next/link";
import { TbPhotoPlus } from "react-icons/tb";
import { BiCalendar } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";
import FilePhoto from "../../../public/TbPhotoPlus.svg";
import CustomModal from "../modals/modalPostEvent/CustomModal";

interface EventFormData {
  name: string;
  address: string;
  date: string;
  time: string;
  type: string;
  description: string;
  amount: string;
  capacity: string;
  lat: string;
  lon: string;
  files: File | null;
}

interface Suggestion {
  label: string;
  latitude: number;
  longitude: number;
}

type Action =
  | {
      type: "SET_FIELD";
      field: keyof EventFormData;
      value: string | File | null;
    }
  | { type: "SET_LOCATION"; location: { lat: string; lon: string } };

const initialState: EventFormData = {
  name: "",
  address: "",
  date: "",
  time: "12:00",
  type: "Gastronomico",
  description: "",
  amount: "0.3",
  capacity: "Menos de 500",
  lat: "",
  lon: "",
  files: null,
};

function formReducer(state: EventFormData, action: Action): EventFormData {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_LOCATION":
      return { ...state, lat: action.location.lat, lon: action.location.lon };
    default:
      return state;
  }
}

const PostEvent: React.FC = () => {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const [provider, setProvider] = React.useState<any>(null);
  const [showModal, setShowModal] = React.useState<any>(false);
  const [thumbnail, setThumbnail] = React.useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadProvider = async () => {
      const { OpenStreetMapProvider } = await import("leaflet-geosearch");
      const osmProvider = new OpenStreetMapProvider();
      setProvider(osmProvider);
    };
    loadProvider();
  }, []);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;

      if (
        name === "files" &&
        e.target instanceof HTMLInputElement &&
        e.target.files
      ) {
        dispatch({
          type: "SET_FIELD",
          field: "files",
          value: e.target.files[0],
        });
        setThumbnail(URL.createObjectURL(e.target.files[0]));
      } else if (name === "capacity") {
        let numericAmount = "0.3";
        switch (value) {
          case "Entre 500 y 2000":
            numericAmount = "0.5";
            break;
          case "Entre 2000 y 5000":
            numericAmount = "0.7";
            break;
          case "Más de 5000":
            numericAmount = "0.9";
            break;
          default:
            numericAmount = "0.3";
        }
        dispatch({ type: "SET_FIELD", field: "capacity", value });
        dispatch({ type: "SET_FIELD", field: "amount", value: numericAmount });
      } else {
        dispatch({
          type: "SET_FIELD",
          field: name as keyof EventFormData,
          value,
        });
      }
    },
    []
  );

  const handleAddressSearch = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      dispatch({ type: "SET_FIELD", field: "address", value });

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
    },
    [provider]
  );

  const handleSuggestionClick = useCallback((suggestion: Suggestion) => {
    dispatch({
      type: "SET_LOCATION",
      location: {
        lat: suggestion.latitude.toString(),
        lon: suggestion.longitude.toString(),
      },
    });
    dispatch({ type: "SET_FIELD", field: "address", value: suggestion.label });
    setSuggestions([]);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("time", formData.time);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("amount", formData.amount);
      formDataToSend.append("capacity", formData.capacity);
      formDataToSend.append("lat", formData.lat);
      formDataToSend.append("lon", formData.lon);

      //archivo si está presente
      if (formData.files) {
        formDataToSend.append("files", formData.files);
      }

      //petición al backend con formDataToSend en lugar de formData
      console.log("FormData enviada:", formDataToSend);

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    },
    [formData]
  );

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <main className="max-w-lg mx-auto p-4 rounded-lg bg-bgHome mb-20">
      <Link href={"/"}>
        <BiArrowBack size={30} />
      </Link>
      <form className="pt-2" onSubmit={handleSubmit}>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-3xl resize-none h-24"
          />
        </div>

        <div className="flex flex-row mb-4">
          <div className="w-full">
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

          <div className="pt-6 pl-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleChange}
              name="files"
              accept="image/*"
              className="hidden"
            />
            {
              thumbnail
                ? <img src={thumbnail} alt="thumbnail" className="w-10 h-10 cursor-pointer object-cover rounded-lg" onClick={handleFileInputClick} />
                : <FilePhoto size={30} onClick={handleFileInputClick} />
            }
          </div>
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
          className="w-full bg-createEventButton text-white py-2 rounded-full hover:bg-violet-500"
        >
          Crear evento
        </button>
      </form>
      {showModal && (
        <CustomModal onClose={() => {}} isOpen={() => {}}>
        <div className="z-50 bg-white w-full mx-6 flex flex-col items-center gap-2 p-4 shadow-lg rounded-2xl">
            <div className="relative">
              <BiCalendar className="size-28" />
              <FaCircleCheck className="absolute bottom-0 right-0 size-12 bg-white rounded-full p-0.5 text-[#07AEAF]" />
            </div>
            <p className="text-lg font-semibold">¡Evento creado con éxito!</p>
            <Link href={'./profile'} className="mt-8 w-full text-center mx-6 bg-createEventButton text-white rounded-full px-4 py-2">Entendido</Link>
          </div>
        </CustomModal>
      )}
    </main>
  );
};

export default PostEvent;
