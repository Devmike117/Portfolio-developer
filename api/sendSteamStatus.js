export default async function handler(req, res) {
  const apiKey = process.env.API_KEY;
  const steamID = process.env.STEAM_ID;

  const steamURL = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamID}`;

  try {
    const response = await fetch(steamURL);
    const data = await response.json();

    if (!data?.response?.players || data.response.players.length === 0) {
      return res.status(404).json({ error: "No se encontró el jugador." });
    }

    const player = data.response.players[0];

    if (player.gameid) {
      try {
        const storeRes = await fetch(`https://store.steampowered.com/api/appdetails?appids=${player.gameid}&filters=basic`);
        const storeData = await storeRes.json();
        const appData = storeData?.[player.gameid];
        if (appData?.success && appData?.data?.header_image) {
          player.header_image = appData.data.header_image;
        }
      } catch (_) {
        // Store API failed, header_image will be absent
      }
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Steam fetch error:", error);
    res.status(500).json({ error: "Error al obtener datos de Steam" });
  }
}
