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
          .filter((postulant) => postulant._id === '61a86f4ba1a0cab9a3324acf')
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
                      Start Date:
                      {postulant.studies.primaryStudies.startDate.replace('T00:00:00.000Z', '')}
                    </p>
                    <p>
                      End Date:
                      {postulant.studies.primaryStudies.endDate.replace('T00:00:00.000Z', '')}
                    </p>
                  </div>
                  <div className={styles.internalBox}>
                    <h2>Secondary Studies</h2>
                    <p>School: {postulant.studies.secondaryStudies.school}</p>
                    <p>
                      Start Date:
                      {postulant.studies.secondaryStudies.startDate.replace('T00:00:00.000Z', '')}
                    </p>
                    <p>
                      End Date:
                      {postulant.studies.secondaryStudies.endDate.replace('T00:00:00.000Z', '')}
                    </p>
                  </div>
                </div>
                <div className={styles.box}>
                  <div className={styles.internalBox}>
                    <h2>Tertiary Studies</h2>
                    <p>Institute: {postulant.studies.tertiaryStudies[0].institute}</p>
                    <p>
                      Start Date:
                      {postulant.studies.tertiaryStudies[0].startDate.replace('T00:00:00.000Z', '')}
                    </p>
                    <p>
                      End Date:
                      {postulant.studies.tertiaryStudies[0].endDate.replace('T00:00:00.000Z', '')}
                    </p>
                  </div>
                  <div className={styles.internalBox}>
                    <h2>University Studies</h2>
                    <p>Institute: {postulant.studies.universityStudies[0].institute}</p>
                    <p>
                      Start Date:
                      {postulant.studies.universityStudies[0].startDate.replace(
                        'T00:00:00.000Z',
                        ''
                      )}
                    </p>
                    <p>
                      End Date:
                      {postulant.studies.universityStudies[0].endDate.replace('T00:00:00.000Z', '')}
                    </p>
                  </div>
                </div>
                <div className={styles.box}>
                  <div className={styles.internalBox}>
                    <h2>Informal Studies</h2>
                    <p>Institute: {postulant.studies.informalStudies[0].institute}</p>
                    <p>
                      Start Date:
                      {postulant.studies.informalStudies[0].startDate.replace('T00:00:00.000Z', '')}
                    </p>
                    <p>
                      End Date:
                      {postulant.studies.informalStudies[0].endDate.replace('T00:00:00.000Z', '')}
                    </p>
                  </div>
                </div>
                <div className={styles.box}>
                  <div className={styles.internalBox}>
                    <h2>Work Experience</h2>
                    <p>Company: {postulant.workExperience[0].company}</p>
                    <p>Job description: {postulant.workExperience[0].description}</p>
                    <p>
                      Start Date:
                      {postulant.workExperience[0].startDate.replace('T00:00:00.000Z', '')}
                    </p>
                    <p>
                      End Date: {postulant.workExperience[0].endDate.replace('T00:00:00.000Z', '')}
                    </p>
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
                <button
                  onClick={() => history.push(`/postulant/profile/form?_id=${postulant._id}`)}
                >
                  Edit information
                </button>
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default Profile;
