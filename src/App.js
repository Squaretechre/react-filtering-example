import React, { useState } from "react";
import { Filter, Filters } from "./Filters";
import allCrabs from "./crabs";
import "./styles.css";

export default function App() {
  const [crabs, setCrabs] = useState(allCrabs);

  const removeAllButtonStyles = {
    display: "block",
    margin: "0 auto",
    marginBottom: 20
  };

  const filterButtonStyles = {
    marginRight: 10
  };

  return (
    <div className="App">
      <h1>🦀 Filter Those Crabs 🦀</h1>
      <Filters originalDataSet={allCrabs} updateDataSet={setCrabs}>
        {(apply, isApplied, removeAll) => {
          return (
            <>
              <button style={removeAllButtonStyles} onClick={() => removeAll()}>
                🗑️ Remove all filters
              </button>
              <Filter
                name="red-crabs"
                transformation={(crab) => crab.shellColour === "red"}
                apply={apply}
                isApplied={isApplied}
              >
                {(applied, onClick) => {
                  return (
                    <button
                      style={filterButtonStyles}
                      onClick={() => onClick()}
                    >
                      {applied() ? "✔️ red crabs" : "❌ red crabs"}
                    </button>
                  );
                }}
              </Filter>
              <Filter
                name="strong-crabs"
                transformation={(crab) => crab.strength > 50}
                apply={apply}
                isApplied={isApplied}
              >
                {(applied, onClick) => {
                  return (
                    <button
                      style={filterButtonStyles}
                      onClick={() => onClick()}
                    >
                      {applied() ? "✔️ strong crabs" : "❌ strong crabs"}
                    </button>
                  );
                }}
              </Filter>
              <Filter
                name="weak-crabs"
                transformation={(crab) => crab.defence < 50}
                apply={apply}
                isApplied={isApplied}
              >
                {(applied, onClick) => {
                  return (
                    <button
                      style={filterButtonStyles}
                      onClick={() => onClick()}
                    >
                      {applied() ? "✔️ weak crabs" : "❌ weak crabs"}
                    </button>
                  );
                }}
              </Filter>
              <Filter
                name="attack-buffed-crabs"
                transformation={(crab) => crab.isAttackBuffed}
                apply={apply}
                isApplied={isApplied}
              >
                {(applied, onClick) => {
                  return (
                    <button
                      style={filterButtonStyles}
                      onClick={() => onClick()}
                    >
                      {applied()
                        ? "✔️ attack buffed crabs"
                        : "❌ attack buffed crabs"}
                    </button>
                  );
                }}
              </Filter>
            </>
          );
        }}
      </Filters>
      {crabs.map((crab) => (
        <div key={crab.name}>
          <p style={{ fontWeight: 600 }}>{crab.name}</p>
          <pre>{JSON.stringify(crab, null, 4)}</pre>
        </div>
      ))}
    </div>
  );
}
