import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ArrayFormInput = ({ postulant, collectData, dataName, defaultValue }) => {
  const [input, setInput] = useState(postulant ? postulant[dataName] : [defaultValue]);
  const sendData = (data) => {
    collectData(data, dataName);
    setInput(data);
  };
  useEffect(() => sendData(input), []);
  const dates = ['startDate', 'endDate', 'createdAt', 'updatedAt'];
  return (
    <div>
      {input.map((inputElement, index) => {
        return (
          <div key={inputElement.id}>
            {Object.keys(inputElement ? inputElement : defaultValue).map((ieKey) => {
              return ieKey === 'description' ? (
                <textarea
                  key={ieKey}
                  defaultValue={inputElement[ieKey]}
                  placeholder={ieKey.toUpperCase()}
                  onChange={({ target: { value } }) => {
                    input[index][ieKey] = value;
                    sendData([...input]);
                  }}
                ></textarea>
              ) : ieKey === 'id' ? (
                ''
              ) : dates.find((date) => date === ieKey) ? (
                <input
                  type="datetime-local"
                  key={ieKey}
                  defaultValue={
                    inputElement[ieKey]
                      ? inputElement[ieKey].substring(0, inputElement[ieKey].length - 8)
                      : '2000-01-01T00:00'
                  }
                  placeholder={ieKey.toUpperCase()}
                  onChange={({ target: { value } }) => {
                    console.log(input[index][ieKey], value);
                    input[index][ieKey] = value;
                    sendData([...input]);
                  }}
                />
              ) : (
                <input
                  key={ieKey}
                  defaultValue={inputElement[ieKey]}
                  placeholder={ieKey.toUpperCase()}
                  onChange={({ target: { value } }) => {
                    input[index][ieKey] = value; //no se puede encontrar el indice de un array a través de un objeto
                    sendData([...input]);
                  }}
                />
              );
            })}
          </div>
        );
      })}
      <button
        onClick={(e) => {
          e.preventDefault();
          setInput([...input, { ...defaultValue, id: uuidv4() }]);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default ArrayFormInput;
