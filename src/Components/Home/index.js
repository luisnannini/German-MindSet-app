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
  const [filterValues, setFilterValues] = useState({ client: '', profileType: '', vacancies: '' });
  const [filteredPositions, setFilteredPositions] = useState([]);
  const [displayedPositions, setDisplayedPositions] = useState([]);

  useEffect(() => {
    if (!positions.length) {
      dispatch(getPositions());
    }
    const clients = [];
    const profileTypes = [];
    let willAddClient = true;
    let willAddProfile = true;
    for (let index = 0; index < positions.length; index++) {
      for (let index2 = 0; index2 < clients.length; index2++) {
        if (positions[index].client.name === clients[index2]) {
          willAddClient = false;
        }
      }
      for (let index2 = 0; index2 < profileTypes.length; index2++) {
        if (positions[index].professionalProfiles.name === profileTypes[index2]) {
          willAddProfile = false;
        }
      }
      if (willAddClient) clients.push(positions[index].client.name);
      if (willAddProfile) profileTypes.push(positions[index].professionalProfiles.name);
      willAddClient = true;
      willAddProfile = true;
    }
    setClients(clients.sort((a, b) => a > b));
    setProfiles(profileTypes.sort((a, b) => a > b));
    setFilteredPositions(positions.sort((a, b) => a.client.name > b.client.name));
    setDisplayedPositions(positions.sort((a, b) => a.client.name > b.client.name));
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
                  onChange={({ target: { value } }) => {
                    setFilterValues({ ...filterValues, client: value });
                    setFilteredPositions(
                      positions.filter((p) => {
                        return (
                          (!value || p.client.name === value) &&
                          (!filterValues.profileType ||
                            p.professionalProfiles.name === filterValues.profileType) &&
                          (!filterValues.vacancies || p.vacancy === filterValues.vacancies)
                        );
                      })
                    );
                  }}
                >
                  <option value="" selected={!filterValues.client ? true : false}>
                    Company
                  </option>
                  {clients.map((c, index) => (
                    <option
                      key={index}
                      value={c}
                      selected={filterValues.client === c ? true : false}
                    >
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.label} htmlFor="profileType">
                Profile type:
                <select
                  className={styles.select}
                  onChange={({ target: { value } }) => {
                    setFilterValues({ ...filterValues, profileType: value });
                    setFilteredPositions(
                      positions.filter((p) => {
                        return (
                          (!value || p.professionalProfiles.name === value) &&
                          (!filterValues.client || p.client.name === filterValues.client) &&
                          (!filterValues.vacancies || p.vacancy === filterValues.vacancies)
                        );
                      })
                    );
                  }}
                >
                  <option value="" selected={!filterValues.profileType ? true : false}>
                    Profile type
                  </option>
                  {profiles.map((p, index) => (
                    <option
                      key={index}
                      value={p}
                      selected={filterValues.profileType === p ? true : false}
                    >
                      {p}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.label} htmlFor="vacancies">
                Vacancies:
                <input
                  defaultValue={filterValues.vacancies ? filterValues.vacancies : ''}
                  className={styles.select}
                  name="vacancies"
                  placeholder="Write a number..."
                  onChange={({ target: { value } }) => {
                    setFilterValues({ ...filterValues, vacancies: value });
                    setFilteredPositions(
                      positions.filter((p) => {
                        return (
                          (!value || p.vacancy == value) &&
                          (!filterValues.client || p.client.name === filterValues.client) &&
                          (!filterValues.profileType ||
                            p.professionalProfiles.name === filterValues.profileType)
                        );
                      })
                    );
                  }}
                />
              </label>
            </div>
            <button
              className={styles.button}
              onClick={() => setDisplayedPositions(filteredPositions)}
            >
              SEARCH
            </button>
            <button
              className={styles.button}
              onClick={() => {
                setFilterValues({ client: '', profileType: '', vacancies: '' });
                setDisplayedPositions(positions);
              }}
            >
              CLEAR FILTERS
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.openJobs}>
        {!displayedPositions.length ? (
          <p>No open jobs</p>
        ) : (
          displayedPositions.map((p, index) => (
            <div className={styles.openJobsDiv} key={index}>
              <p className={styles.clientName}>{p.client.name}</p>
              <span>{p.professionalProfiles.name}</span>
              <span>{p.jobDescription}</span>
              <span>Vacancies: {p.vacancy}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Home;
