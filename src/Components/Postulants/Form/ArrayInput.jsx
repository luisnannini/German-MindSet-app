import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';

const ArrayInput = ({ postulant, collectData, dataName, defaultValue }) => {
  const [input, setInput] = useState(postulant ? postulant[dataName] : [defaultValue]);
  const sendData = (data) => {
    collectData(data, dataName);
    setInput(data);
  };
  useEffect(() => sendData(input), []);
  return (
    <div>
      {input.map((inputElement) => {
        return (
          <div key={input.id}>
            <input
              type="datetime-local"
              defaultValue={
                inputElement.startDate
                  ? inputElement.startDate.substring(0, inputElement.startDate.length - 8)
                  : '2000-01-01T00:00'
              }
              placeholder="Start Date"
              onChange={(e) => {
                inputElement.startDate = e.target.value;
                sendData([...input]);
              }}
            />
            <input
              type="datetime-local"
              defaultValue={
                inputElement.endDate
                  ? inputElement.endDate.substring(0, inputElement.endDate.length - 8)
                  : '2000-01-01T00:00'
              }
              placeholder="End Date"
              onChange={(e) => {
                inputElement.endDate = e.target.value;
                sendData([...input]);
              }}
            />
            <input
              defaultValue={inputElement.institute}
              placeholder={dataName === 'workExperience' ? 'Company' : 'Institute'}
              onChange={(e) => {
                dataName === 'workExperience'
                  ? (inputElement.company = e.target.value)
                  : (inputElement.institute = e.target.value);
                sendData([...input]);
              }}
            />
            <textarea
              defaultValue={inputElement.description}
              placeholder="Description"
              onChange={({ target: { value } }) => {
                inputElement.description = value;
                sendData([...input]);
              }}
            ></textarea>
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

export default ArrayInput;
