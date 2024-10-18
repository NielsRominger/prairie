import React, { useEffect, useRef, useState } from 'react';
import './Map.css'; // Importer le fichier CSS
import imageMap from './assets/imageMap.jpg';

function Map() {
  const pointsRef = useRef([]);
  const [positions, setPositions] = useState([]);

  const points = [
    { name: 'starting-point', className: 'starting-point' },
    { name: 'treasure', className: 'treasure' },
    { name: 'top-left', className: 'top-left' },
    { name: 'top-middle', className: 'top-middle' },
    { name: 'top-right', className: 'top-right' },
    { name: 'top-center', className: 'top-center' },
    { name: 'center-left', className: 'center-left' },
    { name: 'center-middle', className: 'center-middle' },
    { name: 'center-right', className: 'center-right' },
    { name: 'middle-center', className: 'middle-center' },
    { name: 'bottom-left', className: 'bottom-left' },
    { name: 'bottom-center', className: 'bottom-center' },
    { name: 'bottom-right', className: 'bottom-right' },
  ];

  const graph = {
    'starting-point': {
      'top-right': 1,
      'center-right': 2,
      'top-center': 5,
      'top-left': 10,
      'top-middle': 7,
    },
    'top-right': { 'starting-point': 1, 'top-center': 2 },
    'top-left': { 'starting-point': 10, 'top-middle': 2, 'center-left': 7 },
    'top-middle': { 'starting-point': 7, 'top-left': 2, 'center-middle': 7 },
    'center-left': { 'top-left': 7, 'center-middle': 3, 'bottom-left': 1 },
    'center-middle': { 'top-middle': 7, 'center-left': 3, 'center-right': 4 },
    'center-right': { 'center-middle': 4, 'bottom-right': 2, 'starting-point': 2 },
    'bottom-left': { 'center-left': 1, 'bottom-center': 10, treasure: 10 },
    'bottom-center': { 'bottom-left': 10, 'bottom-right': 2 },
    'bottom-right': {
      'center-right': 2,
      'bottom-center': 2,
      treasure: 5,
      'middle-center': 6,
    },
    treasure: { 'bottom-right': 5, 'bottom-left': 10 },
    'top-center': { 'starting-point': 5, 'top-right': 2 },
    'middle-center': { 'bottom-right': 6 },
  };

  // Ajoutez la fonction dijkstra ici
  function dijkstra(graph, start) {
    let distances = {};
    let visited = [];
    let nodes = Object.keys(graph);
    let previous = {};

    // Initialiser les distances à l'infini
    for (let node of nodes) {
      distances[node] = Infinity;
      previous[node] = null;
    }

    distances[start] = 0;

    while (nodes.length) {
      // Trier les nœuds par distance et sélectionner le plus proche
      nodes.sort((a, b) => distances[a] - distances[b]);
      let closestNode = nodes.shift();

      if (distances[closestNode] === Infinity) break;

      visited.push(closestNode);

      // Parcourir les voisins du nœud actuel
      for (let neighbor in graph[closestNode]) {
        if (!visited.includes(neighbor)) {
          let newDistance = distances[closestNode] + graph[closestNode][neighbor];

          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = closestNode;
          }
        }
      }
    }

    return { distances, previous };
  }

  // Utilisez la fonction dijkstra pour obtenir les distances et le chemin précédent
  const { distances, previous } = dijkstra(graph, 'starting-point');

  // Construire le chemin de départ à l'arrivée (treasure)
  let path = [];
  let target = 'treasure';
  while (target) {
    path.push(target);
    target = previous[target];
  }
  path.reverse();

  useEffect(() => {
    const updatedPositions = pointsRef.current.map((ref) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        return {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
        };
      }
      return null;
    });
    setPositions(updatedPositions);
  }, []);

  // calculer la longueur de chaque ligne
  function calculateLineLength(x1, y1, x2, y2) {
    const a = x2 - x1;
    const b = y2 - y1;
    return Math.sqrt(a * a + b * b);
  }

  return (
    <div>
      <img src={imageMap} className="img" alt="Map" />

      {/* Points sur la carte */}
      {points.map((point, index) => (
        <div
          key={point.name}
          className={point.className}
          ref={(el) => (pointsRef.current[index] = el)}
        ></div>
      ))}

      {/* Lignes SVG pour visualiser le chemin */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {path.map((point, index) => {
          if (index < path.length - 1 && positions.length > 0) {
            const currentIndex = points.findIndex((p) => p.name === point);
            const nextIndex = points.findIndex((p) => p.name === path[index + 1]);

            const currentPos = positions[currentIndex];
            const nextPos = positions[nextIndex];

            if (currentPos && nextPos) {
              const lineLength = calculateLineLength(
                currentPos.left,
                currentPos.top,
                nextPos.left,
                nextPos.top
              );

              return (
                <line
                  key={index}
                  x1={currentPos.left}
                  y1={currentPos.top}
                  x2={nextPos.left}
                  y2={nextPos.top}
                  style={{
                    stroke: 'red',
                    strokeWidth: 4,
                    strokeDasharray: lineLength,
                    strokeDashoffset: lineLength,
                    animation: `draw-line 2s forwards`,
                    animationDelay: `${index}s`,
                  }}
                />
              );
            }
          }
          return null;
        })}
      </svg>
    </div>
  );
}

export default Map;
