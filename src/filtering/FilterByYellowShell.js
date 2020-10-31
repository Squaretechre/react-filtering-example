import { Filter } from "./Filtering";
import { filterButtonStyles } from "./styles";

const FilterByYellowShell = ({ apply, isApplied }) => (
  <Filter
    name="yellow-crabs"
    transformation={(crab) => crab.shellColour === "yellow"}
    apply={apply}
    isApplied={isApplied}
  >
    {(isApplied, applyFilter) => {
      return (
        <button style={filterButtonStyles} onClick={applyFilter}>
          {isApplied ? "✔️" : "❌"} yellow crabs
        </button>
      );
    }}
  </Filter>
);

export default FilterByYellowShell;
