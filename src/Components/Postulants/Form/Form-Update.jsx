import style from '../postulants-Form.module.css';
import { useState, useEffect } from 'react';
import Modal from '../Modal';
import ContactRange from './ContactRange';
import Profiles from './Profiles';
import validatePostulant from './validations';
import ArrayInput from './ArrayInput';
import InitialStudies from './InitialStudies';
import PrimitiveFormInput from './PrimitiveFormInput';
function Form({ postulant, template }) {
  const [modal, setModal] = useState({ state: false });
  const [formPostulant, setPostulant] = useState([]);
  const params = new URLSearchParams(window.location.search);
  const postulantId = params.get('id');
  const url = `${process.env.REACT_APP_API}/postulants?id=${postulantId}`;
  console.log(url);
  const getPostulant = async () => {
    const postulantRaw = await fetch(url);
    const postulantJson = await postulantRaw.json();
    return postulantJson;
  };
  const usePostulant = async () => {
    const formPostulant = await getPostulant();
    console.log(formPostulant);
    setPostulant(formPostulant);
  };
  useEffect(() => {
    if (postulantId) usePostulant();
  }, []);

  const collectData = (data, property) => {
    template.id = postulantId;
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
    e.preventDefault();
    let serverError = false;
    let status;
    const message = validatePostulant(template);
    if (message) {
      setModal({
        title: 'Validaton Error',
        state: true,
        message: message,
        action: () => setModal({ state: modal.state })
      });
      return;
    }
    /* try {
      const responseRaw = await fetch(`${process.env.REACT_APP_API}/postulants/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(template)
      });
      status = responseRaw.status + ' ' + responseRaw.statusText;
      if (responseRaw.status !== 200 && responseRaw.status !== 201 && responseRaw.status !== 204) {
        serverError = true;
      }
      if (serverError) {
        setModal({
          title: 'A server error ocurred',
          state: true,
          message: status,
          action: () => setModal({ state: modal.state })
        });
        return;
      }
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
      setModal({
        title: 'Failed to fetch',
        state: true,
        message: 'An error ocurred locally',
        action: () => setModal({ state: modal.state })
      });
    } */
  };

  return (
    <section className={style.section}>
      <div className={style.formHeader}></div>
      <h1 className={style.textCenter}>{`Edit ${postulantId}`}</h1>
      <form>
        <div>
          <h2 className={style.textCenter}>Studies</h2>
          <div className={style.inputSection}>
            <div>
              <h3>Primary Studies</h3>
              <InitialStudies
                postulant={formPostulant.studies}
                collectData={collectData}
                dataName="primaryStudies"
                defaultValue={{ startDate: '', endDate: '', school: '' }}
              />
            </div>
            <div>
              <h3>Secondary Studies</h3>
              <InitialStudies
                postulant={formPostulant.studies}
                collectData={collectData}
                dataName="secondaryStudies"
                defaultValue={{ startDate: '', endDate: '', school: '' }}
              />
            </div>
            <div>
              <h3>Tertiary Studies</h3>
              <ArrayInput
                postulant={formPostulant.studies}
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
              <ArrayInput
                postulant={formPostulant.studies}
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
              <ArrayInput
                postulant={formPostulant.studies}
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
            <ContactRange
              postulant={formPostulant}
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
              postulant={formPostulant}
              collectData={collectData}
              dataName="firstName"
            />
          </div>
          <div>
            <h2>Last Name</h2>
            <PrimitiveFormInput
              postulant={formPostulant}
              collectData={collectData}
              dataName="lastName"
            />
          </div>
          <div>
            <h2>Email</h2>
            <PrimitiveFormInput
              postulant={formPostulant}
              collectData={collectData}
              dataName="email"
            />
          </div>
          <div>
            <h2>Password</h2>
            <PrimitiveFormInput
              postulant={formPostulant}
              collectData={collectData}
              dataName="password"
            />
          </div>
          <div>
            <h2>Address</h2>
            <PrimitiveFormInput
              postulant={formPostulant}
              collectData={collectData}
              dataName="address"
            />
          </div>
          <div>
            <h2>Birthday</h2>
            <PrimitiveFormInput
              postulant={formPostulant}
              collectData={collectData}
              dataName="birthday"
            />
          </div>
          <div>
            <h2>Available</h2>
            <PrimitiveFormInput
              postulant={formPostulant}
              collectData={collectData}
              dataName="available"
            />
          </div>
          <div>
            <h2>Phone</h2>
            <PrimitiveFormInput
              postulant={formPostulant}
              collectData={collectData}
              dataName="phone"
            />
          </div>
          <div>
            <h2>Created At</h2>
            <PrimitiveFormInput
              postulant={formPostulant}
              collectData={collectData}
              dataName="createdAt"
            />
          </div>
          <div>
            <h2>Udated At</h2>
            <PrimitiveFormInput
              postulant={formPostulant}
              collectData={collectData}
              dataName="updatedAt"
            />
          </div>
        </div>
        <div>
          <h2>Profiles</h2>
          <Profiles
            postulant={formPostulant}
            collectData={collectData}
            template={{
              profileId: { _id: '', name: '' },
              id: Math.floor(Math.random() * 10000)
            }}
          />
        </div>
        <div>
          <h2>Work Experience</h2>
          <ArrayInput
            postulant={formPostulant}
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
      {modal.state && <Modal modal={modal} />}
    </section>
  );
}

export default Form;
