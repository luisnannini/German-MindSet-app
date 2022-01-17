import styles from './home.module.css';
import img from 'Images/img-home.jpg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions } from 'redux/Positions/thunks';

function Home() {
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const positions = useSelector((store) => store.positions.list);
  const [clients, setClients] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [filters, setFilters] = useState({ client: '', profileType: '', vacancies: '' });
  const [filterValues, setFilterValues] = useState({ client: '', profileType: '', vacancies: '' });
  useEffect(() => {
    if (!positions.length) {
      dispatch(getPositions());
    }
    const clients = [];
    const profileTypes = [];
    let willAddClient = true;
    let willAddprofile = true;
    for (let index = 0; index < positions.length; index++) {
      for (let index2 = 0; index2 < clients.length; index2++) {
        if (positions[index].client.name === clients[index2]) {
          willAddClient = false;
        }
      }
      for (let index2 = 0; index2 < profileTypes.length; index2++) {
        if (positions[index].professionalProfiles.name === profileTypes[index2]) {
          willAddprofile = false;
        }
      }
      if (willAddClient) clients.push(positions[index].client.name);
      if (willAddprofile) profileTypes.push(positions[index].professionalProfiles.name);
      willAddClient = true;
      willAddprofile = true;
    }
    setClients(clients);
    setProfiles(profileTypes);
  }, [positions]);
  return (
    <section className={styles.container}>
      <img src={img} alt="Img Home"></img>
      <h2>Open Jobs</h2>
      <div className={styles.filterContainer}>
        <div className={styles.filter} onClick={() => setOpenFilter(!openFilter)}>
          {openFilter ? 'HIDE FILTERS' : 'SHOW FILTERS'}
        </div>
        {openFilter ? (
          <>
            <div className={styles.filterElements}>
              <label className={styles.label} htmlFor="client">
                Company:
                <select
                  className={styles.select}
                  onChange={({ target: { value } }) =>
                    setFilterValues({ ...filterValues, client: value })
                  }
                >
                  <option value="" disabled selected>
                    Company
                  </option>
                  {clients.map((c, index) => (
                    <option key={index} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.label} htmlFor="profileType">
                Profile type:
                <select
                  className={styles.select}
                  onChange={({ target: { value } }) =>
                    setFilterValues({ ...filterValues, profileType: value })
                  }
                >
                  <option value="" disabled selected>
                    Profile type
                  </option>
                  {profiles.map((p, index) => (
                    <option key={index} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.label} htmlFor="vacancies">
                Vacancies:
                <input
                  className={styles.select}
                  name="vacancies"
                  placeholder="Write a number..."
                  onChange={({ target: { value } }) =>
                    setFilterValues({ ...filterValues, vacancies: value })
                  }
                />
              </label>
            </div>
            <button onClick={() => setFilters(filterValues)}>SET</button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.openJobs}>
        <p>{positions.isOpen === false && 'No open jobs'}</p>
        {positions
          .map((p) => ({
            client: p.client.name,
            profileType: p.professionalProfiles.name,
            vacancies: p.vacancy,
            isOpen: p.isOpen,
            jobDescription: p.jobDescription
          }))
          .map((p) => {
            if (p.isOpen === true) {
              for (let element in filters) {
                if (
                  Object.prototype.hasOwnProperty.call(filters, element) &&
                  filters[element] !== '' &&
                  filters[element] != p[element]
                ) {
                  return <></>;
                }
              }
              return (
                <div className={styles.openJobsDiv}>
                  <p className={styles.clientName}>{p.client}</p>
                  <span>{p.profileType}</span>
                  <span>{p.jobDescription}</span>
                  <span>Vacancies: {p.vacancies}</span>
                </div>
              );
            }
          })}
      </div>
    </section>
  );
}

export default Home;
