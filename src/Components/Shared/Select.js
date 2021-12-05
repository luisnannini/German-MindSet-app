import React from 'react';

const Select = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <select value={props.value} onChange={props.onChange} required={props.required}>
        <option value="" disabled hidden>
          {props.title}
        </option>
        {props.object.map((data) => {
          return (
            <option key={data._id} value={data._id}>
              {data.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
