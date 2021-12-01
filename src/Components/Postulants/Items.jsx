import './postulants-Items.module.css';
import { useEffect, useState } from 'react';
import Item from './Item';
import { v4 as uuidv4 } from 'uuid';

function Items({ postulants = [], fetch, setForm }) {
  const key = uuidv4();
  //aca se va a rerenderizar para obtener nuevamente los postualntes
  //toda la fila es el tr
  return (
    <div>
      <table>
        <thead>
          <tr key={key}>
            {postulants[0]
              ? Object.keys(postulants[0]).map((postulantKey) => {
                  return <th>{postulantKey}</th>;
                })
              : ''}
          </tr>
        </thead>
        <tbody>
          {postulants
            ? postulants.map((postulant) => {
                return (
                  <Item fetch={fetch} postulant={postulant} key={postulant._id} setForm={setForm} />
                );
              })
            : ''}
        </tbody>
      </table>
    </div>
  );
}

export default Items;
