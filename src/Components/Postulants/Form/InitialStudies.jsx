import TextArea from '../../Shared/TextArea';

const InitialStudies = ({ postulantData, setStudies }) => {
  return (
    <div>
      <label htmlFor="start-date"></label>
      <input
        name="start-date"
        required
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
      <label htmlFor="end-date"></label>
      <input
        required
        name="end-date"
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
      <label htmlFor="school"></label>
      <input
        required
        name="school"
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
