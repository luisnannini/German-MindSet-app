import './postulants-Items.module.css';

import Item from './Item';

function Items({ postulants }) {
  const propertiesIterator = (element) => {
    for (let elementKey in element) {
      if (typeof elementKey === 'object') {
        return <Item type="object" postulantKey={element[elementKey]} rowType="body" />;
      }
      return (
        <Item
          postulantKey={element[elementKey]}
          key={elementKey}
          tableType="head"
          dataType="notObject"
        />
      );
    }
  };
  /* {
    elemento1: {
      subElemento1:123
      subElement2:234
    }
    elemento2: 123123
  } */
  return (
    <table>
      <thead>
        <tr>
          {postulants[0]
            ? Object.keys(postulants[0]).map((postulantKey) => {
                return <Item dataType="notObject" rowType="head" postulantKey={postulantKey} />;
              })
            : ''}
        </tr>
      </thead>
      <tbody>
        {postulants.map((postulant) => {
          return <tr>{propertiesIterator(postulant)}</tr>;
        })}
      </tbody>
    </table>
  );
}

export default Items;
