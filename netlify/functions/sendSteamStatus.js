const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apiKey = process.env.API_KEY;
  const steamID = process.env.STEAM_ID;

  const steamURL = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamID}`;

  try {
    const res = await fetch(steamURL);
    const data = await res.json();

    if (!data?.response?.players || data.response.players.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "No se encontró el jugador." })
      };
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

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Steam fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al obtener datos de Steam" })
    };
  }
};
