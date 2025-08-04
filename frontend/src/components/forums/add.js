import React, { useRef, useState } from 'react';

const Add = ({ toggle, setToggle }) => {
  let question = useRef();
  let description = useRef();
  let attachment = useRef();
  let search = useRef();
  let faq = useRef({});
  let category=useRef()
  const [togggle, setTogggle] = useState(false);
  const [concern, setConcern] = useState(false);

  const [list, setList] = useState([
    'Hair fall',
    'Digestion',
    'Obesity',
    'Anxiety',
    'Hypertension',
    'Allergies',
    'Anemia',
    'Sleep disorders',
    'Influenza',
    'Acne',
    'Sinusitis',
    'Infertility',
    'General'
  ]);

  const handleadd = () => {
    setConcern(true);
  };

  const handledesc = () => {
    setTogggle(true);
  };

  const handlecat = (cat) => {
    // your logic here when category is clicked
    category.current=cat
    console.log(category.current);
  };

  const handlesearch = () => {
    const value = search.current.value.trim();

    if (list.includes(value)) {
      const updatedList = list.filter(item => item !== value);
      updatedList.unshift(value);
      setList([...updatedList]); // update state to re-render
    } else {
      const updatedList = list.filter(item => item !== 'General');
      updatedList.unshift('General');
      setList([...updatedList]); // fallback to General
    }
  };
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
  const handleAdd = () => {
    faq.current.question = question.current.value.trim();
    faq.current.description = description.current.value.trim();
    faq.current.attachment = attachment.current.files[0];
    faq.current.category = category.current.trim() || 'General';
    console.log(faq.current);
    let formdata = new FormData();
    formdata.append('question', faq.current.question);
    formdata.append('description', faq.current.description);
    formdata.append('attachment', faq.current.attachment);
    formdata.append('category', faq.current.category);


   fetch('http://localhost:3001/add_question', {
     method: 'POST',
     credentials: 'include',
     headers: {
       'X-CSRF-Token': getCookie('XSRF-TOKEN')
     },
     body: formdata
    })
   .then(res => res.json())
   .then(data => {
     console.log(data);
   })
   .catch(err => console.error(err)); 
  }
  const handleskip = () => {
   faq.current.question = question.current.value.trim();
    faq.current.description = description.current.value.trim();
    faq.current.attachment = attachment.current.files[0];
   
    console.log(faq.current);
    let formdata = new FormData();
    formdata.append('question', faq.current.question);
    formdata.append('description', faq.current.description);
    formdata.append('attachment', faq.current.attachment);
    


   fetch('http://localhost:3001/add_question', {
     method: 'POST',
     credentials: 'include',
     headers: {
       'X-CSRF-Token': getCookie('XSRF-TOKEN')
     },
     body: formdata
    })
   .then(res => res.json())
   .then(data => {
     console.log(data);
   })
   .catch(err => console.error(err)); 
  };

  return (
    <>
      <div>
        <p>Ask Questions</p>
        {/* <button onClick={() => setToggle(false)}>close</button> */}
      </div>

      <div>
        <img alt="User" />
        <p>name</p>
        <p>public/private</p>
        <button onClick={handleadd}>Ask</button>

        <div>
          <input ref={question} type="text" placeholder="question" />
          {togggle && (
            <input ref={description} type="text" placeholder="description" />
          )}
          <input ref={attachment} type="file" />
          <button onClick={handledesc}>add desc</button>
        </div>

   {concern && <div>
        <h3>Select a Category For Your Question</h3>
        <input
        type="text"
        ref={search}
        placeholder="Search for a concern"
        />
        <button onClick={handlesearch}>search</button>
        {  list.map((item, i) => (
        <div key={i} onClick={()=>{handlecat(item)}}>
            {item}
        </div>
        ))}
        <button onClick={handleskip}>skip</button>
        <button onClick={handleAdd}>add concern</button>
    </div>}
      </div>
    </>
  );
};

export default Add;
