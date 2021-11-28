const availability = () => {
  return (
    <section>
      <div>
        <p>Monday</p>
        <input id="monday-availability" name="monday-availability" type="checkbox" required />
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
        <input id="tuesday-availability" name="tuesday-availability" type="checkbox" required />
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
        <input id="wednesday-availability" name="wednesday-availability" type="checkbox" required />
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
        <input id="thursday-availability" name="thursday-availability" type="checkbox" required />
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
        <input id="friday-availability" name="friday-availability" type="checkbox" required />
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
        <input id="saturday-availability" name="saturday-availability" type="checkbox" required />
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
        <input id="sunday-availability" name="sunday-availability" type="checkbox" required />
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
