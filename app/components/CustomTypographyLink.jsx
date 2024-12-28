import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/navigation'

const CustomTypographyLink = ({
  text,
  href,
  variant: Variant = 'span',
  color = 'inherit',
  underline = false,
  className = '',
  onClick,
}) => {
  const router = useRouter()

  const style = {
    color,
    textDecoration: underline ? 'underline' : 'none',
    cursor: 'pointer',
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (onClick) onClick(e)
    router.push(href)
  }

  return (
    <Variant
      className={`typography-link ${className}`}
      style={style}
      onClick={handleClick}
    >
      {text}
    </Variant>
  )
}

CustomTypographyLink.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  underline: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default CustomTypographyLink
