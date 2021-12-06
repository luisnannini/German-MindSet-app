import ButtonLittleAdd from '../../Shared/ButtonLittleAdd';

const ArrayInput = ({ postulantData, setData, dataName, dataTemplate }) => {
  return (
    <div>
      {postulantData.map((inputElement, index) => {
        return (
          <div key={index}>
            <input
              type="datetime-local"
              defaultValue={inputElement.startDate.substring(0, inputElement.startDate.length - 8)}
              placeholder="Start Date"
              onChange={(e) => {
                postulantData[index].startDate = e.target.value;
                setData([...postulantData]);
              }}
            />
            <input
              type="datetime-local"
              defaultValue={inputElement.endDate.substring(0, inputElement.startDate.length - 8)}
              placeholder="Start Date"
              onChange={(e) => {
                postulantData[index].endDate = e.target.value;
                setData([...postulantData]);
              }}
            />
            <input
              defaultValue={
                dataName === 'workExperience' ? inputElement.company : inputElement.institute
              }
              placeholder={dataName === 'workExperience' ? 'Company' : 'Institute'}
              onChange={(e) => {
                dataName === 'workExperience'
                  ? (postulantData[index].company = e.target.value)
                  : (postulantData[index].institute = e.target.value);
                setData([...postulantData]);
              }}
            />
            <textarea
              defaultValue={inputElement.description}
              placeholder="Description"
              onChange={({ target: { value } }) => {
                postulantData[index].description = value;
                setData([...postulantData]);
              }}
            ></textarea>
          </div>
        );
      })}
      <ButtonLittleAdd
        onClick={(e) => {
          e.preventDefault();
          setData([...postulantData, { ...dataTemplate, id: Math.floor(Math.random() * 10000) }]);
        }}
      />
    </div>
  );
};

export default ArrayInput;
