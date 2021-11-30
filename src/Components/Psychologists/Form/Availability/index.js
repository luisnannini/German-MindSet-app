import styles from './availability.module.css';

const availability = (props) => {
  const days = {
    monday: {
      availability: false,
      from: '',
      to: ''
    },
    tuesday: {
      availability: false,
      from: '',
      to: ''
    },
    wednesday: {
      availability: false,
      from: '',
      to: ''
    },
    thursday: {
      availability: false,
      from: '',
      to: ''
    },
    friday: {
      availability: false,
      from: '',
      to: ''
    },
    saturday: {
      availability: false,
      from: '',
      to: ''
    },
    sunday: {
      availability: false,
      from: '',
      to: ''
    }
  };
  let avail = {};
  if (!props.data) {
    avail = days;
  } else {
    avail = props.data;
  }
  const monday = avail.monday;
  const tuesday = avail.tuesday;
  const wednesday = avail.wednesday;
  const thursday = avail.thursday;
  const friday = avail.friday;
  const saturday = avail.saturday;
  const sunday = avail.sunday;

  return (
    <section>
      <h2 className={styles.container}>Availability</h2>
      <div>
        <p>Monday</p>
        <input
          name="monday-availability"
          day="monday"
          type="checkbox"
          defaultChecked={monday.availability}
          onChange={props.action}
        />
        <input
          name="monday-from"
          placeholder="From"
          type="number"
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
          onChange={props.from}
        />
        <input
          name="monday-to"
          placeholder="To"
          type="number"
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
          onChange={props.to}
        />
      </div>
      <div>
        <p>Tuesday</p>
        <input
          name="tuesday-availability"
          type="checkbox"
          day="tuesday"
          defaultChecked={tuesday.availability}
          onChange={props.action}
        />
        <input
          name="tuesday-from"
          placeholder="From"
          type="number"
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
          onChange={props.from}
        />
        <input
          name="tuesday-to"
          placeholder="To"
          type="number"
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
          onChange={props.to}
        />
      </div>
      <div>
        <p>Wednesday</p>
        <input
          day="wednesday"
          name="wednesday-availability"
          type="checkbox"
          defaultChecked={wednesday.availability}
          onChange={props.action}
        />
        <input
          name="wednesday-from"
          placeholder="From"
          type="number"
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
          onChange={props.from}
        />
        <input
          name="wednesday-to"
          placeholder="To"
          type="number"
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
          onChange={props.to}
        />
      </div>
      <div>
        <p>Thursday</p>
        <input
          name="thursday-availability"
          day="thursday"
          type="checkbox"
          defaultChecked={thursday.availability}
          onChange={props.action}
        />
        <input
          name="thursday-from"
          placeholder="From"
          type="number"
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
          onChange={props.from}
        />
        <input
          name="thursday-to"
          placeholder="To"
          type="number"
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
          onChange={props.to}
        />
      </div>
      <div>
        <p>Friday</p>
        <input
          name="friday-availability"
          day="friday"
          type="checkbox"
          defaultChecked={friday.availability}
          onChange={props.action}
        />
        <input
          name="friday-from"
          placeholder="From"
          type="number"
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
          onChange={props.from}
        />
        <input
          name="friday-to"
          placeholder="To"
          type="number"
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
          onChange={props.to}
        />
      </div>
      <div>
        <p>Saturday</p>
        <input
          name="saturday-availability"
          day="saturday"
          type="checkbox"
          defaultChecked={saturday.availability}
          onChange={props.action}
        />
        <input
          name="saturday-from"
          placeholder="From"
          type="number"
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
          onChange={props.from}
        />
        <input
          name="saturday-to"
          placeholder="To"
          type="number"
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
          onChange={props.to}
        />
      </div>
      <div>
        <p>Sunday</p>
        <input
          name="sunday-availability"
          day="sunday"
          type="checkbox"
          defaultChecked={sunday.availability}
          onChange={props.action}
        />
        <input
          name="sunday-from"
          placeholder="From"
          type="number"
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
          onChange={props.from}
        />
        <input
          name="sunday-to"
          placeholder="To"
          type="number"
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
          onChange={props.to}
        />
      </div>
    </section>
  );
};

availability.propTypes = {};

export default availability;
