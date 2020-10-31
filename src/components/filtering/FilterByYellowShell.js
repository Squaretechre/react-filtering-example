import { Filter } from "./Filtering";
import "./styles.css";

const FilterByYellowShell = ({ apply, isApplied }) => (
  <Filter
    name="yellow-crabs"
    transformation={(crab) => crab.shellColour === "yellow"}
    apply={apply}
    isApplied={isApplied}
  >
    {(isApplied, applyFilter) => {
      return (
        <button className="filterButton" onClick={applyFilter}>
          {isApplied ? "✔️" : "❌"} yellow crabs
        </button>
      );
    }}
  </Filter>
);

export default FilterByYellowShell;
