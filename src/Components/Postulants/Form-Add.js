import style from './postulants-Form.module.css';
import { useEffect, useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import FormItem from './FormItem.js';
import AddTerciaryStudy from './AddTerciaryStudy.js';

function Form() {
  const [modal, setModal] = useState({ state: false });
  const [contactRange, setContactRange] = useState({});
  const [primaryStudies, setPrimaryStudies] = useState({});
  const [secundaryStudies, setSecundaryStudies] = useState({});
  const [tertiaryStudies, setTertiaryStudies] = useState({});
  const [universityStudies, setUniversityStudies] = useState({});
  const [informalStudies, setInformalStudies] = useState({});
  const [singleKeys, setSingleKeys] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    birthday: '',
    available: '',
    phone: '',
    createdAt: '',
    updatedAt: ''
  });
  const [profiles, setProfiles] = useState({ profileId: { id: '', name: '' } });
  const [workExperience, setWorkExperience] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    console.log({
      contactRange,
      studies: {
        primaryStudies,
        secondaryStudies: secundaryStudies,
        tertiaryStudies: Array.from(tertiaryStudies),
        universityStudies: Array.from(universityStudies),
        informalStudies: Array.from(informalStudies)
      },
      ...singleKeys,
      profiles: Array.from(informalStudies),
      workExperience
    });
    try {
      const responseRaw = await fetch(`${process.env.REACT_APP_API}/postulants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contactRange,
          studies: {
            primaryStudies,
            secondaryStudies: secundaryStudies,
            tertiaryStudies: Array.from(tertiaryStudies),
            universityStudies: Array.from(universityStudies),
            informalStudies: Array.from(informalStudies)
          },
          ...singleKeys,
          profiles: Array.from(informalStudies),
          workExperience
        })
      });
      const responseJson = await responseRaw.json();
      console.log(responseJson);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={style.section}>
      <div className={style.formHeader}></div>
      <form>
        <div>
          <h3>Studies</h3>
          <div className={style.inputSection}>
            <div>
              <h4>Primary studies</h4>
              <input
                placeholder="Start date"
                onChange={({ target: { value } }) => {
                  setPrimaryStudies({ ...primaryStudies, startDate: value });
                }}
              />
              <input
                placeholder="End date"
                onChange={({ target: { value } }) => {
                  setPrimaryStudies({ ...primaryStudies, endDate: value });
                }}
              />
              <input
                placeholder="School"
                onChange={({ target: { value } }) => {
                  setPrimaryStudies({ ...primaryStudies, school: value });
                }}
              />
            </div>

            <div>
              <h4>Secundary studies</h4>
              <input
                placeholder="Start date"
                onChange={({ target: { value } }) => {
                  setSecundaryStudies({ ...secundaryStudies, startDate: value });
                }}
              />
              <input
                placeholder="End date"
                onChange={({ target: { value } }) => {
                  setSecundaryStudies({ ...secundaryStudies, endDate: value });
                }}
              />
              <input
                placeholder="School"
                onChange={({ target: { value } }) => {
                  setSecundaryStudies({ ...secundaryStudies, school: value });
                }}
              />
            </div>

            <div>
              <h4>Tertiary studies</h4>
              <input
                placeholder="Start date"
                onChange={({ target: { value } }) => {
                  setTertiaryStudies({ ...tertiaryStudies, startDate: value });
                }}
              />
              <input
                placeholder="End date"
                onChange={({ target: { value } }) => {
                  setTertiaryStudies({ ...tertiaryStudies, endDate: value });
                }}
              />
              <textarea
                placeholder="Description"
                onChange={({ target: { value } }) => {
                  setTertiaryStudies({ ...tertiaryStudies, description: value });
                }}
              ></textarea>
              <input
                placeholder="Institute"
                onChange={({ target: { value } }) => {
                  setTertiaryStudies({ ...tertiaryStudies, institute: value });
                }}
              />
            </div>

            <div>
              <h4>University studies</h4>
              <input
                placeholder="Start date"
                onChange={({ target: { value } }) => {
                  setUniversityStudies({ ...universityStudies, startDate: value });
                }}
              />
              <input
                placeholder="End date"
                onChange={({ target: { value } }) => {
                  setUniversityStudies({ ...universityStudies, endDate: value });
                }}
              />
              <textarea
                placeholder="Description"
                onChange={({ target: { value } }) => {
                  setUniversityStudies({ ...universityStudies, description: value });
                }}
              ></textarea>
              <input
                placeholder="Institute"
                onChange={({ target: { value } }) => {
                  setUniversityStudies({ ...universityStudies, institute: value });
                }}
              />
            </div>

            <div>
              <h4>Informal studies</h4>
              <input
                placeholder="Start date"
                onChange={({ target: { value } }) => {
                  setInformalStudies({ ...informalStudies, startDate: value });
                }}
              />
              <input
                placeholder="End date"
                onChange={({ target: { value } }) => {
                  setInformalStudies({ ...informalStudies, endDate: value });
                }}
              />
              <textarea
                placeholder="Description"
                onChange={({ target: { value } }) => {
                  setInformalStudies({ ...informalStudies, description: value });
                }}
              ></textarea>
              <input
                placeholder="Institute"
                onChange={({ target: { value } }) => {
                  setInformalStudies({ ...informalStudies, institute: value });
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <h3>Contact range</h3>
          <input
            placeholder="From"
            onChange={({ target: { value } }) => {
              setContactRange({ ...contactRange, from: value });
            }}
          />
          <input
            placeholder="To"
            onChange={({ target: { value } }) => {
              setContactRange({ ...contactRange, to: value });
            }}
          />
        </div>

        <div className={style.container}>
          <div>
            <h3>First name</h3>
            <input
              placeholder="First name"
              onChange={({ target: { value } }) => {
                setSingleKeys({ ...singleKeys, firstName: value });
              }}
            />
          </div>

          <div>
            <h3>Last name</h3>
            <input
              placeholder="Last name"
              onChange={({ target: { value } }) => {
                setSingleKeys({ ...singleKeys, lastName: value });
              }}
            />
          </div>

          <div>
            <h3>Email</h3>
            <input
              placeholder="Email"
              onChange={({ target: { value } }) => {
                setSingleKeys({ ...singleKeys, email: value });
              }}
            />
          </div>

          <div>
            <h3>Password</h3>
            <input
              placeholder="Password"
              onChange={({ target: { value } }) => {
                setSingleKeys({ ...singleKeys, password: value });
              }}
            />
          </div>

          <div>
            <h3>Address</h3>
            <input
              placeholder="Address"
              onChange={({ target: { value } }) => {
                setSingleKeys({ ...singleKeys, address: value });
              }}
            />
          </div>

          <div>
            <h3>Birthday</h3>
            <input
              placeholder="Birthday"
              onChange={({ target: { value } }) => {
                setSingleKeys({ ...singleKeys, birthday: value });
              }}
            />
          </div>

          <div>
            <h3>Available</h3>
            <input
              type="checkbox"
              placeholder="Available"
              onChange={({ target: { checked } }) => {
                setSingleKeys({ ...singleKeys, available: checked });
              }}
            />
          </div>

          <div>
            <h3>Phone</h3>
            <input
              placeholder="Phone"
              onChange={({ target: { value } }) => {
                setSingleKeys({ ...singleKeys, phone: value });
              }}
            />
          </div>

          <div>
            <h3>Created at:</h3>
            <input
              placeholder="Created at:"
              onChange={({ target: { value } }) => {
                setSingleKeys({ ...singleKeys, createdAt: value });
              }}
            />
          </div>

          <div>
            <h3>Updated at:</h3>
            <input
              placeholder="Updated at:"
              onChange={({ target: { value } }) => {
                setSingleKeys({ ...singleKeys, updatedAt: value });
              }}
            />
          </div>
        </div>

        <div>
          <h3>Profiles</h3>
          <input
            placeholder="Id"
            onChange={({ target: { value } }) => {
              setProfiles({ ...profiles, profileId: { ...profiles.profileId, id: value } });
            }}
          />
          <input placeholder="Name" />
        </div>

        <div>
          <h3>Work experience</h3>
          <input
            placeholder="Institute"
            onChange={({ target: { value } }) => {
              setWorkExperience({ ...workExperience, institute: value });
            }}
          />
          <input
            placeholder="Start date"
            onChange={({ target: { value } }) => {
              setWorkExperience({ ...workExperience, startDate: value });
            }}
          />
          <input
            placeholder="End date"
            onChange={({ target: { value } }) => {
              setWorkExperience({ ...workExperience, EndDate: value });
            }}
          />
          <textarea
            placeholder="Description"
            onChange={({ target: { value } }) => {
              setWorkExperience({ ...workExperience, description: value });
            }}
          ></textarea>
        </div>
        <Button title="Add" onClick={(e) => submit(e)} />
      </form>
    </section>
  );
}

export default Form;
