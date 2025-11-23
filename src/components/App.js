import MusicModal from "./modal";
import Display from "./display";
import { useEffect, useState } from 'react';


function App() {

    const [music, setMusic] = useState([]);
const [modalData, setModalData] = useState(null);


    useEffect(() =>{ 
        fetch("https://69108baf7686c0e9c20ae745.mockapi.io/musics")
        .then((Response) => Response.json())
        .then((data) => {setMusic(data)} )
        }, []
      );

    const deleteMusic = (id) => {
        fetch(`https://69108baf7686c0e9c20ae745.mockapi.io/musics/${id}`, {
      method: "DELETE"
        }).then(() => {
          setMusic(music.filter(music => music.id !== id));
    });
    }

const handleSave = (inputs) => {
        if (modalData.id) {
            // (1) 수정(Edit): modalData에 이미 ID가 있다면 수정 요청
            fetch(`https://69108baf7686c0e9c20ae745.mockapi.io/musics/${modalData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
            })
            .then(res => res.json())
            .then(updatedItem => {
                // 리스트에서 옛날 거 찾아서 새 걸로 교체 (map 사용)
                setMusic(music.map(item => item.id === updatedItem.id ? updatedItem : item));
                setModalData(null); // 모달 닫기
            });

        } else {
            // (2) 추가(Add): ID가 없다면 새 데이터 생성 요청
            fetch("https://69108baf7686c0e9c20ae745.mockapi.io/musics", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
            })
            .then(res => res.json())
            .then(newItem => {
                // 리스트 맨 뒤에 추가
                setMusic([...music, newItem]);
                setModalData(null); // 모달 닫기
            });
        }
    };

const openAddModal = () => setModalData({}); // 빈 객체 -> 추가 모드
const openEditModal = (item) => setModalData(item); // 데이터 있음 -> 수정 모드



  return (
    <div className="App">
      <h1 id="mainname">Music list</h1>

      <button className="btn btn-success mb-3" onClick={openAddModal}>
                음악 추가하기
      </button>

      <Display
        data={music}
        deleteMusic = {deleteMusic}
        editMusic={openEditModal}
      />

      {modalData && (
                <MusicModal 
                    target={modalData}
                    close={() => setModalData(null)} // 닫기 누르면 null로 만들어서 숨김
                    onSave={handleSave} // 저장 누르면 handleSave 실행
                />
      )}


    </div>
  );
}

export default App;
