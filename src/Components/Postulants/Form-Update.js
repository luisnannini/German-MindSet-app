import style from './postulants-Form.module.css';
import { useState } from 'react';
import Modal from './Modal';
import TertiaryStudies from './TertiaryStudies';
import UniversityStudies from './UniversityStudies';
import InformalStudies from './InformalStudies';
import PrimitiveFormInput from './PrimitiveFormInput';
import ObjectFormInput from './ObjectFormInput';

import Profiles from './Profiles';
import WorkExperience from './WorkExperience';

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
    console.log(template);
  };
  const submit = async (e) => {
    let error = false;
    let status;
    console.log(template);
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
          <h3 className={style.textCenter}>Studies</h3>
          <div className={style.inputSection}>
            <ObjectFormInput
              postulant={postulant.studies}
              collectData={collectData}
              dataName="primaryStudies"
              defaultValue={{ startDate: '', endDate: '', school: '' }}
            />
            <ObjectFormInput
              postulant={postulant.studies}
              collectData={collectData}
              dataName="secondaryStudies"
              defaultValue={{ startDate: '', endDate: '', school: '' }}
            />
            <TertiaryStudies postulant={postulant} collectData={collectData} />
            <UniversityStudies postulant={postulant} collectData={collectData} />
            <InformalStudies postulant={postulant} collectData={collectData} />
          </div>
          <ObjectFormInput
            postulant={postulant}
            collectData={collectData}
            dataName="contactRange"
            defaultValue={{ from: '', to: '' }}
          />
        </div>
        <div className={style.container}>
          <PrimitiveFormInput
            postulant={postulant}
            collectData={collectData}
            dataName="firstName"
          />
          <PrimitiveFormInput postulant={postulant} collectData={collectData} dataName="lastName" />
          <PrimitiveFormInput postulant={postulant} collectData={collectData} dataName="email" />
          <PrimitiveFormInput postulant={postulant} collectData={collectData} dataName="password" />
          <PrimitiveFormInput postulant={postulant} collectData={collectData} dataName="address" />
          <PrimitiveFormInput postulant={postulant} collectData={collectData} dataName="birthday" />
          <PrimitiveFormInput
            postulant={postulant}
            collectData={collectData}
            dataName="available"
          />
          <PrimitiveFormInput postulant={postulant} collectData={collectData} dataName="phone" />
          <PrimitiveFormInput
            postulant={postulant}
            collectData={collectData}
            dataName="createdAt"
          />
          <PrimitiveFormInput
            postulant={postulant}
            collectData={collectData}
            dataName="updatedAt"
          />
        </div>
        <Profiles postulant={postulant} collectData={collectData} />
        <WorkExperience postulant={postulant} collectData={collectData} />
        <button onClick={(e) => submit(e)}>Save</button>
      </form>
      {modal.state && <Modal modal={modal} setModal={setModal} />}
    </section>
  );
}

export default Form;
