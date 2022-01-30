import React from 'react'

const Input = ({
  value,
  onChange,
  inputClass,
  ...props
}) => {
  const classString = ['input']
  if (inputClass) inputClass.forEach(c => c.push(c))
  return (
    <input type='text' className={classString.join(' ')} value={value} onChange={onChange} {...props} />
  )
}

export default Input
