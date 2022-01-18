import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createApplication } from 'redux/Applications/thunks';
import { useDispatch } from 'react-redux';

const Position = () => {
  const selectedPosition = useSelector((store) => store.positions.selectedItem);
  const selectedPostulant = useSelector((store) => store.auth.data);
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div>
      <h2>{selectedPosition.jobDescription}</h2>
      <p>at</p>
      <p>{selectedPosition.client && selectedPosition.client.name}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem corporis, reiciendis
        beatae sit amet libero fugiat ut ullam voluptate totam optio, eveniet enim ipsam. Nam, vel
        eveniet? Repudiandae, illum in.
      </p>
      <button
        onClick={() =>
          dispatch(
            createApplication({
              positions: selectedPosition._id,
              postulants: selectedPostulant._id,
              interview: null,
              result: '1'
            })
          )
        }
      >
        Apply!
      </button>
      <button onClick={() => history.push('/postulant')}>Go back</button>
    </div>
  );
};

export default Position;
