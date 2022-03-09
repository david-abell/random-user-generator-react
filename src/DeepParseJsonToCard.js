function listEntries(props) {
  const userFields = Object.entries(props).map((el) => {
    const [key, value] = el;
    if (value === Object(value)) {
      return (
        <div className="flex column" key={key}>
          <h3>{key}</h3>
          {listEntries(value)}
        </div>
      );
    }

    return (
      <ul className="flex column" key={key}>
        <label className="flex">
          {key}:&nbsp;<p>{value}</p>
        </label>
      </ul>
    );
  });
  return userFields;
}

function DeepParseJsonToCard(props) {
  if (props === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-card flex column">
      <div className="flex column">{props && listEntries(props)}</div>
    </div>
  );
}

export default DeepParseJsonToCard;
