import React from 'react'
import ImagePlaceholder from '../assets/placeholder.png'

const Card = ({
  item,
  ...props
}) => {
  const noImg = !item.set_img_url && !item.rgb && !item.part_img_url
  return (
    <div
      className='card'
      {...(props.handleGetPart && { onClick: () => props.handleGetPart(item.id, item.name) })}
    >
      {item.set_img_url && <div className='card__display card__display--top' alt={item.name} style={{ backgroundImage: `url(${item.set_img_url})` }} />}
      {item.rgb && <div className='card__display card__display--top' alt={item.name} style={{ backgroundColor: `#${item.rgb}` }} />}
      {item.part_img_url && <div className='card__display card__display--top' alt={item.name} style={{ backgroundImage: `url(${item.part_img_url})` }} />}
      {noImg &&
        <img className='card__display card__display--top' alt={item.name} src={ImagePlaceholder} />}
      <div className='card__footer'>
        <p className='card__title'>{item.name}</p>
        {item.year && <p className='card__text'>Released: {item.year}</p>}
        {item.num_parts && <p className='card__text'>Number of parts: {item.num_parts}</p>}
      </div>
    </div>
  )
}

export default Card
