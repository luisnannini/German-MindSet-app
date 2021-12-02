import './postulants-Items.module.css';
import Item from './Item';

function Items({ postulants = [], fetch, setForm }) {
  //aca se va a rerenderizar para obtener nuevamente los postualntes
  //toda la fila es el tr
  return (
    <div>
      <table>
        <thead>
          <tr>
            {postulants[0] ? (
              Object.keys(postulants[0]).map((postulantKey) => {
                return <th key={postulantKey}>{postulantKey}</th>;
              })
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {postulants ? (
            postulants.map((postulant) => {
              return (
                <Item fetch={fetch} postulant={postulant} key={postulant._id} setForm={setForm} />
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Items;
