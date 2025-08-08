import React, { useRef, useState } from 'react';
import './add.css';

// Master list of categories - this never changes and is used for filtering
const CATEGORIES = [
  'Hair fall', 'Digestion', 'Obesity', 'Anxiety', 'Hypertension',
  'Allergies', 'Anemia', 'Sleep disorders', 'Influenza',
  'Acne', 'Sinusitis', 'Infertility', 'General'
];

const Add = ({ toggle, setToggle }) => {
  let question = useRef();
  let description = useRef();
  let attachment = useRef();
  let faq = useRef({});
  const [concern, setConcern] = useState(false);
  const [list, setList] = useState(CATEGORIES); // Initialize with the master list
  const [toggleDesc, setToggleDesc] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleadd = () => setConcern(true);
  
  // New function to handle filtering the list based on a value
  const handleFilter = (value) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      setList(CATEGORIES); // Reset to master list if search is empty
      return;
    }

    const lowerCaseValue = trimmedValue.toLowerCase();
    const updatedList = CATEGORIES.filter(item => item.toLowerCase().includes(lowerCaseValue));

    if (updatedList.length > 0) {
      updatedList.sort((a, b) => {
        const aStartsWith = a.toLowerCase().startsWith(lowerCaseValue);
        const bStartsWith = b.toLowerCase().startsWith(lowerCaseValue);
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return 0;
      });
      setList([...updatedList]);
    } else {
      setList([]);
    }
  };

  const handlecat = (cate) => {
    setSelectedCategory(cate);
    setSearchValue(cate);
    handleFilter(cate); 
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  const showSuccessToast = () => {
    setConcern(false);
    setShowToast(true);
    setTimeout(() => {
        setShowToast(false);
    }, 4000);
  };

  const handleAdd = () => {
    faq.current.question = question.current.value.trim();
    faq.current.description = description.current?.value.trim() || '';
    faq.current.attachment = attachment.current?.files[0] || null;
    faq.current.category = selectedCategory || 'General';

    const formdata = new FormData();
    formdata.append('question', faq.current.question);
    formdata.append('description', faq.current.description);
    if (faq.current.attachment) {
      formdata.append('attachment', faq.current.attachment);
    }
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
          showSuccessToast();
      })
      .catch(err => console.error(err));
  };

  const handleskip = () => {
    faq.current.question = question.current.value.trim();
    faq.current.description = description.current?.value.trim() || '';
    faq.current.attachment = attachment.current?.files[0] || null;

    const formdata = new FormData();
    formdata.append('question', faq.current.question);
    formdata.append('description', faq.current.description);
    if (faq.current.attachment) {
      formdata.append('attachment', faq.current.attachment);
    }
    formdata.append('category', 'General');

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
          showSuccessToast();
      })
      .catch(err => console.error(err));
  };
  
  const closeAll = () => {
    setToggle(false);
    setConcern(false);
    setToggleDesc(false);
  }

  // First Modal: Ask Question
  const AskQuestionModal = () => (
    <div className="ask-modal">
      <div className="modal-header">
        <h2>Ask Question</h2>
        <span className="close-btn" onClick={closeAll}><img src="images/Vector.png" alt="close"></img></span>
      </div>
      <div className="modal-content">
        <div className="user-row">
          <img src="/images/girl-logo.png" alt="User" />
          <div className="user-details">
            <span className="user-name">Priya Singh</span>
            <select className="privacy-select">
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>
          <button className="ask-btn" onClick={handleadd}>Ask</button>
        </div>

        <div className="input-group">
          <label>Add Question <span className="required">*</span></label>
          <div className="input-with-limit">
            <input
              ref={question}
              type="text"
              className="simple-input"
              placeholder="Ask your question here"
            />
            <span className="word-limit">.max 50 words</span>
          </div>
        </div>

        {toggleDesc && (
          <div className="input-group">
            <label>Add Description <span className="required">*</span></label>
            <div className="input-with-limit">
              <textarea
                ref={description}
                className="simple-input"
                placeholder="Add your description here"
                rows="4"
              />
              <span className="word-limit">.max 70 words</span>
            </div>
          </div>
        )}

        <div className="input-group">
          <label>Attachments</label>
          <div className="input-with-icons">
            <input
              ref={attachment}
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => {
                console.log(e.target.files[0].name);
              }}
            />
            <input
              type="text"
              disabled
              placeholder="Ask your question here"
              className="simple-input"
            />
            <div className="attachment-icons">
              <img src="/images/imgg.png" alt="Camera" onClick={() => attachment.current.click()} />
              <img src="/images/Frame.png" alt="Upload" onClick={() => attachment.current.click()} />
              <img src="/images/Doc.png" alt="File" onClick={() => attachment.current.click()} />
            </div>
          </div>
        </div>

        {!toggleDesc && (
          <div className="add-description-link" onClick={() => setToggleDesc(true)}>
            <img src="/images/formkit_add.png" alt="Add" />
            <span>Add Description</span>
          </div>
        )}
      </div>
    </div>
  );

  // Second Modal: Select Category
  const CategoryModal = () => (
    <div className="category-modal-overlay">
      <div className="category-modal">
        <div className="modal-header">
          <div className="header-text">
            <h2>Select a Category for Your Question</h2>
            <p>Helps doctors respond faster and accurately</p>
          </div>
          <span className="close-btn" onClick={() => setConcern(false)}><img src="images/Vector.png" alt="close"/></span>
        </div>

        <div className="search-bar">
          <img src="/images/search.png" alt="Search" />
          <input
            type="text"
            placeholder="Search for concern"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              handleFilter(e.target.value); 
            }}
          />
        </div>

        <div className="category-grid">
          {list.map((item, i) => (
            <div
              key={i}
              className={`category-button ${selectedCategory === item ? 'selected' : ''}`}
              onClick={() => handlecat(item)}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="skip-btn" onClick={handleskip}>Skip</button>
          <button className="add-concern-btn" onClick={handleAdd}>Add Concern</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showToast && (
        <div className="toast-notification">
          Your concern has been sent for review and will be added soon
        </div>
      )}
      {!concern && <AskQuestionModal />}
      {concern && <CategoryModal />}
    </>
  );
};

export default Add;