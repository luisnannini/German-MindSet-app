const InitialStudies = ({ postulantData, setStudies }) => {
  return (
    <div>
      <input
        type="datetime-local"
        defaultValue={postulantData.startDate.substring(0, postulantData.startDate.length - 8)}
        placeholder="Start Date"
        onChange={(e) => {
          setStudies({
            ...postulantData,
            startDate: e.target.value.substring(0, e.target.value.length - 8)
          });
        }}
      />
      <input
        type="datetime-local"
        defaultValue={postulantData.endDate.substring(0, postulantData.endDate.length - 8)}
        placeholder="End Date"
        onChange={(e) => {
          setStudies({
            ...postulantData,
            endDate: e.target.value.substring(0, postulantData.endDate.length - 8)
          });
        }}
      />
      <input
        defaultValue={postulantData.school}
        placeholder="School"
        onChange={(e) => {
          setStudies({ ...postulantData, school: e.target.value });
        }}
      />
    </div>
  );
};

export default InitialStudies;
