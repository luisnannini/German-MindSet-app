import style from './postulants-Form.module.css';
import { useState } from 'react';
import Modal from './Modal';
import PrimitiveFormInput from './PrimitiveFormInput';
import ObjectFormInput from './ObjectFormInput';
import ArrayFormInput from './ArrayFormInput';
import Profiles from './Profiles';
import validatePostulant from './validations';
import { v4 as uuidv4 } from 'uuid';

function Form({ postulant, template, id }) {
  const [modal, setModal] = useState({ state: false });

  postulant.studies.tertiaryStudies.map((ts) => {
    ts.id = uuidv4();
  });
  postulant.studies.universityStudies.map((us) => {
    us.id = uuidv4();
  });
  postulant.studies.informalStudies.map((is) => {
    is.id = uuidv4();
  });
  postulant.profiles.map((profile) => {
    profile.id = uuidv4();
  });
  postulant.workExperience.map((we) => {
    we.id = uuidv4();
  });

  const collectData = (data, property) => {
    template.id = id;
    if (property === 'contactRange') template.contactRange = data;
    if (property === 'primaryStudies') template.studies.primaryStudies = data;
    if (property === 'secondaryStudies') template.studies.secondaryStudies = data;
    if (property === 'tertiaryStudies') template.studies.tertiaryStudies = data;
    if (property === 'universityStudies') template.studies.universityStudies = data;
    if (property === 'informalStudies') template.studies.informalStudies = data;
    if (property === 'firstName') template.firstName = data;
    if (property === 'lastName') template.lastName = data;
    if (property === 'email') template.email = data;
    if (property === 'password') template.password = data;
    if (property === 'address') template.address = data;
    if (property === 'birthday') template.birthday = data;
    if (property === 'available') template.available = data;
    if (property === 'phone') template.phone = data;
    if (property === 'createdAt') template.createdAt = data;
    if (property === 'updatedAt') template.updatedAt = data;
    if (property === 'profiles') template.profiles = data;
    if (property === 'workExperience') template.workExperience = data;
  };
  const submit = async (e) => {
    let error = false;
    let status;
    console.log(template);
    const message = validatePostulant(template);
    if (message) {
      setModal({
        title: 'An error ocurred',
        state: true,
        message: message
      });
    }
    e.preventDefault();
    /* try {
      const responseRaw = await fetch(`${process.env.REACT_APP_API}/postulants?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(template)
      });
      if (responseRaw.status !== 200 && responseRaw.status !== 201) {
        status = responseRaw.status + ' ' + responseRaw.statusText;
        error = true;
      }
      const responseJson = await responseRaw.json();
      if (error) {
        setModal({
          title: 'An error ocurred',
          state: true,
          message: responseJson.message,
        });
        return;
      }
      setModal({
        title: 'Updated',
        state: true,
        message: responseJson.message,
        action: () => {
          window.location.href = `${window.location.origin}/postulants`;
        }
      });
    } catch (error) {
      setModal({
        title: 'Failed to fetch',
        state: true,
        message: error.message
      });
      console.log(error);
    } */
  };

  return (
    <section className={style.section}>
      <div className={style.formHeader}></div>
      <h1 className={style.textCenter}>{`Edit ${id}`}</h1>
      <form>
        <div>
          <h2 className={style.textCenter}>Studies</h2>
          <div className={style.inputSection}>
            <div>
              <h3>Primary Studies</h3>
              <ObjectFormInput
                postulant={postulant.studies}
                collectData={collectData}
                dataName="primaryStudies"
                defaultValue={{ startDate: '', endDate: '', school: '' }}
              />
            </div>
            <div>
              <h3>Secondary Studies</h3>
              <ObjectFormInput
                postulant={postulant.studies}
                collectData={collectData}
                dataName="secondaryStudies"
                defaultValue={{ startDate: '', endDate: '', school: '' }}
              />
            </div>
            <div>
              <h3>Tertiary Studies</h3>
              <ArrayFormInput
                postulant={postulant.studies}
                collectData={collectData}
                dataName="tertiaryStudies"
                defaultValue={{
                  startDate: '',
                  endDate: '',
                  description: '',
                  institute: ''
                }}
              />
            </div>
            <div>
              <h3>University Studies</h3>
              <ArrayFormInput
                postulant={postulant.studies}
                collectData={collectData}
                dataName="universityStudies"
                defaultValue={{
                  startDate: '',
                  endDate: '',
                  description: '',
                  institute: ''
                }}
              />
            </div>
            <div>
              <h3>Informal Studies</h3>
              <ArrayFormInput
                postulant={postulant.studies}
                collectData={collectData}
                dataName="informalStudies"
                defaultValue={{
                  startDate: '',
                  endDate: '',
                  description: '',
                  institute: ''
                }}
              />
            </div>
          </div>
          <div>
            <h2>Contact Range</h2>
            <ObjectFormInput
              postulant={postulant}
              collectData={collectData}
              dataName="contactRange"
              defaultValue={{ from: '', to: '' }}
            />
          </div>
        </div>
        <div className={style.container}>
          <div>
            <h2>First Name</h2>
            <PrimitiveFormInput
              postulant={postulant}
              collectData={collectData}
              dataName="firstName"
            />
          </div>
          <div>
            <h2>Last Name</h2>
            <PrimitiveFormInput
              postulant={postulant}
              collectData={collectData}
              dataName="lastName"
            />
          </div>
          <div>
            <h2>Email</h2>
            <PrimitiveFormInput postulant={postulant} collectData={collectData} dataName="email" />
          </div>
          <div>
            <h2>Password</h2>
            <PrimitiveFormInput
              postulant={postulant}
              collectData={collectData}
              dataName="password"
            />
          </div>
          <div>
            <h2>Address</h2>
            <PrimitiveFormInput
              postulant={postulant}
              collectData={collectData}
              dataName="address"
            />
          </div>
          <div>
            <h2>Birthday</h2>
            <PrimitiveFormInput
              postulant={postulant}
              collectData={collectData}
              dataName="birthday"
            />
          </div>
          <div>
            <h2>Available</h2>
            <PrimitiveFormInput
              postulant={postulant}
              collectData={collectData}
              dataName="available"
            />
          </div>
          <div>
            <h2>Phone</h2>
            <PrimitiveFormInput postulant={postulant} collectData={collectData} dataName="phone" />
          </div>
          <div>
            <h2>Created At</h2>
            <PrimitiveFormInput
              postulant={postulant}
              collectData={collectData}
              dataName="createdAt"
            />
          </div>
          <div>
            <h2>Udated At</h2>
            <PrimitiveFormInput
              postulant={postulant}
              collectData={collectData}
              dataName="updatedAt"
            />
          </div>
        </div>
        <div>
          <h2>Profiles</h2>
          <Profiles postulant={postulant} collectData={collectData} />
        </div>
        <div>
          <h2>Work Experience</h2>
          <ArrayFormInput
            postulant={postulant}
            collectData={collectData}
            dataName="workExperience"
            defaultValue={{
              company: '',
              startDate: '',
              endDate: '',
              description: ''
            }}
          />
        </div>
        <button onClick={(e) => submit(e)}>Save</button>
      </form>
      {modal.state && <Modal modal={modal} setModal={setModal} />}
    </section>
  );
}

export default Form;
