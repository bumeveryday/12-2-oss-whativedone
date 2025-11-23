import React, { useState, useEffect } from 'react';

function MusicModal({ target, close, onSave }) {

const [inputs, setInputs] = useState({
        title: '', mood: '', album: '', artist: ''
    });

useEffect(() => {
        if (target && target.id) {
            // target에 id가 있다? = 수정 모드 = 데이터 채워넣기
            setInputs({
                title: target.title,
                mood: target.mood,
                album: target.album,
                artist: target.artist
            });
        } else {
            // id가 없다? = 추가 모드 = 빈칸 만들기
            setInputs({ title: '', mood: '', album: '', artist: '' });
        }
    }, [target]);

const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs, 
            [name]: value 
        });
    };

const handleSubmit = () => {
        // App.js에서 받은 onSave 함수에 입력값들을 담아서 실행!
        onSave(inputs); 
    };


return (
        <div>
            {/* 제목도 상황에 따라 바뀜 */}
            <h2>{target?.id ? "음악 수정하기" : "새 음악 추가"}</h2>
            
            <div className="mb-2">
                <input name="title" placeholder="제목" value={inputs.title} onChange={onChange} />
            </div>
            <div className="mb-2">
                <input name="mood" placeholder="기분" value={inputs.mood} onChange={onChange} />
            </div>
            <div className="mb-2">
                <input name="album" placeholder="앨범" value={inputs.album} onChange={onChange} />
            </div>
            <div className="mb-2">
                <input name="artist" placeholder="가수" value={inputs.artist} onChange={onChange} />
            </div>

            <div className="mt-3">
                <button className="btn btn-primary me-2" onClick={handleSubmit}>저장</button>
                <button className="btn btn-secondary" onClick={close}>닫기</button>
            </div>
        </div>
    );

}

export default MusicModal;