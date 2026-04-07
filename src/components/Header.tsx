import { useState, useEffect } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { FaLink } from 'react-icons/fa';
import { personalInfo } from '../constants';
import { SongPlayer } from './SongPlayer';
import { ContactButton } from './ContactButton';
import { SteamStatus } from './SteamStatus';
import { Stories } from './Stories';

const getIconColor = (name: string, isDarkMode: boolean): string => {
  switch (name) {
    case 'Instagram':
      return '#E1306C';
    case 'Pinterest':
      return '#E60023';
    case 'Github':
      return isDarkMode ? '#FFFFFF' : '#000000';
    case 'LinkedIn':
      return '#0077B5';
    case 'Steam':
      return isDarkMode ? '#C7D5E0' : '#171A21';
    case 'SteamAccent':
      return '#00ADEE';
    default:
      return isDarkMode ? '#FFFFFF' : '#000000';
    case 'Twitch':
      return '#9146FF';
    case 'Apple':
      return isDarkMode ? '#FFFFFF' : '#000000';
  }
};

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  {/** Detectar si el modo oscuro está activo */}
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    {/* Verificar al montar */}
    checkDarkMode();

    {/* Cambios en la clase del html */}
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const {
    photoSrc,
    name,
    location,
    occupation,
    overview,
    //hobbies,
    socialLinks,
    song,
    otherLinks,
  } = personalInfo;

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
      {/* Foto */}
      <div className="self-center sm:self-start">
        <img
          src={photoSrc}
          alt={`Foto de ${name}`}
          className="w-36 sm:w-48 h-36 sm:h-48 object-cover rounded-full shadow-lg"
        />
      </div>

      {/* Información Personal */}
      <div className="flex flex-col gap-3 flex-1">
        <h1 className="text-balance font-bold text-2xl sm:text-3xl dark:text-white">{name}</h1>
        <p className="text-balance text-base sm:text-lg text-gray-600 dark:text-gray-400">{occupation}</p>

        {/* Stats */}
        <div className="flex gap-10 items-center mt-2">
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl sm:text-2xl dark:text-white">16</span>
            <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Proyectos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl sm:text-2xl dark:text-white">3+</span>
            <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Años Exp.</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl sm:text-2xl dark:text-white">15+</span>
            <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Tecnologías</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-balance text-gray-500 dark:text-gray-400 text-sm sm:text-base mt-2">{overview}</p>

        {/* Hobbies */}
        {/* <p className="text-balance text-gray-500 dark:text-gray-400 text-sm sm:text-base mt-2">{hobbies[0]}</p>
        <ul className="text-balance text-gray-500 dark:text-gray-400 text-sm sm:text-base mt-2 list-disc list-inside">
          {hobbies.slice(1).map((hobby, index) => (
            <li key={index} className="whitespace-pre-line">{hobby}</li>
          ))}
        </ul> */}

        {/* Otros enlaces */}
        {otherLinks?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {otherLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-blue-700 dark:text-blue-400 hover:underline gap-1"
              >
                <FaLink size={14} /> {link.name}
              </a>
            ))}
          </div>
        )}

        {/* Reproductor de canción */}
        {song?.url && <div className="mt-4"><SongPlayer /></div>}

        {/* Ubicación */}
        {/*<div className="flex items-center gap-3 mt-4">
          <IoLocationOutline size={22} className="dark:text-gray-300" />
          <span className="font-medium text-gray-600 dark:text-gray-300">{location}</span>
        </div>*/}

        {/* Redes Sociales*/}
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              title={link.name}
              style={{ color: getIconColor(link.name, isDarkMode) }}
              className="text-2xl hover:opacity-80 transition"
            >
              {link.icon}
            </a>
          ))}

          {/* ContactButton */}
          <ContactButton />
        </div>

        {/* Historias */}
        <div className="mt-4">
          <Stories />
        </div>

        {/* Estado de Steam */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-start sm:gap-4">
          <SteamStatus />
        </div>
      </div>
    </div>
  );
};
