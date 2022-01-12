import { useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './profile.module.css';

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
            <img src="" alt="Postulant Image"></img>
            <div className={styles.headerDiv2}>
              {/* <h2>
                {postulant.firstName} {postulant.lastName}
              </h2> */}
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
              <p>School: {postulant.studies.primaryStudies.school}</p>
              <p>
                Start Date:{' '}
                {postulant.studies.primaryStudies.startDate.replace('T00:00:00.000Z', '')}
              </p>
              <p>
                End Date: {postulant.studies.primaryStudies.endDate.replace('T00:00:00.000Z', '')}
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
                End Date: {postulant.studies.secondaryStudies.endDate.replace('T00:00:00.000Z', '')}
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
