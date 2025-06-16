import React from "react";

function Dropdown({ title, options, func }) {
  return (
    <div className="select">
      <label htmlFor="format" className="sr-only">{title}</label>
      <select
        defaultValue="0"
        onChange={func}
        name="format"
        id="format"
        aria-label={title} // optional but helpful fallback
      >
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
