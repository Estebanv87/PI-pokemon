import React from "react";
import "./Paginado.css"


export default function paginado({ pokePerPage, allPokemons, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <button
              className="number"
              key={number}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          ))}
      </div>
    </nav>
  );
}