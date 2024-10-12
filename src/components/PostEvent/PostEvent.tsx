"use client";
import React, {
  useCallback,
  useEffect,
  FormEvent,
  useRef,
  useState,
} from "react";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import { BiCalendar } from "react-icons/bi";
import { FaCircleCheck } from "react-icons/fa6";
import FilePhoto from "../../../public/TbPhotoPlus.svg";
import CustomModal from "../modals/modalPostEvent/CustomModal";
import { useUserContext } from "../UserContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { MdPhoto } from "react-icons/md";
import Image from "next/image";

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
  files: File[];
}

type Suggestion = {
  display_name: string;
  lat: string;
  lon: string;
};

const initialFormData: EventFormData = {
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
  files: [] as File[],
};

const PostEvent: React.FC = () => {
  const [showModal, setShowModal] = React.useState<any>(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const { userProfile, setUserProfile } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [query, setQuery] = useState<string>(""); // input para la API
  const [suggestions, setSuggestions] = useState<any[]>([]); // sugerencias de la API
  const [city, setCity] = useState<string>(", Buenos Aires,");
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // verify token
  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get("auth_token");
      const storedProfile = localStorage.getItem("user_profile");

      if (token && storedProfile) {
        const currentUser = JSON.parse(storedProfile);
        setUserProfile(currentUser);
        setIsCheckingToken(false);
      } else {
        router.push("/login");
      }

    };

    checkToken();
  }, [setUserProfile, router]);

  //handle de la sugerencia de la API
  const handleSugeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    //settings viewbox=left, top, right, bottom
    const viewboxPBA= "-63.393, -33.033, -57.092, -40.882"
    const viewboxCABA= "-58.531, -34.512, -58.335, -34.705"
    const viewBox = city === ", Buenos Aires," ? viewboxPBA : viewboxCABA;

    if (value.length > 2) {

      const url = `https://nominatim.openstreetmap.org/search?q=${value}&format=json&limit=5&addressdetails=1&bounded=1&viewbox=${viewBox}&accept-language=es`;
      const response = await fetch(url);
      const data = await response.json();

      //filtro x mapa?
      const filteredSuggestions = data.filter((suggestion: any) => {
        const sugerencias = suggestion.display_name.includes(city)        
        return sugerencias;
      });      

      setSuggestions(filteredSuggestions);

    } else {
      setSuggestions([]); // limpiar sugerencias si la consulta es corta
    }
  };

  // handle cuando el usuario seleccion la direccion de la API
  const handleSelectSuggestion = (suggestion: Suggestion) => {
    setFormData({
      ...formData,
      address: suggestion.display_name,
      lat: suggestion.lat,
      lon: suggestion.lon,
    });
    setQuery(suggestion.display_name); // Actualizar el input con la dirección seleccionada
    setSuggestions([]); // Limpiar las sugerencias después de la selección
  };

  //handle de la ciudad seleccionada
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length + formData.files.length > 3) {
        alert('Solo puedes seleccionar un máximo de 3 imágenes');
        return;
      }
      setFormData({
        ...formData,
        files: [...formData.files, ...selectedFiles].slice(0, 3), // Asegura que solo haya 3 imágenes
      });
    }
  };

  //handle del icono de image
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //eliminar imagen
  const removeImage = (index: number) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({ ...formData, files: newFiles });
  };

  //handle del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {

    let numericAmount = formData.amount;

    if (e.target.name === "capacity") {
      switch (e.target.value) {
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
    };
      
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      //conversion de la capacidad
      amount: numericAmount,
    });
  };
  
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const formDataToSend = new FormData();

      if (userProfile) {
        formDataToSend.append("userId", userProfile?.id );
      }

      formDataToSend.append("name", formData.name);
      formDataToSend.append("addres", formData.address);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("time", formData.time);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("amount", formData.amount);
      formDataToSend.append("capacity", formData.capacity);
      formDataToSend.append("lat", formData.lat);
      formDataToSend.append("lon", formData.lon);

      //cargar varios files
      formData.files.forEach((file) => {
        formDataToSend.append("files", file);
      }); 
      
      //envio de formulario completo
      const postEvent = async () => {
        setLoading(true);
        const token = Cookies.get("auth_token");
        const storedProfile = localStorage.getItem("user_profile");

        try {
          const req = await fetch(
            `${API_URL}/events/${userProfile?.id}`,
            {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${token}`
              },
              body: formDataToSend,
            }
          );
          //limipo form
          setFormData(initialFormData);
          
          const response = await req.json();
          if (req.ok && token && storedProfile) {
            setShowModal(true);
            const dataProfileUser = await JSON.parse(storedProfile);
            dataProfileUser.events.push(response);

            //cargo el nuevo profile con el nuevo evento
            localStorage.setItem('user_profile', JSON.stringify(dataProfileUser));
            
            window.setTimeout(() => {
              setShowModal(false);
              router.push("/profile");
            }, 2000)
            
          }
        } catch (error) {
          console.error("Error al enviar los datos", error);
        } finally {
          setLoading(false);
        }
      };

      postEvent();
    },
    [formData]
  );

  return (
    isCheckingToken
    ?
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-current" />
    </div>
    :
    loading ? (
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-current" />
    </div>
    ) :
    <main className="max-w-lg mx-auto p-4 rounded-lg bg-white mb-20">
      <button onClick={() => router.back()} className="btn-back">
        <BiArrowBack size={30} />
      </button>
      <form className="pt-2" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-8">Crear evento</h1>

        <div className="mb-4">
          <label className="text-gray-700 text-sm">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-full"
            />
          </div>
        </div>

        <div className="w-full mb-4">
          <label className="block text-gray-700">Seleccione Ciudad</label>
          <select
            name="type"
            value={city}
            onChange={handleCityChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-full"
          >
            <option value=", Buenos Aires,">Gran Buenos Aires</option>
            <option value=", Ciudad Autónoma de Buenos Aires,">Ciudad Autónoma de Buenos Aires</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            value={query}
            onChange={handleSugeChange}
            placeholder="Escribe una dirección"
            className="w-full px-3 py-2 border border-gray-400 rounded-full"
          />

          {/* sugerencias de la API de open */}
          {suggestions.length > 0 && (
            <ul className="border mt-2 max-h-40 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {suggestion.display_name}
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
            onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <FilePhoto size={30} onClick={handleFileInputClick} />
          </div>          
        </div>

        {/* imagenes cargadas */}
        {formData.files.length > 0 && (
          <div className="mt-4 mb-4">
              {formData.files.map((file, index) => (
                <div key={index} className="flex m-1 items-center">
                  <MdPhoto
                  size={24}
                  className="text-gray-600"
                   />                  
                  <div className="w-40">
                    <h5 className="text-gray-600 ms-3 overflow-hidden whitespace-nowrap text-ellipsis">{file.name}</h5>
                  </div>
                  <div className="ms-2 flex items-center">
                    <button
                      type="button"
                      className="border border-gray-600 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-base"
                      onClick={() => removeImage(index)}
                    >
                      <span className="mb-1">x</span>
                    </button>
                  </div>
                  <div className="relative w-20">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      width={80}
                      height={80}
                      className={`absolute w-20 h-20 ms-6 object-cover rounded-xl border border-white
                        ${index === 0 ? "top-image1" : index === 1 ? "top-image2" : "top-image3" }
                        ${index === 0 ? "left-image1" : index === 1 ? "left-image2" : "left-image3" }
                        `}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="mt-8 mb-4">
          <label className="block text-gray-700">Capacidad</label>
          <select
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
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
