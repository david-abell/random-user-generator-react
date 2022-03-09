import { useState, useEffect, useRef } from "react";
import "./App.css";
import DeepParseJsonToCard from "./DeepParseJsonToCard";

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  let [totalRequestedUsers, setTotalRequestedUsers] = useState(0);
  let [lastPage, setLastPage] = useState(users.length - 1);
  let userLength = useRef(users.length);

  useEffect(() => {
    let isStateChangeOk = true;
    async function fetchData() {
      if (!totalRequestedUsers > userLength.current) {
        return;
      }
      const request = await fetch("https://randomuser.me/api/");
      const result = await request.json();
      const newUser = result.results[0];

      if (!newUser) {
        return;
      }

      if (isStateChangeOk) {
        setUsers((oldUsers) => {
          return [...oldUsers, newUser];
        });
      }
    }
    fetchData().catch((er) => console.error(er));

    return () => (isStateChangeOk = false);
  }, [totalRequestedUsers]);

  useEffect(() => {
    setLastPage(users.length - 1);
  }, [users]);

  const handleNextPage = (e) => {
    if (currentPage >= lastPage) {
      setTotalRequestedUsers(totalRequestedUsers + 1);
    }
    if (currentPage >= lastPage + 1) {
      setCurrentPage(lastPage + 1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = (e) => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  console.log("currentPage", currentPage, "lastPage", lastPage);

  return (
    <div className="app">
      <h1 className="section">Browse users</h1>
      <div className="section">
        <button
          className="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Previous User
        </button>
        <button className="button" onClick={handleNextPage}>
          {lastPage === -1 || currentPage === lastPage
            ? "Get a random user"
            : "Next user"}
        </button>
      </div>
      <div className="section">
        <h2 className="section">Current user #{currentPage + 1}</h2>

        {users[currentPage] ? (
          DeepParseJsonToCard(users[currentPage])
        ) : (
          <p>No users have been fetched. Please get some users.</p>
        )}
      </div>
      <div className="section">
        <button
          className="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Previous User
        </button>
        <button className="button" onClick={handleNextPage}>
          {lastPage === -1 || currentPage === lastPage
            ? "Get a random user"
            : "Next user"}
        </button>
      </div>
    </div>
  );
}

export default App;
