import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Profiles = ({ postulant, collectData }) => {
  console.log(postulant.profiles[1]);
  const [profiles, setProfiles] = useState(postulant.profiles);
  const sendData = (data) => {
    collectData(data, 'profiles');
    setProfiles(data);
  };
  useEffect(() => sendData(profiles), []);
  const template = {
    profileId: { _id: '', name: '' },
    id: uuidv4()
  };
  return (
    <div>
      <h3>Profiles</h3>
      {profiles.map((profile, index) => {
        return (
          <div key={profile.id}>
            <input
              placeholder="Id"
              defaultValue={profile.profileId._id}
              onChange={({ target: { value } }) => {
                profiles[index].profileId._id = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...profiles]);
              }}
            />
            <input
              placeholder="Name"
              defaultValue={profile.profileId.name}
              onChange={({ target: { value } }) => {
                profiles[index].profileId.name = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...profiles]);
              }}
            />
          </div>
        );
      })}
      <button
        onClick={(e) => {
          e.preventDefault();
          setProfiles([...profiles, template]);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Profiles;
