import styles from './profile.module.css';

function Profile() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.title}>Postulant Profile</h2>
        <div className={styles.headerDiv}>
          <img src="" alt="Postulant Image"></img>
          <div className={styles.headerDiv2}>
            <h2>John Doe</h2>
            <span>johndoe@gmail.com</span>
            <span>30 years old</span>
            <span>Rosario, Santa Fe</span>
            <span>341 1111111</span>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.internalBox}>
            <h2>Primary Studies</h2>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>1995-2005</p>
          </div>
          <div className={styles.internalBox}>
            <h2>Secondary Studies</h2>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>1995-2005</p>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.internalBox}>
            <h2>Tertiary Studies</h2>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>1995-2005</p>
          </div>
          <div className={styles.internalBox}>
            <h2>University Studies</h2>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>1995-2005</p>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.internalBox}>
            <h2>Informal Studies</h2>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>1995-2005</p>
          </div>
        </div>
        <div className={styles.box}>
          <div className={styles.internalBox}>
            <h2>Work Experience</h2>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>1995-2005</p>
          </div>
        </div>
        <div className={styles.available}>
          <h2>Shifts available for an interview with MindSet Psychologist</h2>
          <table>
            <td>21 Wednesday - 16:15</td>
            <td>21 Wednesday - 16:15</td>
            <td>21 Wednesday - 16:15</td>
            <td>21 Wednesday - 16:15</td>
            <td>21 Wednesday - 16:15</td>
          </table>
        </div>
        <button>Edit information</button>
      </section>
    </div>
  );
}

export default Profile;
