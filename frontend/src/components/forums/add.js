import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = ({ toggle, setToggle ,fetchFaq}) => {
  const question = useRef();
  const description = useRef();
  const attachment = useRef();
  const search = useRef();
  const faq = useRef({});
  const category = useRef('');
  const [togggle, setTogggle] = useState(false);
  const [concern, setConcern] = useState(false);
  let navigate = useNavigate();
  const [questionText, setQuestionText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [fileInput, setFileInput] = useState(null);

  const [list, setList] = useState([
    'Hair fall', 'Digestion', 'Obesity', 'Anxiety', 'Hypertension', 'Allergies',
    'Anemia', 'Sleep disorders', 'Influenza', 'Acne', 'Sinusitis', 'Infertility', 'General'
  ]);

  const handleadd = () => setConcern(true);
  const handledesc = () => setTogggle(true);

  const handlecat = (cat) => {
    category.current = cat;
    console.log('Selected category:', category.current);
  };

  const handlesearch = () => {
    const value = (search.current?.value || '').trim();
    if (!value) return;

    if (list.includes(value)) {
      const updatedList = list.filter(item => item !== value);
      updatedList.unshift(value);
      setList([...updatedList]);
    } else {
      const updatedList = list.filter(item => item !== 'General');
      updatedList.unshift('General');
      setList([...updatedList]);
    }
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  const clearInputs = () => {
    if (question.current) question.current.value = '';
    if (description.current) description.current.value = '';
    if (attachment.current) attachment.current.value = '';
    category.current = '';
    setQuestionText('');
    setDescriptionText('');
    setFileInput(null);
  };

  const handleAdd = async () => {
    const q = questionText.trim();
    const desc = descriptionText.trim();
    const file = fileInput;
    const cat = (category.current || 'General').trim();

    if (!q) return alert('Please enter a question before adding');

    faq.current = { question: q, description: desc, attachment: file, category: cat };
    console.log('Submitting faq:', faq.current);

    try {
      const formdata = new FormData();
      formdata.append('question', q);
      formdata.append('description', desc);
      if (file) formdata.append('attachment', file);
      formdata.append('category', cat);

      const res = await fetch('http://localhost:3001/add_question', {
        method: 'POST',
        credentials: 'include',
        headers: { 'X-CSRF-Token': getCookie('XSRF-TOKEN') },
        body: formdata
      });

      const data = await res.json();
      console.log('Response:', data);
      navigate('/forums');
      clearInputs();
      setConcern(false);
      setTogggle(false);
      fetchFaq();
      setToggle(!toggle);
    } catch (err) {
      console.error(err);
      alert('Failed to submit question — try again.');
    }
  };

  const handleskip = async () => {
    const q = questionText.trim();
    const desc = descriptionText.trim();
    const file = fileInput;

    if (!q) return alert('Please enter a question before skipping category.');

    faq.current = { question: q, description: desc, attachment: file };

    try {
      const formdata = new FormData();
      formdata.append('question', q);
      formdata.append('description', desc);
      if (file) formdata.append('attachment', file);

      const res = await fetch('http://localhost:3001/add_question', {
        method: 'POST',
        credentials: 'include',
        headers: { 'X-CSRF-Token': getCookie('XSRF-TOKEN') },
        body: formdata
      });

      const data = await res.json();
      console.log('Skip submit:', data);
      navigate('/forums');
      clearInputs();
      setConcern(false);
      fetchFaq();
      setToggle(!toggle);
      setTogggle(false);
    } catch (err) {
      console.error(err);
      alert('Failed to submit question — try again.');
    }
  };

  return (
    <>
      {!concern && (
        <>
          <div>
            <p style={{ color: "#3A643B" }}>Ask Questions</p>
          </div>
          <div style={{ display: 'flex', marginBottom: '10px', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <img src='' alt='' />
              <div>
                <h4 style={{ color: "#3A643B", margin: "0px", fontWeight: "normal" }}>name</h4>
                <p style={{ margin: "0px" }}>public/private</p>
              </div>
            </div>
            <button
              type="button"
              style={{ backgroundColor: " #3A643B", height: "40px", width: "20%", color: "white", borderRadius: '10px', border: "none" }}
              onClick={handleadd}
            >
              Ask
            </button>
          </div>

          <div>
            <input
              aria-label="question"
              style={{ height: "40px", paddingLeft: "10px", borderRadius: "10px", border: "1px solid black", width: '98%', marginBottom: '10px' }}
              ref={question}
              type="text"
              placeholder="question"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            {togggle && (
              <input
                aria-label="description"
                style={{ height: "40px", paddingLeft: "10px", borderRadius: "10px", border: "1px solid black", width: '98%', marginBottom: '10px' }}
                ref={description}
                type="text"
                placeholder="description"
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
              />
            )}
            <input
              style={{ width: "97%" }}
              ref={attachment}
              type="file"
              onChange={(e) => setFileInput(e.target.files?.[0] ?? null)}
            />
            <button type="button" style={{ color: "#3A643B" }} onClick={handledesc}>add desc</button>
          </div>
        </>
      )}

      <div>
        {concern && (
          <div>
            <div style={{ textAlign: "center" }}>
              <h3>Select a Category For Your Question</h3>
              <p>Helps doctors respond faster and accurately</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', height: '40px' }}>
              <input
                style={{ width: "75%", borderRadius: "5px", border: "1px solid black" }}
                type="text"
                ref={search}
                placeholder="Search for a concern"
              />
              <button style={{ width: "20%", borderRadius: "5px", border: "none" }} onClick={handlesearch}>search</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center", marginTop: 12 }}>
              {list.map((item, i) => (
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') handlecat(item); }}
                  style={{
                    backgroundColor: "#dcebdcff",
                    color: "#646665",
                    margin: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    outline: category.current === item ? '2px solid #3A643B' : 'none'
                  }}
                  key={i}
                  onClick={() => handlecat(item)}
                >
                  {item}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", height: "40px", marginTop: 12 }}>
              <button
                type="button"
                style={{ width: "50%", border: "none", background: "none", fontWeight: "bold", color: "#3A643B" }}
                onClick={handleskip}
              >
                skip
              </button>
              <button
                type="button"
                style={{ width: "50%", border: "none", backgroundColor: "#3A643B", fontWeight: "bold", color: "white", borderRadius: "5px" }}
                onClick={handleAdd}
              >
                add concern
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Add;
