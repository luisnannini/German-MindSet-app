import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Profiles = ({ postulant, collectData, template }) => {
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
            <input
              placeholder="ID"
              defaultValue={profile.profileId._id}
              onChange={(e) => {
                profiles[index].profileId._id = e.target.value;
                sendData([...profiles]);
              }}
            />
            <input
              placeholder="Name"
              defaultValue={profile.profileId.name}
              onChange={(e) => {
                profiles[index].profileId.name = e.target.value;
                sendData([...profiles]);
              }}
            />
          </div>
        );
      })}
      <button
        onClick={(e) => {
          e.preventDefault();
          setProfiles([...profiles, { ...template, id: uuidv4() }]);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Profiles;
