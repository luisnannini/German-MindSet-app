import { useState, useEffect } from 'react';

const ArrayInput = ({ postulantData, setData, dataName, dataTemplate }) => {
  return (
    <div>
      {postulantData.map((inputElement, index) => {
        {
          console.log(inputElement.startDate.substring(0, inputElement.startDate.length - 8));
        }
        return (
          <div key={index}>
            <input
              type="datetime-local"
              defaultValue={inputElement.startDate.substring(0, inputElement.startDate.length - 8)}
              placeholder="Start Date"
              onChange={(e) => {
                inputElement.startDate = e.target.value;
                //console.log(e.target.value);
                setData([...postulantData]);
              }}
            />
            <input
              type="datetime-local"
              defaultValue={inputElement.endDate.substring(0, inputElement.startDate.length - 8)}
              placeholder="Start Date"
              onChange={(e) => {
                inputElement.endDate = e.target.value;
                setData([...postulantData]);
              }}
            />
            <input
              defaultValue={inputElement.institute}
              placeholder={dataName === 'workExperience' ? 'Company' : 'Institute'}
              onChange={(e) => {
                dataName === 'workExperience'
                  ? (inputElement.company = e.target.value)
                  : (inputElement.institute = e.target.value);
                setData([...postulantData]);
              }}
            />
            <textarea
              defaultValue={inputElement.description}
              placeholder="Description"
              onChange={({ target: { value } }) => {
                inputElement.description = value;
                setData([...postulantData]);
              }}
            ></textarea>
          </div>
        );
      })}
      <button
        onClick={(e) => {
          e.preventDefault();
          if (dataName === 'wrokExperience') {
            setData([...postulantData, { ...dataTemplate, id: Math.floor(Math.random() * 10000) }]);
          }
        }}
      >
        Add
      </button>
    </div>
  );
};

export default ArrayInput;
