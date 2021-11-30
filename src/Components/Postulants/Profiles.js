import { useState, useEffect } from 'react';

const Profiles = ({ postulant, collectData, id }) => {
  const [profiles, setProfiles] = useState(postulant.profiles);
  const sendData = (data) => {
    collectData(data, 'profiles');
    setProfiles(data);
  };
  useEffect(() => sendData(profiles), []);

  return (
    <div>
      <h3>Profiles</h3>
      {postulant.profiles.map((profile, index) => {
        return (
          <div key={profile.id}>
            <input
              placeholder="Id"
              defaultValue={profile._id}
              onChange={({ target: { value } }) => {
                profiles[index]._id = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...profiles]);
              }}
            />
            <input
              placeholder="Name"
              defaultValue={profile.name}
              onChange={({ target: { value } }) => {
                profiles[index].name = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...profiles]);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Profiles;
