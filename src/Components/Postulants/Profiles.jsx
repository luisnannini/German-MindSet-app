import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Profiles = ({ postulant, collectData }) => {
  const template = {
    profileId: { _id: '', name: '' },
    id: uuidv4()
  };
  const [profiles, setProfiles] = useState(postulant ? postulant.profiles : [template]);
  const sendData = (data) => {
    collectData(data, 'profiles');
    setProfiles(data);
  };
  useEffect(() => sendData(profiles), []);

  return (
    <div>
      {profiles.map((profile, index) => {
        return (
          <div key={profile.id}>
            <input
              placeholder={Object.keys(profile.profileId)[0].toUpperCase()}
              defaultValue={profile.profileId._id}
              onChange={({ target: { value } }) => {
                profiles[index].profileId._id = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...profiles]);
              }}
            />
            <input
              placeholder={Object.keys(profile.profileId)[1].toUpperCase()}
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
