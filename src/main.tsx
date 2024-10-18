import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'; // Importer le composant principal de l'application
import "./index.css"; // Importer le fichier de styles

// Rendre le composant principal App dans la div "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
