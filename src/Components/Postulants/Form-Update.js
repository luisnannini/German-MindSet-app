import style from './postulants-Form.module.css';
import { useState } from 'react';
import Modal from './Modal';
import PrimaryStudies from './PrimaryStudies';
import SecondaryStudies from './SecondaryStudies';
import TertiaryStudies from './TertiaryStudies';
import UniversityStudies from './UniversityStudies';
import InformalStudies from './InformalStudies';
import FirstName from './FirstName';
import LastName from './LastName';
import Email from './Email';
import Password from './Password';
import Address from './Address';
import Birthday from './Birthday';
import Available from './Available';
import Phone from './Phone';
import CreatedAt from './CreatedAt';
import UpdatedAt from './UpdatedAt';
import Profiles from './Profiles';
import WorkExperience from './WorkExperience';
import ContactRange from './ContactRange';
import { v4 as uuidv4 } from 'uuid';

function Form({ postulant, template, id }) {
  const [modal, setModal] = useState({ state: false });
  const [loadForm, setLoadForm] = useState();

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
    /*     console.log(data, property);
     */ template.id = id;
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
    e.preventDefault();
    /*     console.log(template);
     */ try {
      const responseRaw = await fetch(`${process.env.REACT_APP_API}/postulants?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(template)
      });
      if (responseRaw.status !== 200 && responseRaw.status !== 201) {
        error = true;
        console.log('error');
      }
      const responseJson = await responseRaw.json();
      if (error) {
        setModal({
          title: 'Updated',
          state: true,
          message: responseJson.message,
          action: () => {
            setModal({ state: false });
          }
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
            <PrimaryStudies postulant={postulant} collectData={collectData} />
            <SecondaryStudies postulant={postulant} collectData={collectData} />
            <TertiaryStudies postulant={postulant} collectData={collectData} />
            <UniversityStudies postulant={postulant} collectData={collectData} />
            <InformalStudies postulant={postulant} collectData={collectData} />
          </div>
        </div>
        <ContactRange postulant={postulant} collectData={collectData} />
        <div className={style.container}>
          <FirstName postulant={postulant} collectData={collectData} />
          <LastName postulant={postulant} collectData={collectData} />
          <Email postulant={postulant} collectData={collectData} />
          <Password postulant={postulant} collectData={collectData} />
          <Address postulant={postulant} collectData={collectData} />
          <Birthday postulant={postulant} collectData={collectData} />
          <Available postulant={postulant} collectData={collectData} />
          <Phone postulant={postulant} collectData={collectData} />
          <CreatedAt postulant={postulant} collectData={collectData} />
          <UpdatedAt postulant={postulant} collectData={collectData} />
        </div>
        <Profiles postulant={postulant} collectData={collectData} />
        <WorkExperience postulant={postulant} collectData={collectData} />

        <button onClick={submit}>Save</button>
      </form>
      {modal.state && <Modal modal={modal} setModal={setModal} />}
    </section>
  );
}

export default Form;
