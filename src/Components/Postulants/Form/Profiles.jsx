import ButtonConfirm from '../../Shared/ButtonConfirm';

const Profiles = ({ postulantData, setData, dataTemplate }) => {
  postulantData.forEach((data, index) => {
    if (!data.profileId) postulantData[index].profileId = { id: '', name: '' };
  });
  return (
    <div>
      {postulantData.map((profile, index) => {
        return (
          <div key={index}>
            <input
              placeholder="ID"
              defaultValue={profile.profileId._id}
              onChange={(e) => {
                postulantData[index].profileId._id = e.target.value;
                setData([...postulantData]);
              }}
            />
            <input
              placeholder="Name"
              defaultValue={profile.profileId.name}
              onChange={(e) => {
                postulantData[index].profileId.name = e.target.value;
                setData([...postulantData]);
              }}
            />
          </div>
        );
      })}
      <ButtonConfirm
        name="Save"
        onClick={(e) => {
          e.preventDefault();
          setData([...postulantData, { ...dataTemplate, id: Math.floor(Math.random() * 10000) }]);
        }}
      />
    </div>
  );
};

export default Profiles;
