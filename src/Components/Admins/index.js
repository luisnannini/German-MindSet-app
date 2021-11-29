import React, { useEffect, useState } from 'react';
import styles from './admins.module.css';

function Admins() {
  const [admins, saveAdmins] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => response.json())
      .then((response) => {
        saveAdmins(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <div>
        {admins.map((admin) => {
          console.log(admin);
          return (
            <React.Fragment key={admin._id}>
              <table>
                <tr>
                  <td>{admin.name} |</td>
                  <td>{admin.username}</td>
                </tr>
              </table>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

export default Admins;
