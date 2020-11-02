import React from "react";
import "./styles.css";

const valueForKey = (object, key) => {
  const value = object[key];
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value !== "boolean") return value;
  return value === true ? "true" : "false";
};

const CrabRow = ({ crab }) => {
  return (
    <div className="crab-row">
      {Object.keys(crab).map((key, i) => {
        return (
          <div key={`row-${crab.sortOrderId}-${i}`} className="crab-row__row">
            <p className="crab-row__cell">{key}:</p>
            <p className="crab-row__cell">{valueForKey(crab, key)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CrabRow;
