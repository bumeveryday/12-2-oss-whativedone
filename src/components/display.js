function Display({data, deleteMusic, editMusic})  {

    return (
        <ul id="music-list">
            {data.map((item) => (
                <li key={item.id}>
                    {item.title} ({item.mood}) from {item.album}, by {item.artist} 
                    <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => deleteMusic(item.id)} // onclick 문자열 대신 함수 전달
                    >
                        삭제
                    </button>
                    <button 
                        className="btn btn-warning btn-sm" 
                        onClick={() => editMusic(item)}
                    >
                        수정
                    </button>
                </li>
            ))}
        </ul>
    );


}

export default Display;
