const PrimitiveFormInputs = ({ postulantData, setData, dataName }) => {
  return (
    <div>
      {dataName === 'birthday' || dataName === 'createdAt' || dataName === 'updatedAt' ? (
        <input
          type="datetime-local"
          defaultValue={postulantData.substring(0, postulantData.length - 8)}
          placeholder={dataName}
          onChange={(e) => {
            setData(e.target.value);
          }}
        />
      ) : dataName === 'available' ? (
        <input
          type="checkbox"
          checked={postulantData}
          onChange={(e) => setData(e.target.checked)}
        />
      ) : (
        <input
          defaultValue={postulantData}
          placeholder={dataName.toUpperCase()}
          onChange={(e) => setData(e.target.value)}
        />
      )}
    </div>
  );
};

export default PrimitiveFormInputs;
