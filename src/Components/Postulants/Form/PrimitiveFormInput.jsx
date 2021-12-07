import Checkbox from '../../Shared/Checkbox';

const PrimitiveFormInputs = ({ postulantData, setData, dataName }) => {
  return (
    <div>
      {dataName === 'birthday' || dataName === 'createdAt' || dataName === 'updatedAt' ? (
        <>
          <label htmlFor={dataName}></label>
          <input
            required
            name={dataName}
            type="datetime-local"
            defaultValue={postulantData.substring(0, postulantData.length - 8)}
            placeholder={dataName}
            onChange={(e) => {
              setData(e.target.value);
            }}
          />
        </>
      ) : dataName === 'available' ? (
        <>
          <Checkbox
            htmlFor={dataName}
            checked={postulantData}
            onChange={(e) => setData(e.target.checked)}
          />
        </>
      ) : (
        <>
          <label htmlFor={dataName}></label>
          <input
            required
            name={dataName}
            defaultValue={postulantData}
            placeholder={dataName.toUpperCase()}
            onChange={(e) => setData(e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default PrimitiveFormInputs;
