import { HeaderContainer } from './styles'
import { Timer, Scroll } from 'phosphor-react'

import logo from '../../assets/ignite-logo.svg'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <HeaderContainer>
      <img src={logo} alt="" width={40} height={40} />

      <nav>
        <NavLink to="/" title="Timer" end>
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
