import { useEffect, useState } from "react";

export const SteamStatus = () => {
  const [player, setPlayer] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Detectar si es Vercel o dominio propio
  const getSteamEndpoint = () => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      // Detectar Vercel por dominio .vercel.app o mi dominio propio
      if (hostname.includes("vercel.app") || hostname.includes("devmike117.com")) {
        return "/api/sendSteamStatus";
      }
    }
    // Por defecto, usar la ruta de Vercel/api
    return "/api/sendSteamStatus";
  };

  const fetchSteamStatus = async () => {
    try {
      const res = await fetch(getSteamEndpoint());
      const data = await res.json();

      if (data?.response?.players?.length > 0) {
        setPlayer(data.response.players[0]);
        setError(null);
      } else {
        setError("No player data found.");
        setPlayer(null);
      }
    } catch (e) {
      console.error("Error fetching Steam:", e);
      setError("Error fetching Steam.");
      setPlayer(null);
    }
  };

  useEffect(() => {
    fetchSteamStatus();
    const interval = setInterval(fetchSteamStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (state: number) => {
    switch (state) {
      case 1: return "bg-green-500";   
      case 2: return "bg-red-500";     
      case 3: return "bg-yellow-500";  
      default: return "bg-gray-400";   
    }
  };

  return (
    <div className="p-4 rounded-2xl transition-all duration-300 w-full sm:w-80">
      {!player && !error && (
        <p className="text-gray-500 dark:text-gray-400 text-sm">Cargando estado de Steam...</p>
      )}
      {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}

      {player && (
        <div className="flex flex-col gap-3">
          {/* Avatar + nombre + circulito de estado */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={player.avatarfull}
                alt={player.personaname}
                className="w-14 h-14 rounded-xl shadow"
              />
              <span
                className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border border-white dark:border-gray-900 ${getStatusColor(player.personastate)}`}
              ></span>
            </div>
            <div>
              <p className="font-semibold text-base text-gray-900 dark:text-white">{player.personaname}</p>
              <p
                className={`text-sm 
                  ${player.personastate === 0 ? "text-gray-500 dark:text-gray-400" : ""}
                  ${player.personastate === 1 ? "text-green-600 dark:text-green-400" : ""}
                  ${player.personastate === 2 ? "text-red-600 dark:text-red-400" : ""}
                  ${player.personastate === 3 ? "text-yellow-600 dark:text-yellow-400" : ""}
                  ${player.personastate === 4 ? "text-gray-500 dark:text-gray-400" : ""}
                  ${![0,1,2,3,4].includes(player.personastate) ? "text-gray-400 dark:text-gray-500" : ""}
                `}
              >
                Estado: {
                  player.personastate === 0 ? "Desconectado" :
                  player.personastate === 1 ? "En línea" :
                  player.personastate === 2 ? "Ocupado" :
                  player.personastate === 3 ? "Ausente" :
                  player.personastate === 4 ? "Durmiendo" :
                  ""
                }
              </p>
            </div>
          </div>

          {/* última conexión - unicamente cuando este offline */}
          {player.lastlogoff && player.personastate === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-xs italic">
              Última conexión: {new Date(player.lastlogoff * 1000).toLocaleDateString('es-MX', { 
                timeZone: 'America/Mexico_City'
              })}
            </p>
          )}
          
          {/* Estado de juego */}
          {player.gameextrainfo && player.gameid ? (
            <div>
              <p className="text-blue-700 dark:text-blue-400 text-sm">
                Jugando: {player.gameextrainfo}
              </p>
              {(player.gamestatus || player.rich_presence) && (
                <p className="text-blue-500 dark:text-blue-300 text-xs mt-1">
                  {player.gamestatus || player.rich_presence}
                </p>
              )}
              <img
                src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${player.gameid}/header.jpg`}
                alt={player.gameextrainfo}
                className="rounded-lg mt-2"
              />
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-xs italic">No está jugando en este momento</p>
          )}
        </div>
      )}
    </div>
  );
};
