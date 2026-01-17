import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { injectSpeedInsights } from '@vercel/speed-insights';

// ASCII Art en consola
console.info("\n    _____\n ___ |[]|_n__n_I_c\n|___||__|###|____}\n O-O--O-O+++--O-O\n****************************************\n*                                      *\n*           Ready for the travel?      *\n*                                      *\n*         Want to ride with us?        *\n*                                      *\n*              Hop aboard,             *\n*   the train is leaving the station!  *\n*                                      *\n*              Devmike117              *\n*                                      *\n****************************************\n");

injectSpeedInsights();

createRoot(document.getElementById('root')!).render(
  <App />
)
