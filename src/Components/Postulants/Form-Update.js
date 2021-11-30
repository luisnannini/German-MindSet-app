import style from './postulants-Form.module.css';
import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import { v4 as uuidv4 } from 'uuid';

function Form({ postulant, id, postulantTemplate }) {
  const [modal, setModal] = useState({ state: false });
  const [contactRange, setContactRange] = useState(postulant.contactRange);
  const [primaryStudies, setPrimaryStudies] = useState(postulant.studies.primaryStudies);
  const [secondaryStudies, setSecondaryStudies] = useState(postulant.studies.secondaryStudies);
  const [tertiaryStudies, setTertiaryStudies] = useState(
    postulant.studies.tertiaryStudies.map((tertiaryStudy) => {
      tertiaryStudy.id = uuidv4();
      return tertiaryStudy;
    })
  );
  const [universityStudies, setuniversityStudies] = useState(
    postulant.studies.universityStudies.map((universityStudy) => {
      universityStudy.id = uuidv4();
      return universityStudy;
    })
  );
  const [informalStudies, setInformalStudies] = useState(
    postulant.studies.informalStudies.map((informalStudy) => {
      informalStudy.id = uuidv4();
      return informalStudy;
    })
  );
  const [singleKeys, setSingleKeys] = useState({
    id: postulant._id,
    firstName: postulant.firstName,
    lastName: postulant.lastName,
    email: postulant.email,
    password: postulant.password,
    address: postulant.address,
    birthday: postulant.birthday,
    available: postulant.available,
    phone: postulant.phone,
    createdAt: postulant.createdAt
  });
  const [profiles, setProfiles] = useState(
    postulant.profiles.map((profile) => {
      profile.id = uuidv4();
      return profile;
    })
  );
  const [workExperience, setWorkExperience] = useState(
    postulant.workExperience.map((work) => {
      work.id = uuidv4();
      return work;
    })
  );

  const submit = async (e) => {
    e.preventDefault();
    console.log({
      contactRange,
      studies: {
        primaryStudies,
        secondaryStudies,
        tertiaryStudies,
        universityStudies,
        informalStudies
      },
      ...singleKeys,
      profiles,
      workExperience
    });
    try {
      const responseRaw = await fetch(`${process.env.REACT_APP_API}/postulants?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          contactRange,
          studies: {
            primaryStudies,
            secondaryStudies,
            tertiaryStudies,
            universityStudies,
            informalStudies
          },
          ...singleKeys,
          profiles,
          workExperience
        })
      });
      const responseJson = await responseRaw.json();
      setModal({
        title: 'Updated',
        state: true,
        message: responseJson.message,
        action: () => {
          window.location.href = `${window.location.origin}/postulants`;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={style.section}>
      <div className={style.formHeader}></div>
      <h1>{`Edit ${id}`}</h1>
      <form>
        <div>
          <h3>Studies</h3>
          <div className={style.inputSection}>
            <div>
              <h4>Primary studies</h4>
              <input
                defaultValue={postulant.studies.primaryStudies.startDate}
                placeholder="Start date"
                onChange={({ target: { value } }) =>
                  setPrimaryStudies({ ...primaryStudies, startDate: value })
                }
              />
              <input
                defaultValue={postulant.studies.primaryStudies.endDate}
                placeholder="End date"
                onChange={({ target: { value } }) =>
                  setPrimaryStudies({ ...primaryStudies, endDate: value })
                }
              />
              <input
                defaultValue={postulant.studies.primaryStudies.school}
                placeholder="School"
                onChange={({ target: { value } }) =>
                  setPrimaryStudies({ ...primaryStudies, school: value })
                }
              />
            </div>
            <div>
              <h4>Secundary studies</h4>
              <input
                defaultValue={postulant.studies.secondaryStudies.startDate}
                placeholder="Start date"
                onChange={({ target: { value } }) =>
                  setSecondaryStudies({ ...secondaryStudies, startDate: value })
                }
              />
              <input
                defaultValue={postulant.studies.secondaryStudies.endDate}
                placeholder="End date"
                onChange={({ target: { value } }) =>
                  setSecondaryStudies({ ...secondaryStudies, endDate: value })
                }
              />
              <input
                defaultValue={postulant.studies.secondaryStudies.school}
                placeholder="School"
                onChange={({ target: { value } }) =>
                  setSecondaryStudies({ ...secondaryStudies, school: value })
                }
              />
            </div>
            <div>
              <h4>Tertiary studies</h4>
              {postulant.studies.tertiaryStudies.map((tertiaryStudy, index) => {
                return (
                  <div key={tertiaryStudy.id}>
                    <input
                      defaultValue={tertiaryStudy.startDate}
                      placeholder="Start date"
                      onChange={({ target: { value } }) => {
                        tertiaryStudies[index].startDate = value; //no se puede encontrar el indice de un array a través de un objeto
                        setTertiaryStudies([...tertiaryStudies]);
                      }}
                    />
                    <input
                      defaultValue={tertiaryStudy.endDate}
                      placeholder="End date"
                      onChange={({ target: { value } }) => {
                        tertiaryStudies[index].endDate = value; //no se puede encontrar el indice de un array a través de un objeto
                        setTertiaryStudies([...tertiaryStudies]);
                      }}
                    />
                    <textarea
                      defaultValue={tertiaryStudy.description}
                      placeholder="Description"
                      onChange={({ target: { value } }) => {
                        tertiaryStudies[index].description = value; //no se puede encontrar el indice de un array a través de un objeto
                        setTertiaryStudies([...tertiaryStudies]);
                      }}
                    ></textarea>
                    <input
                      defaultValue={tertiaryStudy.institute}
                      placeholder="Institute"
                      onChange={({ target: { value } }) => {
                        tertiaryStudies[index].institute = value; //no se puede encontrar el indice de un array a través de un objeto
                        setTertiaryStudies([...tertiaryStudies]);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div>
              <h4>University studies</h4>
              {postulant.studies.universityStudies.map((universityStudy, index) => {
                return (
                  <div key={universityStudy.id}>
                    <input
                      defaultValue={universityStudy.startDate}
                      placeholder="Start date"
                      onChange={({ target: { value } }) => {
                        universityStudies[index].startDate = value; //no se puede encontrar el indice de un array a través de un objeto
                        setuniversityStudies([...universityStudies]);
                      }}
                    />
                    <input
                      defaultValue={universityStudy.endDate}
                      placeholder="End date"
                      onChange={({ target: { value } }) => {
                        universityStudies[index].endDate = value; //no se puede encontrar el indice de un array a través de un objeto
                        setuniversityStudies([...universityStudies]);
                      }}
                    />
                    <textarea
                      defaultValue={universityStudy.description}
                      placeholder="Description"
                      onChange={({ target: { value } }) => {
                        universityStudies[index].description = value; //no se puede encontrar el indice de un array a través de un objeto
                        setuniversityStudies([...universityStudies]);
                      }}
                    ></textarea>
                    <input
                      defaultValue={universityStudy.institute}
                      placeholder="Institute"
                      onChange={({ target: { value } }) => {
                        universityStudies[index].institute = value; //no se puede encontrar el indice de un array a través de un objeto
                        setuniversityStudies([...universityStudies]);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div>
              <h4>Informal studies</h4>
              {postulant.studies.informalStudies.map((informalStudy, index) => {
                return (
                  <div key={informalStudy.id}>
                    <input
                      defaultValue={informalStudy.startDate}
                      placeholder="Start date"
                      onChange={({ target: { value } }) => {
                        informalStudies[index].startDate = value; //no se puede encontrar el indice de un array a través de un objeto
                        setInformalStudies([...informalStudies]);
                      }}
                    />
                    <input
                      defaultValue={informalStudy.endDate}
                      placeholder="End date"
                      onChange={({ target: { value } }) => {
                        informalStudies[index].endDate = value; //no se puede encontrar el indice de un array a través de un objeto
                        setInformalStudies([...informalStudies]);
                      }}
                    />
                    <textarea
                      defaultValue={informalStudy.description}
                      placeholder="Description"
                      onChange={({ target: { value } }) => {
                        informalStudies[index].description = value; //no se puede encontrar el indice de un array a través de un objeto
                        setInformalStudies([...informalStudies]);
                      }}
                    ></textarea>
                    <input
                      defaultValue={informalStudy.institute}
                      placeholder="Institute"
                      onChange={({ target: { value } }) => {
                        informalStudies[index].institute = value; //no se puede encontrar el indice de un array a través de un objeto
                        setInformalStudies([...informalStudies]);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <h3>Contact range</h3>
          <input
            defaultValue={postulant.contactRange.from}
            placeholder="From"
            onChange={(e) => setContactRange({ ...contactRange, from: e.target.value })}
          />
          <input
            defaultValue={postulant.contactRange.to}
            placeholder="To"
            onChange={(e) => setContactRange({ ...contactRange, to: e.target.value })}
          />
        </div>
        <div className={style.container}>
          <div>
            <h3>First name</h3>
            <input
              defaultValue={postulant.firstName}
              placeholder="First name"
              onChange={(e) => setSingleKeys({ ...singleKeys, firstName: e.target.value })}
            />
          </div>
          <div>
            <h3>Last name</h3>
            <input
              defaultValue={postulant.lastName}
              placeholder="Last name"
              onChange={(e) => setSingleKeys({ ...singleKeys, lastName: e.target.value })}
            />
          </div>
          <div>
            <h3>Email</h3>
            <input
              defaultValue={postulant.email}
              placeholder="Email"
              onChange={(e) => setSingleKeys({ ...singleKeys, email: e.target.value })}
            />
          </div>
          <div>
            <h3>Password</h3>
            <input
              defaultValue={postulant.password}
              placeholder="Password"
              onChange={(e) => setSingleKeys({ ...singleKeys, password: e.target.value })}
            />
          </div>
          <div>
            <h3>Address</h3>
            <input
              defaultValue={postulant.address}
              placeholder="Address"
              onChange={(e) => setSingleKeys({ ...singleKeys, address: e.target.value })}
            />
          </div>
          <div>
            <h3>Birthday</h3>
            <input
              defaultValue={postulant.birthday}
              placeholder="Birthday"
              onChange={(e) => setSingleKeys({ ...singleKeys, birthday: e.target.value })}
            />
          </div>
          <div>
            <h3>Available</h3>
            <input
              type="checkbox"
              defaultValue={postulant.available}
              placeholder="Available"
              onChange={(e) => setSingleKeys({ ...singleKeys, available: e.target.checked })}
            />
          </div>
          <div>
            <h3>Phone</h3>
            <input
              defaultValue={postulant.phone}
              placeholder="Phone"
              onChange={(e) => setSingleKeys({ ...singleKeys, phone: e.target.value })}
            />
          </div>
          <div>
            <h3>Created at:</h3>
            <input
              defaultValue={postulant.createdAt}
              placeholder="Created at:"
              onChange={(e) => setSingleKeys({ ...singleKeys, createdAt: e.target.value })}
            />
          </div>
          <div>
            <h3>Updated at:</h3>
            <input
              defaultValue={postulant.updatedAt}
              placeholder="Updated at:"
              onChange={(e) => setSingleKeys({ ...singleKeys, updatedAt: e.target.value })}
            />
          </div>
        </div>
        <div>
          <h3>Profiles</h3>
          {postulant.profiles.map((profile, index) => {
            return (
              <div key={profile.id}>
                <input
                  placeholder="Id"
                  defaultValue={profile._id}
                  onChange={({ target: { value } }) => {
                    profiles[index]._id = value; //no se puede encontrar el indice de un array a través de un objeto
                    setProfiles([...profiles]);
                  }}
                />
                <input
                  placeholder="Name"
                  defaultValue={profile.name}
                  onChange={({ target: { value } }) => {
                    profiles[index].name = value; //no se puede encontrar el indice de un array a través de un objeto
                    setProfiles([...profiles]);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div>
          <h3>Work experience</h3>
          {postulant.workExperience.map((work, index) => {
            return (
              <div key={work.id}>
                <input
                  defaultValue={work.company}
                  placeholder="Company"
                  onChange={({ target: { value } }) => {
                    workExperience[index].company = value; //no se puede encontrar el indice de un array a través de un objeto
                    setWorkExperience([...workExperience]);
                  }}
                />
                <input
                  defaultValue={work.startDate}
                  placeholder="Start date"
                  onChange={({ target: { value } }) => {
                    workExperience[index].startDate = value; //no se puede encontrar el indice de un array a través de un objeto
                    setWorkExperience([...workExperience]);
                  }}
                />
                <input
                  defaultValue={work.endDate}
                  placeholder="End date"
                  onChange={({ target: { value } }) => {
                    workExperience[index].endDate = value; //no se puede encontrar el indice de un array a través de un objeto
                    setWorkExperience([...workExperience]);
                  }}
                />
                <textarea
                  defaultValue={work.description}
                  placeholder="Description"
                  onChange={({ target: { value } }) => {
                    workExperience[index].description = value; //no se puede encontrar el indice de un array a través de un objeto
                    setWorkExperience([...workExperience]);
                  }}
                ></textarea>
              </div>
            );
          })}
        </div>
        <Button title="Save" onClick={submit} />
      </form>
      {modal.state && <Modal modal={modal} setModal={setModal} />}
    </section>
  );
}

export default Form;
