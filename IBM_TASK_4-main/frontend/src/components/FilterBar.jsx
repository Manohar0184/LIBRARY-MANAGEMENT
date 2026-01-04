import { useState } from "react";

const FilterBar = ({ onFilterCategory, onFilterYear, onReset }) => {
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");

  return (
    <div className="glass filter-bar">
      <h3>Filters</h3>

      <div className="filter-controls">
        <input
          placeholder="Category (e.g. Self Help)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button onClick={() => onFilterCategory(category)}>
          Filter Category
        </button>
      </div>

      <div className="filter-controls">
        <input
          type="number"
          placeholder="Published after year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <button onClick={() => onFilterYear(year)}>
          Filter Year
        </button>
      </div>

      <button className="reset-btn" onClick={onReset}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;
