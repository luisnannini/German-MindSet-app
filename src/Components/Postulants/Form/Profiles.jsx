import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Profiles = ({ postulant, collectData }) => {
  const template = {
    profileId: { _id: '', name: '' },
    id: uuidv4()
  };
  if (postulant) {
    postulant.profiles.forEach((element, index, array) => {
      if (!array[index].profileId) {
        array[index].profileId = template.profileId;
      }
    });
  }
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
            {Object.entries(profile.profileId).map((piKeyPair) => {
              return (
                <input
                  placeholder={piKeyPair[0]}
                  defaultValue={piKeyPair[1]}
                  onChange={({ target: { value } }) => {
                    profiles[index].profileId[piKeyPair[0]] = value; //no se puede encontrar el indice de un array a través de un objeto
                    sendData([...profiles]);
                  }}
                />
              );
            })}
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
