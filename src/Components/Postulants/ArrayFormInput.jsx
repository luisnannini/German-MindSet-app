import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ArrayFormInput = ({ postulant, collectData, dataName, defaultValue }) => {
  const [input, setInput] = useState(postulant ? postulant[dataName] : [defaultValue]);
  const sendData = (data) => {
    collectData(data, dataName);
    setInput(data);
  };
  useEffect(() => sendData(input), []);

  return (
    <div>
      {input.map((inputElement, index) => {
        return (
          <div>
            {Object.keys(inputElement).map((ieKey) => {
              return ieKey !== 'description' ? (
                <input
                  key={uuidv4()}
                  defaultValue={inputElement[ieKey]}
                  placeholder={ieKey.toUpperCase()}
                  onChange={({ target: { value } }) => {
                    input[index][ieKey] = value; //no se puede encontrar el indice de un array a través de un objeto
                    sendData([...input]);
                  }}
                />
              ) : (
                <textarea
                  defaultValue={inputElement[ieKey]}
                  placeholder={ieKey.toUpperCase()}
                  onChange={({ target: { value } }) => {
                    input[index][ieKey] = value; //no se puede encontrar el indice de un array a través de un objeto
                    sendData([...input]);
                  }}
                ></textarea>
              );
            })}
          </div>
        );
      })}
      <button
        onClick={(e) => {
          e.preventDefault();
          setInput([...input, defaultValue]);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default ArrayFormInput;
