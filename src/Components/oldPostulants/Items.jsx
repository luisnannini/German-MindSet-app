import './postulants-Items.module.css';
import Item from './Item';

function Items({ postulants = [], fetchData, url }) {
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
          {postulants.map((postulant) => {
            return (
              <Item fetchData={fetchData} postulant={postulant} key={postulant._id} url={url} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Items;
