import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypeOfPoke,
  alphabeticalOrder,
  filterOriginAction,
  filterByTypeAction,
  filterByAttack,
  clearHome
  
} from "../../redux/actions";
import Card from "../Card";
import NavBar from "../NavBar";
import Paginado from "../Paginado";
import "./Home.css"

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const pokeSust = useSelector((state) => state.allPoke);
  const allTypes = useSelector((state) => state.type);
  const notFound = useSelector((state) => state.error);
  const [origin, setOrigin] = useState("All")

  const [currentPage, setCurrentPage] = useState(1);
  const [pokePerPage /*setPokePerPage*/] = useState(12);
  const indexOfLastPoke = currentPage * pokePerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokePerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPoke, indexOfLastPoke);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [, /*order*/ setOrder] = useState("");

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypeOfPoke());
    return () => {
      dispatch(clearHome())
    }
   
  }, [dispatch]);

  function handleAlphabeticalOrder(e) {
    e.preventDefault();
    dispatch(alphabeticalOrder(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleAttackOrder(e) {
    e.preventDefault();
    dispatch(filterByAttack(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleFilterOrigin(e) {
    setOrigin(e.target.value);
    dispatch(filterOriginAction(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterByType(e) {
   e.preventDefault()
   dispatch(filterByTypeAction(e.target.value, origin));
   setCurrentPage(1)
  }

  return (
    <div className="home">
      <NavBar />
      <div>
        <div className="filters">
          <select
            className="filter1"
            defaultValue="sortAlphabetical"
            onChange={(e) => handleAlphabeticalOrder(e)}
          >
            <option value="sortAlphabetical" select disabled>
              Sort Alphabetical
            </option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          <select 
            className="filter4"
            
            defaultValue="sortByAttack"
            onChange={(e) => handleAttackOrder(e)}
            >
              <option value = "sortByAttack" select disabled>
                Sort By Attack
              </option>
              <option value = "stronger">Stronger</option>
              <option value = "weak">Weaker</option>
            </select>
          <select
              className="filter2"
              
              defaultValue = {"All"} 
              onChange={(e) => handleFilterOrigin(e)}
              >
                <option value="All"  disabled>
                  Sort By Origin
                </option>
                <option value="All">All</option>
            <option value="FromApi">From Api</option>
            <option value="FromDataBase">From Database</option>
          </select>

          <select
            className="filter3"
            defaultValue = "sortByType" 
            onChange={(e) => handleFilterByType(e)}>
          <option  value="sortByType" selected disabled>
            Filter By Type
          </option>
          <option value='All'>All</option>
          {allTypes.map((t) => {
            return (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            );
          })}
        </select>
        </div>

        <div className="paginado">
          <Paginado
            pokePerPage={pokePerPage}
            allPokemons={allPokemons.length}
            paginado={paginado}
          />
        </div>
        <div>
          {pokeSust.length === 0 ? (
            <div className="loaderHome">
              <h1>Loading...</h1>
              <img src="http://pa1.narvii.com/6163/62ffaac1d83041730033fc1fe4280d4ae79c62b9_00.gif" alt="loader gif" />
              
            </div>
          ) : notFound.length === 0 && allPokemons.length > 0 ? (
            <div className="card_container">
              {currentPokemons?.map((e) => {
                return (
                  <Fragment>
                    <Card
                      name={e.name}
                      img={e.img}
                      type={e.type.join(", ")}
                      id={e.id}
                      key={e.id}
                    />
                  </Fragment>
                );
              })}
            </div>
          ) : (
            <div className="loaderHome">
              <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a751558d-03cc-421b-8018-dcd224c2f225/d8q0iw8-f57daefe-1a71-4210-9731-5def07f1851d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E3NTE1NThkLTAzY2MtNDIxYi04MDE4LWRjZDIyNGMyZjIyNVwvZDhxMGl3OC1mNTdkYWVmZS0xYTcxLTQyMTAtOTczMS01ZGVmMDdmMTg1MWQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.QMPrTzhe-JtvoV1BopzTRMVaUnahj7bAhjwUBR6Rgks" alt = "loader"/>

              <p>Not pokemon Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

