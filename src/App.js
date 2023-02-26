import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
export default function App() {
  const [data, setData] = useState([]);
  const [cmnt, setCmnt] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setData(res.data);
    };
    fetchApi();
  }, []);
  const handleClick = async (id) => {
    console.log(id);
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    setCmnt(res.data);
  };

  return (
    <div className="App">
      {data?.map((e, key) => {
        return (
          <div onClick={() => handleClick(e.id)} key={e.id}>
            <ul style={{ border: "2px solid black" }}>
              <h3>{e.title}</h3>
              <p>{e.body}</p>
              <span>
                {cmnt.map((e2) => {
                  if (e.id === e2.postId) return e2.email;
                })}
              </span>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
