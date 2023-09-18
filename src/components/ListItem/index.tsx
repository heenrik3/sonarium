import { Link } from 'react-router-dom'

function ListItem(props: any) {
  const { to, img, title } = props.data

  return (
    <Link to={to}>
      <li className="list__item">
        <picture className="list__picture">
          <img className="list__img" src={img} />
        </picture>
        <div className="list__title">
          <p>{title}</p>
        </div>
      </li>
    </Link>
  )
}

export default ListItem
