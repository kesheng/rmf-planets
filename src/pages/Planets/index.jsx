import React, { useReducer, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PlanetList from "@@/pages/Planets/components/PlanetList";
import SelectedPlanet from "@@/pages/Planets/components/SelectedPlanet";
import { get } from "lodash";
import { getPlanets } from "@@/service/api";
import { Button } from "@ks/components";

export default () => {
  const initialState = {
    planets: [],
    loading: false,
    page: 0,
    nextPage: false,
  };

  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "fetchPlanets" });
  }, []);
  const { page, nextPage, loading } = state;
  const { pathname } = location;
  const regexSearch = /[0-9]+/.exec(pathname);
  const selected = get(regexSearch, "[0]");

  useEffect(() => {
    if (page > 0) {
      const req$ = getPlanets(page).subscribe((results) => {
        dispatch({
          type: "addPlanets",
          payload: {
            nextPage: !!results.next,
            results: results.results,
          },
        });
      });
    }
  }, [page]);

  return (
    <div>
      <div>
        {nextPage ? (
          <Button
            disabled={loading || !nextPage}
            loading={loading}
            onClick={() => {
              dispatch({ type: "fetchPlanets" });
            }}
          >
            Fetch More Planets
          </Button>
        ) : null}
        <PlanetList {...state} />
      </div>
      <div>
        <div>
          <SelectedPlanet selectedId={selected} />
        </div>
      </div>
    </div>
  );
};

function reducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    case "addPlanets":
      const { payload } = action;
      newState.loading = false;
      newState.nextPage = payload.nextPage;
      newState.planets = [...newState.planets, ...payload.results];
      return newState;
    case "fetchPlanets":
      newState.loading = true;
      newState.page = newState.page + 1;
      return newState;
    default:
      return state;
  }
}
