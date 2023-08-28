function Card(props) {
  return (
    <div className="card mb-3">
      {props.header && <div className="card-header">{props.header}</div>}
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.body}
        {props.alert && (<div className='alert'>{props.alert}</div>)}
      </div>
    </div>
  );
}

export default Card;