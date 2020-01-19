import React, { useState, memo } from "react"
import { useHistory, NavLink } from "react-router-dom"

import styled from "styled-components"

import baseStyle from "../../lib/style/base"

import { Button } from "../../components/Element"


const menus = [
  {
    text: 'Home', url: '/'
  },
  { 
    text: 'Post', url: '/post' 
  },
  {
    text: 'About', url: '/about'
  },
  { 
    text: '메뉴1', 
    child: [ 
      { text: 'first', url: '/test1' }, 
      { text: 'second', url: '/test2' }
    ] 
  },
]



const MenuItem = ({ item }) => {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)


  const isActive = (match, location) => {
    if (!match) {
      const result = item.child.filter(one => one.url === location.pathname)
      if (result.length === 0) {
        setActive(false)
      }
      return false
    }
    setActive(true)
    return true
  }
  

  if (item.child) {
    return (
      <li 
        className={active ? "menu-active" : ""}
        onMouseOver={() => setVisible(true)} 
        onMouseLeave={() => setVisible(false)}
      >
        {item.text}
        <ul className="child-menu">
          {item.child.map((one, i) => (
            <li key={i} style={{display: visible ? 'block' : 'none'}}>
              <NavLink activeClassName="menu-active" isActive={isActive} exact to={one.url}>{one.text}</NavLink>
            </li>
          ))}
        </ul>
      </li>
    )
  } 
  
  return (
    <li><NavLink activeClassName="menu-active" exact to={item.url}>{item.text}</NavLink></li>
  )
}



const TopMenu = () => {
  const history = useHistory()

  const logout = () => {
    sessionStorage.removeItem("token")
    history.push("/login")
  }

  return (
    <Header>
      <div>
        <ul className="menu">
          {menus.map(item => <MenuItem key={item.text} item={item} />)}
        </ul>
      </div>
      <div>
        <div className="brand-name"><NavLink to="/">React Template</NavLink></div>
      </div>
      <div>
        <Button className="btn-default" onClick={logout}>Logout</Button>  
      </div>
    </Header>
  )
}


const Header = styled.header`
  position: fixed;
  min-width: ${baseStyle.bodyMinWidth}px;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 1px 2px #888888;
  height: ${baseStyle.topMenuHeight}px;
  display: flex;
  align-items: center;
  background-color: #fff;
  >div {
    padding: 0 0.8rem;
    &:first-child {
      flex: 1;
    }
    &:nth-child(2n) {
      flex: 0.6;
      text-align: center;
    }
    &:last-child {
      flex: 1;
      text-align: right;
    }
  }
  .brand-name {
    font-size: 1.5rem;
    font-weight: 550;
  }
  .menu {
    list-style: none;
    padding: 0;
    margin: 0;
    >li {
      display: inline-block;
      vertical-align: top;
      text-align: center;
      width: 6rem; 
      padding: 1.2rem 0;
    }
    >li>a {
      padding: 1.2rem;
      width: 100%;
    }
    >li:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }
  .child-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    top: ${baseStyle.topMenuHeight}px;
    >li {
      width: 8rem;
      text-align: left;
      background-color: #eee;
      padding: 0.8rem;
    }
    >li>a {
      padding: 0.8rem;
    }
    >li:hover {
      background-color: #ddd;
    }
  }
  .menu-active {
    color: #333;
    font-weight: 550;
    li {
      font-weight: normal;
    }
  }
`

export default memo(TopMenu)