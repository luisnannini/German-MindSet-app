const ContactRange = ({ postulantData, setData }) => {
  return (
    <div>
      <label htmlFor="from"></label>
      <input
        required
        name="from"
        defaultValue={postulantData.from}
        placeholder="From"
        onChange={(e) => {
          setData({ ...postulantData, from: e.target.value });
        }}
      />
      <label htmlFor="to"></label>
      <input
        required
        name="to"
        defaultValue={postulantData.to}
        placeholder="To"
        onChange={(e) => {
          setData({ ...postulantData, to: e.target.value });
        }}
      />
    </div>
  );
};

export default ContactRange;
