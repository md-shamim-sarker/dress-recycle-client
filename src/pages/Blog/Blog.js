import React, {useEffect, useState} from 'react';
import Loading from '../Loading/Loading';

const Blog = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('blog.json')
            .then(res => res.json())
            .then(data => {
                setQuestions(data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <h2 className='text-3xl font-bold text-center my-10'>Blog Page</h2>
            <div className='w-11/12 lg:w-4/5 mx-auto flex flex-col gap-y-3 mb-10'>
                {
                    loading && <Loading></Loading>
                }
                {
                    questions.map(question =>
                        <div key={question.id} tabindex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                            <div className="collapse-title text-xl font-medium">
                                Question-{question.id}: {question.question}
                            </div>
                            <div className="collapse-content">
                                <p>
                                    Answer-{question.id}: {question.answer}
                                </p>
                            </div>
                        </div>)
                }
            </div>
        </>
    );
};

export default Blog;