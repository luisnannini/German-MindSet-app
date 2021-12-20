// import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// import { getPostulants, getPostulantById } from '../../../redux/Postulants/thunks';
// import useQuery from '../../../Hooks/useQuery';
import { useHistory } from 'react-router-dom';
import styles from './profile.module.css';

function Profile() {
  const history = useHistory();
  const [postulants, setPostulants] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          const status = `${response.status} ${response.statusText}`;
          return response.json().then(({ message }) => {
            if (message.message) throw { message: message.message, status };
            throw { message, status };
          });
        }
        return response.json();
      })
      .then((response) => {
        setPostulants(response.data);
      })
      .catch((error) => error);
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>Postulant Profile</h2>
        {postulants
          .filter((postulant) => postulant._id === '61c0de53b51c8f80eeea2edc')
          .map((postulant) => {
            return (
              <div key={postulant._id}>
                <div className={styles.headerDiv}>
                  <img src="" alt="Postulant Image"></img>
                  <div className={styles.headerDiv2}>
                    <h2>
                      {postulant.firstName} {postulant.lastName}
                    </h2>
                    <span>{postulant.email}</span>
                    <span>{postulant.birthday.replace('T00:00:00.000Z', '')}</span>
                    <span>{postulant.address}</span>
                    <span>{postulant.phone}</span>
                  </div>
                </div>
                <div className={styles.box}>
                  <div className={styles.internalBox}>
                    <h2>Primary Studies</h2>
                    <p>School: {postulant.studies.primaryStudies.school}</p>
                    <p>
                      Start Date:{' '}
                      {postulant.studies.primaryStudies.startDate.replace('T00:00:00.000Z', '')}
                    </p>
                    <p>
                      End Date:{' '}
                      {postulant.studies.primaryStudies.endDate.replace('T00:00:00.000Z', '')}
                    </p>
                  </div>
                  <div className={styles.internalBox}>
                    <h2>Secondary Studies</h2>
                    <p>School: {postulant.studies.secondaryStudies.school}</p>
                    <p>
                      Start Date:{' '}
                      {postulant.studies.secondaryStudies.startDate.replace('T00:00:00.000Z', '')}
                    </p>
                    <p>
                      End Date:{' '}
                      {postulant.studies.secondaryStudies.endDate.replace('T00:00:00.000Z', '')}
                    </p>
                  </div>
                </div>
                <div className={styles.box}>
                  <div className={styles.internalBox}>
                    <h2>Tertiary Studies</h2>
                    <p>{postulant.studies.tertiaryStudies.length === 0 && 'No Information'}</p>
                    {postulant.studies.tertiaryStudies.map((tertiaryStudies) => {
                      if (postulant.studies.tertiaryStudies.length > 0) {
                        return (
                          <>
                            <p>Company: {tertiaryStudies.institute}</p>
                            <p>
                              Start Date: {tertiaryStudies.startDate.replace('T00:00:00.000Z', '')}
                            </p>
                            <p>End Date: {tertiaryStudies.endDate.replace('T00:00:00.000Z', '')}</p>
                            <p>------</p>
                          </>
                        );
                      }
                    })}
                  </div>
                  <div className={styles.internalBox}>
                    <h2>University Studies</h2>
                    <p>{postulant.studies.universityStudies.length === 0 && 'No Information'}</p>
                    {postulant.studies.universityStudies.map((universityStudies) => {
                      if (postulant.studies.universityStudies.length > 0) {
                        return (
                          <>
                            <p>Company: {universityStudies.institute}</p>
                            <p>
                              Start Date:{' '}
                              {universityStudies.startDate.replace('T00:00:00.000Z', '')}
                            </p>
                            <p>
                              End Date: {universityStudies.endDate.replace('T00:00:00.000Z', '')}
                            </p>
                            <p>------</p>
                          </>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className={styles.box}>
                  <div className={styles.internalBox}>
                    <h2>Informal Studies</h2>
                    <p>{postulant.studies.informalStudies.length === 0 && 'No information'}</p>
                    {postulant.studies.informalStudies.map((informalStudies) => {
                      if (postulant.studies.informalStudies.length >= 0) {
                        return (
                          <>
                            <p>Company: {informalStudies.institute}</p>
                            <p>
                              Start Date: {informalStudies.startDate.replace('T00:00:00.000Z', '')}
                            </p>
                            <p>End Date: {informalStudies.endDate.replace('T00:00:00.000Z', '')}</p>
                            <p>------</p>
                          </>
                        );
                      }
                    })}
                  </div>
                  <div className={styles.internalBox}>
                    <h2>Work Experience</h2>
                    <p>{postulant.workExperience.length === 0 && 'No Information'}</p>
                    {postulant.workExperience.map((workExperience) => {
                      if (postulant.workExperience.length > 0) {
                        return (
                          <>
                            <p>Company: {workExperience.company}</p>
                            <p>Job description: {workExperience.description}</p>
                            <p>
                              Start Date: {workExperience.startDate.replace('T00:00:00.000Z', '')}
                            </p>
                            <p>End Date: {workExperience.endDate.replace('T00:00:00.000Z', '')}</p>
                            <p>------</p>
                          </>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className={styles.available}>
                  <h2>Contact Range</h2>
                  <table>
                    <tbody>
                      <tr>
                        <th>Available: {postulant.available === true ? 'Yes' : 'No'}</th>
                        <th>{postulant.available === true && 'From Monday to Friday'}</th>
                        {postulant.available === true ? (
                          <th>From: {postulant.contactRange.from}</th>
                        ) : (
                          <th></th>
                        )}
                        {postulant.available === true ? (
                          <th>To: {postulant.contactRange.to}</th>
                        ) : (
                          <th></th>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={styles.button}>
                  <button
                    onClick={() => history.push(`/postulant/profile/form?_id=${postulant._id}`)}
                  >
                    Edit information
                  </button>
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default Profile;
