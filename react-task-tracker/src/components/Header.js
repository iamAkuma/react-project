import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({title, onAdd, show}) => {
  const location = useLocation()
  return (
    <header className='header'>
        <h1>{title}</h1>
        { location.pathname === '/' &&
          (<Button color={show? 'red' : 'green'} 
        text= {show ? 'Close' : 'Add'} onClick={onAdd}/>)}
         </header>
  )
}

Header.defaultProps ={
    title: 'Task Tracker',
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
}
// const headingStyle = {
//     color: 'red', backgroundColor: 'black'
// }
export default Header
