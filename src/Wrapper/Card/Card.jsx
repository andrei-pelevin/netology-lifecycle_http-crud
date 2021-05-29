
const Card = ({value, id, onDel}) => {
    return (
        <div className="card col-3 m-3 position-relative" id={id} >
                <div className="card-body">
                <p className="card-text">{value}</p>
                <span type="button" style={{ left: '90%', top: '1%', borderRadius: '100%', color: 'red' }} 
                className='position-absolute material-icons' 
                onClick={onDel}>delete</span>



            </div>
        </div>
    )
}

export default Card;