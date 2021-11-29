import './postulants-Items.module.css';

import Item from './Item';

function Items({ postulants, onDelete, openForm, setModal }) {
  //toda la fila es el tr
  return (
    <>
      <table>
        <thead>
          <tr>
            {postulants[0]
              ? Object.keys(postulants[0]).map((postulantKey) => {
                  return <th>{postulantKey}</th>;
                })
              : ''}
          </tr>
        </thead>
        <tbody>
          {postulants.map((postulant) => {
            // postulant es un tr (fila)
            return (
              <Item
                postulant={postulant}
                key={postulant._id}
                onDelete={onDelete}
                setModal={setModal}
                openForm={openForm}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Items;
