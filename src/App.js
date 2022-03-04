import "./App.css";

function formatDate(date) {
  return date.toLocaleDateString();
}

function Portrait(props) {
  return (
    <img
      className="portrait"
      src={props.author.portraitUrl}
      alt={props.author.name}
    />
  );
}

function UserInfo(props) {
  return (
    <div className="userInfo">
      <Portrait author={props.author} />
      <p className="message">{props.message()}</p>
    </div>
  );
}

function Post(props) {
  return (
    <div className="post">
      <UserInfo {...post} />
      <div className="post-date">{formatDate(props.date)}</div>
    </div>
  );
}

async function getUser(url = "https://randomuser.me/api/") {
  try {
    const response = await fetch(url, {
      dataType: "json",
    });
    const body = await response.json();
    return await Object.assign({}, body.results[0]);
  } catch (err) {
    console.log(err);
  }
}

const newUser = getUser();
newUser.then((el) => console.log(el));

const post = {
  date: new Date(),
  author: {
    name: newUser.name,
    portraitUrl: "https://source.unsplash.com//random/250x400?portrait",
  },
  message: function () {
    return "Hello, my name is " + this.author.name;
  },
};

const element = <Post {...post} />;

function App() {
  return element;
}

export default App;
