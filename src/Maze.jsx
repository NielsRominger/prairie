// Importation du fichier CSS pour le style du composant
import './Maze.css';
// Importation des hooks 'useState' et 'useEffect' de React pour gérer les états et les effets de bord
import { useEffect, useState } from 'react';

// Déclaration du tableau 'maze' qui représente le labyrinthe sous forme de matrice (tableau de tableaux)
// Chaque sous-tableau correspond à une ligne du labyrinthe. Les valeurs `1` représentent un chemin accessible,
// tandis que `0` représente un mur ou un obstacle.
const maze = [
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  [0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
];

// Composant principal 'Maze' qui rend le labyrinthe et implémente la logique de recherche du chemin
export default function Maze() {
  // Utilisation de 'useState' pour définir l'état de la position de l'utilisateur (initialement en haut à gauche)
  // L'état 'userPosition' contient deux propriétés : 'row' (ligne) et 'col' (colonne)
  const [userPosition, setUserPosition] = useState({ row: 0, col: 0 });

  // Utilisation de 'useState' pour stocker le chemin trouvé par l'algorithme de recherche (initialement vide)
  const [path, setPath] = useState([]);

  // Utilisation du hook 'useEffect' pour déclencher la recherche du chemin lorsque la position de l'utilisateur change
  useEffect(() => {
    // Définition du point de départ, basé sur la position actuelle de l'utilisateur
    const start = { row: userPosition.row, col: userPosition.col };
    // Définition du point d'arrivée (dernière cellule du labyrinthe, en bas à droite)
    const end = { row: maze.length - 1, col: maze[0].length - 1 };
    // Appel de la fonction 'bfs' (Breadth-First Search) pour trouver le chemin du départ à l'arrivée
    const foundPath = bfs(maze, start, end);

    // Affichage du chemin trouvé dans la console pour débogage
    console.log('Chemin trouvé:', foundPath);  // Vérifiez si le chemin est trouvé

    // Mise à jour de l'état 'path' avec le chemin trouvé ou un tableau vide si aucun chemin n'est trouvé
    setPath(foundPath || []);
  }, [userPosition]); // 'useEffect' dépend de 'userPosition', il s'exécute chaque fois que 'userPosition' change

  // Rendu du labyrinthe sous forme d'une table HTML
  return (
    <div className="Maze">
      <table id="maze">
        <tbody>
        {/* Boucle sur chaque ligne du labyrinthe ('maze') pour générer un <tr> pour chaque ligne */}
        {maze.map((row, i) => (
          <tr key={`row-${i}`}> {/* Chaque ligne a une clé unique basée sur l'index de la ligne */}
            {/* Boucle sur chaque cellule de la ligne pour générer une cellule <td> */}
            {row.map((cell, j) => {
              // Initialisation de la classe CSS en fonction de la valeur de la cellule (0 = 'wall', 1 = 'path')
              let className = cell === 0 ? 'wall' : 'path';

              // Ajout de la classe 'start' si la cellule correspond à la position actuelle de l'utilisateur
              if (i === userPosition.row && j === userPosition.col) {
                className += ' start';
              }

              // Ajout de la classe 'destination' si la cellule correspond au point d'arrivée (dernière cellule)
              if (i === maze.length - 1 && j === row.length - 1) {
                className += ' destination';
              }

              // Ajout de la classe 'onPath' si la cellule fait partie du chemin trouvé par BFS
              if (path.some(pos => pos.row === i && pos.col === j)) {
                className += ' onPath';
              }

              // Retourne une cellule <td> avec une clé unique, stylisée avec la classe CSS appropriée
              return (
                <td key={`cell-${i}-${j}`} className={className}>
                  {/* <div> vide utilisé pour le style visuel */}
                  <div />
                </td>
              );
            })}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

// Fonction BFS (Breadth-First Search) pour trouver le chemin le plus court dans le labyrinthe
function bfs(maze, start, end) {
  // Détermination du nombre de lignes et de colonnes du labyrinthe
  const numRows = maze.length;
  const numCols = maze[0].length;

  // Initialisation d'un tableau 2D 'visited' pour suivre les cellules déjà visitées (rempli de 'false')
  const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));


  // Initialisation de la file d'attente (queue) utilisée par l'algorithme BFS
  // Chaque élément de la file est un objet contenant la position actuelle et le chemin emprunté jusqu'ici
  const queue = [];

  // Définition des quatre directions possibles pour le déplacement (haut, bas, gauche, droite)
  const directions = [
    { row: -1, col: 0 }, // Haut
    { row: 1, col: 0 },  // Bas
    { row: 0, col: -1 }, // Gauche
    { row: 0, col: 1 },  // Droite
  ];

  // Ajout de la position de départ dans la file d'attente, avec un chemin initial contenant seulement le point de départ
  queue.push({ position: start, path: [start] });
  // Marque la cellule de départ comme visitée
  visited[start.row][start.col] = true;

  // Boucle principale du BFS : elle continue tant que la file d'attente n'est pas vide
  while (queue.length > 0) {
    // Récupération du premier élément de la file d'attente (FIFO)
    const { position, path } = queue.shift();
    const { row, col } = position;

    // Si la position actuelle correspond à la position de la destination, retourne le chemin emprunté
    if (row === end.row && col === end.col) {
      return path; // Chemin trouvé
    }

    // Boucle sur les quatre directions possibles (haut, bas, gauche, droite)
    for (const { row: dRow, col: dCol } of directions) {
      // Calcul des nouvelles coordonnées après avoir appliqué la direction actuelle
      const newRow = row + dRow;
      const newCol = col + dCol;

      // Vérifie si la nouvelle position est dans les limites du labyrinthe et non visitée
      if (
        newRow >= 0 && newRow < numRows &&   // Vérifie si la ligne est dans les limites
        newCol >= 0 && newCol < numCols &&   // Vérifie si la colonne est dans les limites
        maze[newRow][newCol] !== 0 &&        // Vérifie si la nouvelle position n'est pas un mur
        !visited[newRow][newCol]             // Vérifie si la nouvelle position n'a pas été visitée
      ) {
        // Marque la nouvelle position comme visitée
        visited[newRow][newCol] = true;
        // Ajoute la nouvelle position et le chemin mis à jour à la file d'attente
        queue.push({
          position: { row: newRow, col: newCol },
          path: [...path, { row: newRow, col: newCol }],
        });
      }
    }
  }

  function dijkstra (graph, start) {
    let distances = {}
    let prev = {}

  }

  // Si aucun chemin n'est trouvé, retourne 'null'
  return null; // Aucun chemin trouvé
}
