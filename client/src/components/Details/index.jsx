import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, clearDetail, deletePokemon } from "../../redux/actions";
import "./Details.css";

function Details(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, props.match.params.id]);

  function handleDelete() {
    dispatch(deletePokemon(props.match.params.id));

    history.push("/home");
    alert("Pokemos deleted !");
  }

  const pokeDetail = useSelector((state) => state.details);

  return (
    <div style={{ overflow: "hidden" }}>
      {pokeDetail.length === 0 ? (
        <div className="loader_detail">
          <h1>Loading...</h1>
          <img
            src="https://i.gifer.com/origin/7d/7dab25c7b14a249bbc4790176883d1c5_w200.gif"
            alt="gif loader"
          />
        </div>
      ) : (
        <div className="body_container">
          <div className="pokeContainer">
            <div className="pokeContainer2">
              <h1>
                {pokeDetail[0].name.charAt(0).toUpperCase() +
                  pokeDetail[0].name.slice(1)}
              </h1>
              <div className="pokeContainerImg">
                <img
                  src={pokeDetail[0].img}
                  width="280px"
                  height="200px"
                  alt="img not found"
                />
              </div>
            </div>
            <div className="stats_container">
              <div className="stats">
                <h4>HP: {pokeDetail[0].hp}</h4>
                <h4>ATTACK: {pokeDetail[0].attack}</h4>
                <h4>DEFENSE: {pokeDetail[0].defense}</h4>
              </div>
              <div className="stats">
                <h4>SPEED: {pokeDetail[0].speed} </h4>
                <h4>HEIGHT: {pokeDetail[0].height}</h4>
                <h4>WEIGHT: {pokeDetail[0].weight}</h4>
                <h4>Type(s): {pokeDetail[0].type.join(", ")}</h4>
              </div>
            </div>
            <Link to="/home">
              <button className="btn_home">Return to Home</button>
            </Link>
            {typeof pokeDetail[0].id === "string" ? (
              <button className="btn_delete" onClick={handleDelete}>
                DELETE POKEMON
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
