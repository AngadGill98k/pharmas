import React, { useEffect, useState } from 'react';
import Navbar from '../nav/Navbar';
import Add from './add';
import './forums.css';

const Forums = () => {
    // Dummy data for initial load with timestamps
    const initialFaq = [
        {
            name: 'Anonymous',
            time: '5 days ago',
            timestamp: new Date('2025-08-01T10:00:00Z'),
            question: 'Question: Can Ayurveda help with stress and mental health issues?',
            description: 'Explores the potential benefits of traditional Ayurvedic practices in managing stress and improving mental well-being, examining holistic approaches like herbal remedies, meditation, and lifestyle adjustments.',
            replies: [
                {
                    name: 'Dr. Mathew Adams',
                    time: '5 days ago',
                    answer: 'Ans. Ayurveda offers holistic approaches like herbal remedies, lifestyle adjustments, and relaxation techniques to alleviate stress and support mental well-being. It emphasizes personalized care and natural methods to promote balance and harmony in mind and body.',
                    likes: 23
                }
            ],
            likes: 23,
            saves: 3
        },
        {
            name: 'Anonymous',
            time: '4 days ago',
            timestamp: new Date('2025-08-02T10:00:00Z'),
            question: 'Question: What are the best Ayurvedic remedies for hair fall?',
            description: 'Looking for effective Ayurvedic treatments and home remedies to combat hair fall and promote hair growth.',
            replies: [
                {
                    name: 'Dr. Priya Sharma',
                    time: '4 days ago',
                    answer: 'Ans. Bhringraj and Amla are potent Ayurvedic herbs for hair fall. You can use oils infused with these herbs for scalp massage. A balanced diet and managing stress are also crucial for hair health.',
                    likes: 15
                }
            ],
            likes: 18,
            saves: 5
        },
        {
            name: 'Anonymous',
            time: '3 days ago',
            timestamp: new Date('2025-08-03T10:00:00Z'),
            question: 'Question: How to improve digestion with Ayurveda?',
            description: 'Seeking advice on Ayurvedic practices, diets, and remedies to improve digestive health and address issues like bloating and indigestion.',
            replies: [
                {
                    name: 'Dr. Arjun Gupta',
                    time: '3 days ago',
                    answer: 'Ans. Incorporating ginger, cumin, and coriander into your diet is highly beneficial. Drinking warm water and following a regular eating schedule can also significantly aid digestion according to Ayurvedic principles.',
                    likes: 30
                }
            ],
            likes: 32,
            saves: 8
        }
    ];

    const sortIcons = {
        'recent': '/images/newest.png',
        'most_liked': '/images/most-like.png',
        'most_commented': '/images/most-com.png',
        'oldest': '/images/oldest.png',
    };

    const [faq, setFaq] = useState(initialFaq);
    const [toggle, setToggle] = useState(false);
    const [sortOrder, setSortOrder] = useState('recent');
    const [currentSortIcon, setCurrentSortIcon] = useState(sortIcons['recent']);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [originalFaq, setOriginalFaq] = useState(initialFaq);

    const handleadd = () => {
        setToggle(!toggle);
    };

    const handleSortButtonClick = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    };

    const handleSortSelection = (order) => {
        setSortOrder(order);
        setCurrentSortIcon(sortIcons[order]);
        setIsSortDropdownOpen(false);
    };

    const sortFaq = (data, order) => {
        const sortedData = [...data];

        if (order === 'most_liked') {
            sortedData.sort((a, b) => b.likes - a.likes);
        } else if (order === 'most_commented') {
            sortedData.sort((a, b) => b.replies.length - a.replies.length);
        } else if (order === 'recent') {
            sortedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } else if (order === 'oldest') {
            sortedData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        }

        return sortedData;
    };

    useEffect(() => {
        fetch('http://localhost:3001/get_faq', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.post && data.post.length > 0) {
                    const combinedData = [...initialFaq, ...data.post];
                    setOriginalFaq(combinedData);
                    setFaq(sortFaq(combinedData, sortOrder));
                } else {
                    setOriginalFaq(initialFaq);
                    setFaq(sortFaq(initialFaq, sortOrder));
                }
            })
            .catch(err => {
                console.error("Failed to fetch data, showing dummy chats.", err);
                setOriginalFaq(initialFaq);
                setFaq(sortFaq(initialFaq, sortOrder));
            });
    }, []);

    useEffect(() => {
        const sortedData = sortFaq(originalFaq, sortOrder);
        setFaq(sortedData);
    }, [sortOrder, originalFaq]);

    return (
        <>
            <Navbar />
            <img className="forums-header-img" src='/images/faqs_b.png' alt="Forums Banner" />
            <div className='main-content'>
                <div className='forum-wrapper'>
                    <div className='forum-head-buttons'>
                        <button className='active'>Questions</button>
                        <button>Thoughts</button>
                    </div>

                    <div className="search-input-group">
                        <div className='search-bar-forum'>
                            <img src="/images/search.png" alt="Search" />
                            <input type='text' placeholder='Hair Fall' />
                        </div>
                        <div className="sort-container">
                            <button className='sort-btn' onClick={handleSortButtonClick}>
                                <img src={currentSortIcon} alt="Sort Icon" className='sort-btn-icon' />
                                <img src="/images/sort.png" alt="Sort Icon" className='sort-btn-icon' />
                            </button>
                            {isSortDropdownOpen && (
                                <div className="sort-dropdown">
                                    <div onClick={() => handleSortSelection('recent')} className={sortOrder === 'recent' ? 'active-sort-item' : ''}>
                                        <img src={sortIcons.recent} alt="Recent Icon" />
                                        Recent
                                    </div>
                                    <div onClick={() => handleSortSelection('most_liked')} className={sortOrder === 'most_liked' ? 'active-sort-item' : ''}>
                                        <img src={sortIcons.most_liked} alt="Most Liked Icon" />
                                        Most Liked
                                    </div>
                                    <div onClick={() => handleSortSelection('most_commented')} className={sortOrder === 'most_commented' ? 'active-sort-item' : ''}>
                                        <img src={sortIcons.most_commented} alt="Most Commented Icon" />
                                        Most commented
                                    </div>
                                    <div onClick={() => handleSortSelection('oldest')} className={sortOrder === 'oldest' ? 'active-sort-item' : ''}>
                                        <img src={sortIcons.oldest} alt="Oldest Icon" />
                                        Oldest
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='forum-profile-section'>
                        <div className='forum-profile'>
                            <img src="/images/girl-logo.png" alt="girl" />
                            <div className='name'>Priya Singh</div>
                        </div>
                        <button className='ask-question-btn' onClick={handleadd}>Ask Question</button>
                    </div>

                    <div className='questions-list'>
                        {faq.length > 0 ? (
                            faq.map((question, index) => (
                                <div className='question-card' key={index}>
                                    <div className='question-header'>
                                        <img src='/images/admin.png' alt='Profile' />
                                        <div className='user-info'>
                                            <div className='name'>{question.name}</div>
                                            <div className='time'>{question.time}</div>
                                        </div>
                                        <button className='question-options-btn'>⋮</button>
                                    </div>
                                    <div className='question-text'>
                                        <h3>{question.question}</h3>
                                        <p>{question.description}</p>
                                    </div>
                                    <div className='replies-section'>
                                        <p className='view-replies-link'>Replies • {question.replies.length} reply</p>
                                        {question.replies.map((reply, replyIndex) => (
                                            <div className='reply-card' key={replyIndex}>
                                                <div className='doctor-info'>
                                                    <img src='/images/doctor.png' alt='Doctor Profile' />
                                                    <div className='doctor-details'>
                                                        <div className='name'>{reply.name}</div>
                                                        <div className='title'>{reply.time}</div>
                                                    </div>
                                                </div>
                                                <p className='doctor-answer'>{reply.answer}</p>
                                                
                                                {/* NEW: ICONS ARE NOW PART OF THE REPLY CARD */}
                                                <div className='reply-footer-actions'>
                                                    <span><img src="/images/like.png" alt="Likes" />{reply.likes} Likes</span>
                                                    <span><img src="/images/comment.png" alt="Reply" />{question.replies.length} Reply</span>
                                                    <span><img src="/images/save.png" alt="Saves" />{question.saves} Saves</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-questions-found">
                                <p>No questions have been asked yet. Be the first to ask one!</p>
                            </div>
                        )}
                        <div className="load-more-btn">Load More ↓</div>
                    </div>
                </div>
            </div>

            {toggle && (
                <div className="modal_backdrop">
                    <Add toggle={toggle} setToggle={setToggle} />
                </div>
            )}
        </>
    );
};

export default Forums;