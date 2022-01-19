import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './profile.module.css';
import profilePicture from 'Images/profile-picture.jpg';

function Profile() {
  const history = useHistory();

  const postulant = useSelector((store) => store.auth.data);

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.title}>
          {postulant.firstName} {postulant.lastName}
        </h1>
        <div key={postulant._id}>
          <div className={styles.headerDiv}>
            <img src={profilePicture} alt="Profile Pic"></img>
            <div className={styles.headerDiv2}>
              <span>{`Email: ${postulant.email}`}</span>
              <span>{`Address: ${postulant.address}`}</span>
              <span>{`Phone Number: ${postulant.phone}`}</span>
              <span>{`Birth Date: ${postulant.birthday.replace('T00:00:00.000Z', '')}`}</span>
              <span>{`Available: ${postulant.available ? 'Yes' : 'No'}`}</span>
            </div>
          </div>
          <div className={styles.box}>
            <div className={styles.internalBox}>
              <h2>Primary Studies</h2>
              <p>{postulant.studies.primaryStudies ? '' : 'No Information'}</p>
              {() => {
                if (postulant.studies.primaryStudies) {
                  return (
                    <>
                      {postulant.studies.primaryStudies.map((primaryStudies) => {
                        if (postulant.studies.primaryStudies.length > 0) {
                          return (
                            <>
                              <p>School: {primaryStudies.school}</p>
                              <p>
                                Start Date: {primaryStudies.startDate.replace('T00:00:00.000Z', '')}
                              </p>
                              <p>
                                End Date: {primaryStudies.endDate.replace('T00:00:00.000Z', '')}
                              </p>
                            </>
                          );
                        }
                      })}
                    </>
                  );
                }
              }}
            </div>
            <div className={styles.internalBox}>
              <h2>Secondary Studies</h2>
              <p>{postulant.studies.secondaryStudies ? '' : 'No Information'}</p>
              {() => {
                if (postulant.studies.secondaryStudies) {
                  return (
                    <>
                      {postulant.studies.secondaryStudies.map((secondaryStudies) => {
                        if (postulant.studies.secondaryStudies.length > 0) {
                          return (
                            <>
                              <p>School: {secondaryStudies.school}</p>
                              <p>
                                Start Date:{' '}
                                {secondaryStudies.startDate.replace('T00:00:00.000Z', '')}
                              </p>
                              <p>
                                End Date: {secondaryStudies.endDate.replace('T00:00:00.000Z', '')}
                              </p>
                            </>
                          );
                        }
                      })}
                    </>
                  );
                }
              }}
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
                      <p>Start Date: {tertiaryStudies.startDate.replace('T00:00:00.000Z', '')}</p>
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
                      <p>Start Date: {universityStudies.startDate.replace('T00:00:00.000Z', '')}</p>
                      <p>End Date: {universityStudies.endDate.replace('T00:00:00.000Z', '')}</p>
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
                      <p>Start Date: {informalStudies.startDate.replace('T00:00:00.000Z', '')}</p>
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
                      <p>Start Date: {workExperience.startDate.replace('T00:00:00.000Z', '')}</p>
                      <p>End Date: {workExperience.endDate.replace('T00:00:00.000Z', '')}</p>
                      <p>------</p>
                    </>
                  );
                }
              })}
            </div>
          </div>
          <div className={styles.button}>
            <button onClick={() => history.push(`/postulant/profile/form?_id=${postulant._id}`)}>
              Edit information
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
