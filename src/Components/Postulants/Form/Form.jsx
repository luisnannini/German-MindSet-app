import style from '../postulants-Form.module.css';
import { useState, useEffect } from 'react';
import ModalError from '../../Shared/Modal-Error/modal-error';
import validatePostulant from './validations';
import ArrayInput from './ArrayInput';
import InitialStudies from './InitialStudies';
import PrimitiveFormInput from './PrimitiveFormInput';
import ContactRange from './ContactRange';
import Profiles from './Profiles';

function Form() {
  const params = new URLSearchParams(window.location.search);
  const postulantId = params.get('id');
  const url = `${process.env.REACT_APP_API}/postulants`;
  const [error, setError] = useState({
    show: false,
    message: '',
    title: ''
  });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('2000-01-01T00:00:00.000Z');
  const [address, setAddress] = useState('');
  const [contactRange, setContactRange] = useState({ from: '', to: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [available, setAvailable] = useState(true);
  const [phone, setPhone] = useState('');
  const [createdAt, setCreatedAt] = useState('2000-01-01T00:00:00.000Z');
  const [updatedAt, setUpdatedAt] = useState('2000-01-01T00:00:00.000Z');
  const [profiles, setProfiles] = useState([{ profileId: { id: '', name: '' }, _id: '' }]);
  const [workExperience, setWorkExperience] = useState([
    {
      startDate: '2000-01-01T00:00:00.000Z',
      endDate: '2000-01-01T00:00:00.000Z',
      company: '',
      description: ''
    }
  ]);
  const [primaryStudies, setPrimaryStudies] = useState({
    startDate: '2000-01-01T00:00:00.000Z',
    endDate: '2000-01-01T00:00:00.000Z',
    school: ''
  });
  const [secondaryStudies, setSecondaryStudies] = useState({
    startDate: '2000-01-01T00:00:00.000Z',
    endDate: '2000-01-01T00:00:00.000Z',
    school: ''
  });
  const [tertiaryStudies, setTertiaryStudies] = useState([
    {
      startDate: '2000-01-01T00:00:00.000Z',
      endDate: '2000-01-01T00:00:00.000Z',
      institute: '',
      description: ''
    }
  ]);
  const [universityStudies, setUniversityStudies] = useState([
    {
      startDate: '2000-01-01T00:00:00.000Z',
      endDate: '2000-01-01T00:00:00.000Z',
      institute: '',
      description: ''
    }
  ]);
  const [informalStudies, setInformalStudies] = useState([
    {
      startDate: '2000-01-01T00:00:00.000Z',
      endDate: '2000-01-01T00:00:00.000Z',
      institute: '',
      description: ''
    }
  ]);

  const getPostulant = async () => {
    try {
      const responseRaw = await fetch(url);
      if (responseRaw.status !== 200 && responseRaw.status !== 201 && responseRaw.status !== 204) {
        const status = `${responseRaw.status} ${responseRaw.statusText}`;
        const { message } = await responseRaw.json();
        if (message.message) throw { message: message.message, status };
        throw { message, status };
      }
      const { data } = await responseRaw.json();
      return data;
    } catch (error) {
      setError({ show: true, message: error.message, title: error.status });
    }
  };
  const usePostulant = async () => {
    const formPostulants = await getPostulant();
    const formPostulant = formPostulants.find((postulant) => postulant._id === postulantId);
    setFirstName(formPostulant.lastName);
    setLastName(formPostulant.lastName);
    setBirthday(formPostulant.birthday);
    setAddress(formPostulant.address);
    setContactRange(formPostulant.contactRange);
    setEmail(formPostulant.email);
    setPassword(formPostulant.password);
    setAvailable(formPostulant.available);
    setPhone(formPostulant.phone);
    setProfiles(formPostulant.profiles);
    setWorkExperience(formPostulant.workExperience);
    setPrimaryStudies(formPostulant.studies.primaryStudies);
    setSecondaryStudies(formPostulant.studies.secondaryStudies);
    setTertiaryStudies(formPostulant.studies.tertiaryStudies);
    setUniversityStudies(formPostulant.studies.universityStudies);
    setInformalStudies(formPostulant.studies.informalStudies);
  };

  useEffect(() => {
    if (postulantId) usePostulant();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const body = {
      contactRange,
      studies: {
        primaryStudies,
        secondaryStudies,
        tertiaryStudies,
        universityStudies,
        informalStudies
      },
      firstName,
      lastName,
      email,
      password,
      address,
      birthday,
      available,
      phone,
      profiles,
      workExperience,
      createdAt,
      updatedAt
    };
    const message = validatePostulant(body);
    if (message) {
      setError({ show: true, message, title: 'Validation Error' });
      return;
    }
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    postulantId ? (options.method = 'PUT') : (options.method = 'POST');
    try {
      const responseRaw = await fetch(
        `${process.env.REACT_APP_API}/postulants/${postulantId ? postulantId : ''}`,
        options
      );
      if (responseRaw.status !== 200 && responseRaw.status !== 201 && responseRaw.status !== 204) {
        const status = `${responseRaw.status} ${responseRaw.statusText}`;
        const { message } = await responseRaw.json();
        if (message.message) throw { message: message.message, status };
        throw { message, status };
      }
      await responseRaw.json();
      //if (postulantId) window.location.href = '/postulants';
    } catch (error) {
      setError({ show: true, message: error.message, title: error.status });
    }
  };

  return (
    <section className={style.section}>
      <ModalError error={error} onConfirm={() => setError({ show: false })} />
      <div className={style.formHeader}></div>
      <h1 className={style.textCenter}>{postulantId ? `Edit ${postulantId}` : 'Add postulant'}</h1>
      <form>
        <div>
          <h2 className={style.textCenter}>Studies</h2>
          <div className={style.inputSection}>
            <div>
              <h3>Primary Studies</h3>
              <InitialStudies postulantData={primaryStudies} setStudies={setPrimaryStudies} />
            </div>
            <div>
              <h3>Secondary Studies</h3>
              <InitialStudies postulantData={secondaryStudies} setStudies={setSecondaryStudies} />
            </div>
            <div>
              <h3>Tertiary Studies</h3>
              <ArrayInput
                postulantData={tertiaryStudies}
                setData={setTertiaryStudies}
                dataName="studies"
                dataTemplate={{
                  startDate: '2000-01-01T00:00:00.000Z',
                  endDate: '2000-01-01T00:00:00.000Z',
                  Insistute: '',
                  description: ''
                }}
              />
            </div>
            <div>
              <h3>University Studies</h3>
              <ArrayInput
                postulantData={universityStudies}
                setData={setUniversityStudies}
                dataName="studies"
                dataTemplate={{
                  startDate: '2000-01-01T00:00:00.000Z',
                  endDate: '2000-01-01T00:00:00.000Z',
                  Insistute: '',
                  description: ''
                }}
              />
            </div>
            <div>
              <h3>Informal Studies</h3>
              <ArrayInput
                postulantData={informalStudies}
                setData={setInformalStudies}
                dataName="studies"
                dataTemplate={{
                  startDate: '2000-01-01T00:00:00.000Z',
                  endDate: '2000-01-01T00:00:00.000Z',
                  Insistute: '',
                  description: ''
                }}
              />
            </div>
          </div>
          <div>
            <h2>Contact Range</h2>
            <ContactRange postulantData={contactRange} setData={setContactRange} />
          </div>
        </div>
        <div className={style.container}>
          <div>
            <h2>First Name</h2>
            <PrimitiveFormInput
              postulantData={firstName}
              dataName="firstName"
              setData={setFirstName}
            />
          </div>
          <div>
            <h2>Last Name</h2>
            <PrimitiveFormInput
              postulantData={lastName}
              dataName="lastName"
              setData={setLastName}
            />
          </div>
          <div>
            <h2>Email</h2>
            <PrimitiveFormInput postulantData={email} dataName="email" setData={setEmail} />
          </div>
          <div>
            <h2>Password</h2>
            <PrimitiveFormInput
              postulantData={password}
              dataName="password"
              setData={setPassword}
            />
          </div>
          <div>
            <h2>Address</h2>
            <PrimitiveFormInput postulantData={address} dataName="address" setData={setAddress} />
          </div>
          <div>
            <h2>Birthday</h2>
            <PrimitiveFormInput
              postulantData={birthday}
              dataName="birthday"
              setData={setBirthday}
            />
          </div>
          <div>
            <h2>Available</h2>
            <PrimitiveFormInput
              postulantData={available}
              dataName="available"
              setData={setAvailable}
            />
          </div>
          <div>
            <h2>Phone</h2>
            <PrimitiveFormInput postulantData={phone} dataName="phone" setData={setPhone} />
          </div>
          <div>
            <h2>Created At</h2>
            <PrimitiveFormInput
              postulantData={createdAt}
              dataName="createdAt"
              setData={setCreatedAt}
            />
          </div>
          <div>
            <h2>Udated At</h2>
            <PrimitiveFormInput
              postulantData={updatedAt}
              dataName="updatedAt"
              setData={setUpdatedAt}
            />
          </div>
        </div>
        <div>
          <h2>Profiles</h2>
          <Profiles
            postulantData={profiles}
            setData={setProfiles}
            dataTemplate={{ profileId: { id: '', name: '' }, _id: '' }}
          />
        </div>
        <div>
          <h2>Work Experience</h2>
          <ArrayInput
            postulantData={workExperience}
            dataName="workExperience"
            setData={setWorkExperience}
            dataTemplate={{
              startDate: '2000-01-01T00:00:00.000Z',
              endDate: '2000-01-01T00:00:00.000Z',
              company: '',
              description: ''
            }}
          />
        </div>
        <button onClick={(e) => submit(e)}>{postulantId ? 'Save' : 'Add'}</button>
      </form>
    </section>
  );
}

export default Form;
