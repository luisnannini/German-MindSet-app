import style from './postulants-Form.module.css';
import { useState } from 'react';
import Modal from './Modal';
import ObjectFormInput from './ObjectFormInput';
import SecondaryStudies from './SecondaryStudies';
import TertiaryStudies from './TertiaryStudies';
import UniversityStudies from './UniversityStudies';
import InformalStudies from './InformalStudies';
import FirstName from './FirstName';
import LastName from './LastName';
import Email from './Email';
import Password from './Password';
import Address from './Address';
import Available from './Available';
import Phone from './Phone';
import CreatedAt from './CreatedAt';
import UpdatedAt from './UpdatedAt';
import Profiles from './Profiles';
import WorkExperience from './WorkExperience';
import ContactRange from './ContactRange';

import { v4 as uuidv4 } from 'uuid';
function Form() {
  const [modal, setModal] = useState({ state: false });

  const template = {
    contactRange: {
      from: '',
      to: ''
    },
    studies: {
      primaryStudies: {
        startDate: '',
        endDate: '',
        school: ''
      },
      secondaryStudies: {
        startDate: '',
        endDate: '',
        school: ''
      },
      tertiaryStudies: [
        {
          startDate: '',
          endDate: '',
          description: '',
          institute: ''
        }
      ],
      universityStudies: [
        {
          startDate: '',
          description: '',
          institute: ''
        },
        {
          startDate: '',
          endDate: '',
          description: '',
          institute: ''
        }
      ],
      informalStudies: [
        {
          startDate: '',
          endDate: '',
          description: '',
          institute: ''
        }
      ]
    },
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    birthday: '',
    available: '',
    phone: '',
    profiles: [
      {
        profileId: '',
        name: ''
      }
    ],
    workExperience: [
      {
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      },
      {
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    createdAt: '',
    updatedAt: ''
  };

  const submit = async (e) => {
    let error = false;
    let status;
    e.preventDefault();
    console.log(template);
    try {
      const responseRaw = await fetch(`${process.env.REACT_APP_API}/postulants`, {
        method: 'POST',
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
          title: status,
          state: true,
          message: responseJson.message
        });
        return;
      }
      setModal({
        title: 'Postulant added',
        state: true,
        message: responseJson.message
      });
    } catch (error) {
      setModal({
        title: 'Failed to fetch',
        state: true,
        message: error.message
      });
      console.log(error);
    }
  };

  const collectData = (data, property) => {
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

  return (
    <section className={style.section}>
      <div className={style.formHeader}></div>
      <h1 className={style.textCenter}>Add postulant</h1>
      <button onClick={() => (window.location.href = `${window.location.origin}/postulants`)}>
        List
      </button>
      <form>
        <div>
          <h3>Studies</h3>
          <div className={style.inputSection}>
            <SecondaryStudies collectData={collectData} />
            <TertiaryStudies collectData={collectData} />
            <UniversityStudies collectData={collectData} />
            <InformalStudies collectData={collectData} />
          </div>
        </div>
        <ContactRange collectData={collectData} />
        <div className={style.container}>
          <FirstName collectData={collectData} />
          <LastName collectData={collectData} />
          <Email collectData={collectData} />
          <Password collectData={collectData} />
          <Address collectData={collectData} />
          <Available collectData={collectData} />
          <Phone collectData={collectData} />
          <CreatedAt collectData={collectData} />
          <UpdatedAt collectData={collectData} />
        </div>
        <Profiles collectData={collectData} />
        <WorkExperience collectData={collectData} />

        <button onClick={(e) => submit(e)}>Add</button>
      </form>
      {modal.state && <Modal modal={modal} setModal={setModal} />}
    </section>
  );
}

export default Form;
