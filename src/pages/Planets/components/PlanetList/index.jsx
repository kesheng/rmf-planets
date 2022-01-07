import React from "react";
import { Link } from "react-router-dom";

export default ({ loading, planets }) => {
  return (
    <div>
      {planets.map((planet, i) => {
        let borderClass = "border-b";
        if (i === 0) {
          borderClass = "border-t border-b";
        } else if (i + 1 === planets.length) {
          borderClass = "";
        }
        return (
          <Link key={planet.id} to={planet.id}>
            {planet.name}
          </Link>
        );
      })}
      {loading && <div>Loading ...</div>}
    </div>
  );
};
