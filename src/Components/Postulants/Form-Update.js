import style from './postulants-Form.module.css';
import { useEffect, useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import FormItem from './FormItem.js';

function Form({ postulant, id, postulantTemplate }) {
  const [modal, setModal] = useState({ state: false });
  const [contactRange, setContactRange] = useState({});
  const [formPrimaryStudies, setFormPrimaryStudies] = useState(postulant.studies.primaryStudies);
  const [formSecundaryStudies, setFormSecundaryStudies] = useState(
    postulant.studies.secondaryStudies
  );
  const [formTertiaryStudies, setFormTertiaryStudies] = useState(postulant.studies.terciaryStudies);
  const [formUniversityStudies, setFormUniversityStudies] = useState(
    postulant.studies.universityStudies
  );
  const [formInformalStudies, setFormInformalStudies] = useState(postulant.studies.informalStudies);
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
  const [profiles, setProfiles] = useState(postulant.profiles);
  const [workExperience, setWorkExperience] = useState(postulant.workExperience);
  const saveNewTerciarySchool = (counter, value) => {
    console.log('asd');
  };
  const createTerciarySchool = (index, value) => {
    let counter;
    return (
      <div>
        <input
          placeholder="Start date"
          onChange={(e) =>
            setFormTertiaryStudies(
              formTertiaryStudies.map((tertiaryStudy) => {
                if (counter === index) return { ...tertiaryStudy, startDate: value };
              })
            )
          }
        />
        <input
          placeholder="End date"
          onChange={(e) => setFormTertiaryStudies({ ...formTertiaryStudies, endDate: e })}
        />
        <textarea
          placeholder="Description"
          onChange={(e) => setFormTertiaryStudies({ ...formTertiaryStudies, description: e })}
        ></textarea>
        <input
          placeholder="Insitute"
          onChange={(e) => setFormTertiaryStudies({ ...formTertiaryStudies, institute: e })}
        />
      </div>
    );
  };
  const createUniversity = () => {
    return (
      <div>
        <input
          placeholder="Start date"
          onChange={(e) => setFormUniversityStudies({ ...formUniversityStudies, startDate: e })}
        />
        <input
          placeholder="End date"
          onChange={(e) => setFormUniversityStudies({ ...formUniversityStudies, endDate: e })}
        />
        <textarea
          placeholder="Description"
          onChange={(e) => setFormUniversityStudies({ ...formUniversityStudies, description: e })}
        ></textarea>

        <input
          placeholder="Institute"
          onChange={(e) => setFormUniversityStudies({ ...formUniversityStudies, institute: e })}
        />
      </div>
    );
  };
  const createInformalSchool = () => {
    return (
      <div>
        <input
          placeholder="Start date"
          onChange={(e) => setFormInformalStudies({ ...formInformalStudies, startDate: e })}
        />
        <input
          placeholder="End date"
          onChange={(e) => setFormInformalStudies({ ...formInformalStudies, endDate: e })}
        />
        <textarea
          placeholder="Description"
          onChange={(e) => setFormInformalStudies({ ...formInformalStudies, description: e })}
        ></textarea>
        <input
          placeholder="Institute"
          onChange={(e) => setFormUniversityStudies({ ...formInformalStudies, institute: e })}
        />
      </div>
    );
  };
  const createWorkExperience = () => {
    return (
      <div>
        <input
          placeholder="Company"
          onChange={(e) => setWorkExperience({ ...workExperience, company: e })}
        />
        <input
          placeholder="Start date"
          onChange={(e) => setWorkExperience({ ...workExperience, startDate: e })}
        />
        <input
          placeholder="End date"
          onChange={(e) => setWorkExperience({ ...workExperience, endDate: e })}
        />
        <input
          placeholder="Description"
          onChange={(e) => setWorkExperience({ ...workExperience, description: e })}
        />
      </div>
    );
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
                value={postulant ? postulant.studies.primaryStudies.startDate : ''}
                placeholder="Start date"
              />
              <input
                value={postulant ? postulant.studies.primaryStudies.endDate : ''}
                placeholder="End date"
              />
              <input
                value={postulant ? postulant.studies.primaryStudies.school : ''}
                placeholder="School"
              />
            </div>
            <div>
              <h4>Secundary studies</h4>
              <input
                value={postulant ? postulant.studies.secondaryStudies.startDate : ''}
                placeholder="Start date"
              />
              <input
                value={postulant ? postulant.studies.secondaryStudies.endDate : ''}
                placeholder="End date"
              />
              <input
                value={postulant ? postulant.studies.secondaryStudies.school : ''}
                placeholder="School"
              />
            </div>
            <div>
              <h4>Tertiary studies</h4>
              {postulant
                ? postulant.studies.tertiaryStudies.map((tertiaryStudy) => {
                    let counter = 0;
                    return (
                      <>
                        <input
                          value={tertiaryStudy.startDate}
                          placeholder="Start date"
                          onChange={(e) => {
                            createTerciarySchool(counter, e.currentTarget.value);
                          }}
                        />
                        <input value={tertiaryStudy.endDate} placeholder="End date" />
                        <textarea
                          value={tertiaryStudy.description}
                          placeholder="Description"
                        ></textarea>
                        <input value={tertiaryStudy.institute} placeholder="Institute" />
                      </>
                    );
                  })
                : ''}
            </div>
            <div>
              <h4>University studies</h4>
              {postulant
                ? postulant.studies.universityStudies.map((universityStudy) => {
                    return (
                      <>
                        <input value={universityStudy.startDate} placeholder="Start date" />
                        <input value={universityStudy.endDate} placeholder="End date" />
                        <textarea
                          value={universityStudy.description}
                          placeholder="Description"
                        ></textarea>
                        <input value={universityStudy.institute} placeholder="Institute" />
                      </>
                    );
                  })
                : ''}
            </div>
            <div>
              <h4>Informal studies</h4>
              {postulant
                ? postulant.studies.informalStudies.map((informalStudy) => {
                    return (
                      <>
                        <input value={informalStudy.startDate} placeholder="Start date" />
                        <input value={informalStudy.endDate} placeholder="End date" />
                        <textarea
                          value={informalStudy.description}
                          placeholder="Description"
                        ></textarea>
                        <input value={informalStudy.institute} placeholder="Institute" />
                      </>
                    );
                  })
                : ''}
            </div>
          </div>
        </div>
        <div>
          <h3>Contact range</h3>
          <input value={postulant ? postulant.contactRange.from : ''} placeholder="From" />
          <input value={postulant ? postulant.contactRange.to : ''} placeholder="To" />
        </div>
        <div className={style.container}>
          <div>
            <h3>First name</h3>
            <input value={postulant ? postulant.firstName : ''} placeholder="First name" />
          </div>
          <div>
            <h3>Last name</h3>
            <input value={postulant ? postulant.lastName : ''} placeholder="Last name" />
          </div>
          <div>
            <h3>Email</h3>
            <input value={postulant ? postulant.email : ''} placeholder="Email" />
          </div>
          <div>
            <h3>Password</h3>
            <input value={postulant ? postulant.password : ''} placeholder="Password" />
          </div>
          <div>
            <h3>Address</h3>
            <input value={postulant ? postulant.address : ''} placeholder="Address" />
          </div>
          <div>
            <h3>Birthday</h3>
            <input value={postulant ? postulant.birthday : ''} placeholder="Birthday" />
          </div>
          <div>
            <h3>Available</h3>
            <checkbox value={postulant ? postulant.available : ''} placeholder="Available" />
          </div>
          <div>
            <h3>Phone</h3>
            <input value={postulant ? postulant.phone : ''} placeholder="Phone" />
          </div>
          <div>
            <h3>Created at:</h3>
            <input value={postulant ? postulant.createdAt : ''} placeholder="Created at:" />
          </div>
          <div>
            <h3>Updated at:</h3>
            <input value={postulant ? postulant.updatedAt : ''} placeholder="Updated at:" />
          </div>
        </div>
        <div>
          <h3>Profiles</h3>
          {postulant
            ? postulant.profiles.map((profile) => {
                return (
                  <>
                    <input value={profile.profileId._id} />
                    <input value={profile.profileId.name} />
                  </>
                );
              })
            : ''}
        </div>
        <div>
          <h3>Work experience</h3>
          {postulant
            ? postulant.workExperience.map((work) => {
                return (
                  <>
                    <input value={work.company} placeholder="Institute" />
                    <input value={work.startDate} placeholder="Start date" />
                    <input value={work.endDate} placeholder="End date" />
                    <textarea value={work.description} placeholder="Description"></textarea>
                  </>
                );
              })
            : ''}
        </div>
        <Button title={id ? 'Save' : 'Add'} />
      </form>
    </section>
  );
}

export default Form;
