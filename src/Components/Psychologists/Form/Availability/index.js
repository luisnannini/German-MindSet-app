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
          id="monday-availability"
          name="monday-availability"
          day="monday"
          type="checkbox"
          defaultChecked={monday.availability}
          required
        />
        <input
          id="monday-from"
          name="monday-from"
          placeholder="From"
          type="number"
          required
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
        />
        <input
          id="monday-to"
          name="monday-to"
          placeholder="To"
          type="number"
          required
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
        />
      </div>
      <div>
        <p>Tuesday</p>
        <input
          id="tuesday-availability"
          name="tuesday-availability"
          type="checkbox"
          day="tuesday"
          defaultChecked={tuesday.availability}
          required
        />
        <input
          id="tuesday-from"
          name="tuesday-from"
          placeholder="From"
          type="number"
          required
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
        />
        <input
          id="tuesday-to"
          name="tuesday-to"
          placeholder="To"
          type="number"
          required
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
        />
      </div>
      <div>
        <p>Wednesday</p>
        <input
          id="wednesday-availability"
          day="wednesday"
          name="wednesday-availability"
          type="checkbox"
          defaultChecked={wednesday.availability}
          required
        />
        <input
          id="wednesday-from"
          name="wednesday-from"
          placeholder="From"
          type="number"
          required
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
        />
        <input
          id="wednesday-to"
          name="wednesday-to"
          placeholder="To"
          type="number"
          required
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
        />
      </div>
      <div>
        <p>Thursday</p>
        <input
          id="thursday-availability"
          name="thursday-availability"
          day="thursday"
          type="checkbox"
          defaultChecked={thursday.availability}
          required
        />
        <input
          id="thursday-from"
          name="thursday-from"
          placeholder="From"
          type="number"
          required
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
        />
        <input
          id="thursday-to"
          name="thursday-to"
          placeholder="To"
          type="number"
          required
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
        />
      </div>
      <div>
        <p>Friday</p>
        <input
          id="friday-availability"
          name="friday-availability"
          day="friday"
          type="checkbox"
          defaultChecked={friday.availability}
          required
        />
        <input
          id="friday-from"
          name="friday-from"
          placeholder="From"
          type="number"
          required
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
        />
        <input
          id="friday-to"
          name="friday-to"
          placeholder="To"
          type="number"
          required
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
        />
      </div>
      <div>
        <p>Saturday</p>
        <input
          id="saturday-availability"
          name="saturday-availability"
          day="saturday"
          type="checkbox"
          defaultChecked={saturday.availability}
          required
        />
        <input
          id="saturday-from"
          name="saturday-from"
          placeholder="From"
          type="number"
          required
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
        />
        <input
          id="saturday-to"
          name="saturday-to"
          placeholder="To"
          type="number"
          required
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
        />
      </div>
      <div>
        <p>Sunday</p>
        <input
          id="sunday-availability"
          name="sunday-availability"
          day="sunday"
          type="checkbox"
          defaultChecked={sunday.availability}
          required
        />
        <input
          id="sunday-from"
          name="sunday-from"
          placeholder="From"
          type="number"
          required
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
        />
        <input
          id="sunday-to"
          name="sunday-to"
          placeholder="To"
          type="number"
          required
          pattern="^[0-9,$]"
          title="Enter a valid time range, EX: 1500"
        />
      </div>
    </section>
  );
};

availability.propTypes = {};

export default availability;
