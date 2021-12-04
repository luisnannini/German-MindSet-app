import style from '../postulants-Form.module.css';
import { useState } from 'react';
import Modal from '../Modal';
import validatePostulant from './validations';
import { v4 as uuidv4 } from 'uuid';
import ArrayInput from './ArrayInput';
import InitialStudies from './InitialStudies';
import PrimitiveFormInput from './PrimitiveFormInput';
import ContactRange from './ContactRange';
import Profiles from './Profiles';

function Form() {
  const [modal, setModal] = useState({ state: false, action: '', message: '' });
  const [template, setTemplate] = useState();

  if (!template) {
    var body = {
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
      available: true,
      phone: '',
      profiles: [
        {
          profileId: { _id: ', name:' },
          id: ''
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
  } else {
    body = template;
  }

  const submit = async (e) => {
    e.preventDefault();
    setTemplate(body);
    let error = false;
    let status;
    const message = validatePostulant(body);
    if (message) {
      setModal({
        title: 'An error ocurred',
        state: true,
        message: message,
        action: () => setModal({ state: modal.state })
      });
      return;
    }
    try {
      const responseRaw = await fetch(`${process.env.REACT_APP_API}/postulants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      status = responseRaw.status + ' ' + responseRaw.statusText;
      if (responseRaw.status !== 200 && responseRaw.status !== 201) {
        error = true;
      }
      const responseJson = await responseRaw.json();
      if (error) {
        setModal({
          title: status,
          state: true,
          message: responseJson.status,
          action: () => setModal({ state: modal.state })
        });
        return;
      }
      setModal({
        title: 'Postulant added',
        state: true,
        message: responseJson.message,
        action: () => setModal({ state: modal.state })
      });
    } catch (error) {
      setModal({
        title: 'Failed to fetch',
        state: true,
        message: error.message,
        action: () => setModal({ state: modal.state })
      });
    }
  };

  const collectData = (data, property) => {
    if (property === 'contactRange') body.contactRange = data;
    if (property === 'primaryStudies') body.studies.primaryStudies = data;
    if (property === 'secondaryStudies') body.studies.secondaryStudies = data;
    if (property === 'tertiaryStudies') body.studies.tertiaryStudies = data;
    if (property === 'universityStudies') body.studies.universityStudies = data;
    if (property === 'informalStudies') body.studies.informalStudies = data;
    if (property === 'firstName') body.firstName = data;
    if (property === 'lastName') body.lastName = data;
    if (property === 'email') body.email = data;
    if (property === 'password') body.password = data;
    if (property === 'address') body.address = data;
    if (property === 'birthday') body.birthday = data;
    if (property === 'available') body.available = data;
    if (property === 'phone') body.phone = data;
    if (property === 'createdAt') body.createdAt = data;
    if (property === 'updatedAt') body.updatedAt = data;
    if (property === 'profiles') body.profiles = data;
    if (property === 'workExperience') body.workExperience = data;
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
          <h2>Studies</h2>
          <div className={style.inputSection}>
            <div>
              <h3>Primary Studies</h3>
              <InitialStudies
                collectData={collectData}
                dataName="primaryStudies"
                defaultValue={{ startDate: '', endDate: '', school: '' }}
              />
            </div>
            <div>
              <h3>Secondary Studies</h3>
              <InitialStudies
                collectData={collectData}
                dataName="secondaryStudies"
                defaultValue={{ startDate: '', endDate: '', school: '' }}
              />
            </div>
            <div>
              <h3>Tertiary Studies</h3>
              <ArrayInput
                collectData={collectData}
                id={uuidv4()}
                dataName="tertiaryStudies"
                defaultValue={{
                  startDate: '',
                  endDate: '',
                  description: '',
                  institute: '',
                  id: uuidv4()
                }}
              />
            </div>
            <div>
              <h3>University Studies</h3>
              <ArrayInput
                collectData={collectData}
                dataName="universityStudies"
                defaultValue={{
                  startDate: '',
                  endDate: '',
                  description: '',
                  institute: '',
                  id: uuidv4()
                }}
              />
            </div>
            <div>
              <h3>Informal Studies</h3>
              <ArrayInput
                collectData={collectData}
                dataName="informalStudies"
                id={uuidv4()}
                defaultValue={{
                  startDate: '',
                  endDate: '',
                  description: '',
                  institute: '',
                  id: uuidv4()
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <h2>Contact Range</h2>
          <ContactRange
            collectData={collectData}
            dataName="contactRange"
            defaultValue={{ from: '', to: '' }}
          />
        </div>
        <div className={style.container}>
          <div>
            <h2>First Name</h2>
            <PrimitiveFormInput collectData={collectData} dataName="firstName" />
          </div>
          <div>
            <h2>Last Name</h2>
            <PrimitiveFormInput collectData={collectData} dataName="lastName" />
          </div>
          <div>
            <h2>Email</h2>
            <PrimitiveFormInput collectData={collectData} dataName="email" />
          </div>
          <div>
            <h2>Password</h2>
            <PrimitiveFormInput collectData={collectData} dataName="password" />
          </div>
          <div>
            <h2>Address</h2>
            <PrimitiveFormInput collectData={collectData} dataName="address" />
          </div>
          <div>
            <h2>Birthday</h2>
            <PrimitiveFormInput collectData={collectData} dataName="birthday" />
          </div>
          <div>
            <h2>Available</h2>
            <PrimitiveFormInput collectData={collectData} dataName="available" postulant={body} />
          </div>
          <div>
            <h2>Phone</h2>
            <PrimitiveFormInput collectData={collectData} dataName="phone" />
          </div>
          <div>
            <h2>Created At</h2>
            <PrimitiveFormInput collectData={collectData} dataName="createdAt" />
          </div>
          <div>
            <h2>Updated At</h2>
            <PrimitiveFormInput collectData={collectData} dataName="updatedAt" />
          </div>
        </div>
        <div>
          <h2>Profiles</h2>
          <Profiles
            collectData={collectData}
            template={{
              profileId: { _id: '', name: '' },
              id: uuidv4()
            }}
          />
        </div>
        <div>
          <h2>Work Experience</h2>
          <ArrayInput
            collectData={collectData}
            dataName="workExperience"
            id={uuidv4()}
            defaultValue={{
              company: '',
              startDate: '',
              endDate: '',
              description: '',
              id: uuidv4()
            }}
          />
        </div>
        <button onClick={(e) => submit(e)}>Add</button>
      </form>
      {modal.state && <Modal modal={modal} />}
    </section>
  );
}

export default Form;
