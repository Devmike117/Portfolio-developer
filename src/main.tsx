import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// ASCII Art 
// ===============================
// Devmike117 ASCII Console Engine 
// ===============================

// Mensaje dinámico según la hora
const hour = new Date().getHours();
let dynamicMessage = "";
let messageColor = "";

// Mensaje y color según la hora
if (hour < 12) {
  dynamicMessage = "Good morning, traveler!";
  messageColor = "#ffcc00"; 
} else if (hour < 18) {
  dynamicMessage = "Good afternoon, adventurer!";
  messageColor = "#00ff88"; 
} else {
  dynamicMessage = "Good evening, night rider!";
  messageColor = "#ff66ff"; //
}

// Tren
const trainStatic = `
    _____
 ___ |[]|_n__n_I_c
|___||__|###|____}
 O-O--O-O+++--O-O
`;

// Easter egg message
const messageTop = `
****************************************
*                                      *
*   ${dynamicMessage.padEnd(36)}*
*                                      *
*        Ready for the travel?         *
*                                      *
*        Want to ride with us?         *
*                                      *
*             Hop aboard,              *
*   the train is leaving the station!  *
*                                      *
*             `;
const messageName = "Devmike117";
const messageBottom = `               *
*                                      *
****************************************
`;

// Mostrar en consola 
console.log(
  "%c" + trainStatic +
  "%c" + messageTop +
  "%c" + messageName +
  "%c" + messageBottom,
  "color: #00eaff; font-weight: bold;",          
  `color: ${messageColor}; font-weight: bold;`, 
  "color: #4682B4; font-weight: bold;",          
  `color: ${messageColor}; font-weight: bold;`  
);

createRoot(document.getElementById('root')!).render(
  <App />
)
