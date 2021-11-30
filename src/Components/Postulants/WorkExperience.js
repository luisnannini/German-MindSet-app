import { useState, useEffect } from 'react';

const WorkExperience = ({ postulant, collectData, id }) => {
  const [workExperience, setWorkExperience] = useState(postulant.workExperience);
  const sendData = (data) => {
    collectData(data, 'workExperience');
    setWorkExperience(data);
  };
  useEffect(() => sendData(workExperience), []);
  console.log(postulant.workExperience, workExperience);

  return (
    <div>
      <h3>Work experience</h3>
      {postulant.workExperience.map((work, index) => {
        return (
          <div key={work.id}>
            <input
              defaultValue={work.company}
              placeholder="Company"
              onChange={({ target: { value } }) => {
                workExperience[index].company = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...workExperience]);
              }}
            />
            <input
              defaultValue={work.startDate}
              placeholder="Start date"
              onChange={({ target: { value } }) => {
                workExperience[index].startDate = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...workExperience]);
              }}
            />
            <input
              defaultValue={work.endDate}
              placeholder="End date"
              onChange={({ target: { value } }) => {
                workExperience[index].endDate = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...workExperience]);
              }}
            />
            <textarea
              defaultValue={work.description}
              placeholder="Description"
              onChange={({ target: { value } }) => {
                workExperience[index].description = value; //no se puede encontrar el indice de un array a través de un objeto
                sendData([...workExperience]);
              }}
            ></textarea>
          </div>
        );
      })}
    </div>
  );
};

export default WorkExperience;
