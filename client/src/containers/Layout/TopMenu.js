import React, { useState, memo } from "react"
import { NavLink } from "react-router-dom"

import styled from "styled-components"

import baseStyle from "../../lib/style/base"

import { Button } from "../../components/Element"
import LoginContainer  from "../Login"

import menu from "../../menu"




const MenuItem = memo(({ item }) => {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)


  const isActiveWithChild = (match, location, data) => {
    if (!match) {
      if (location.pathname.indexOf(data.url) > -1) {
        setActive(true)
        return true
      }
      const result = item.child.filter(one => one.url === location.pathname)    
      const matchChild = item.child.filter(one => location.pathname.indexOf(one.url) > -1) 
      if (result.length === 0 && matchChild.length === 0) {
        setActive(false) 
      }
      return false
    }
    setActive(true)
    return true
  }

  const isActive = (match, location) => {
    if (match || location.pathname.indexOf(item.url) > -1) {
      setActive(true)
      return true
    }
    setActive(false)
    return false
  }
  

  if (item.child) {
    return (
      <li
        onMouseOver={() => setVisible(true)} 
        onMouseLeave={() => setVisible(false)}
      >
        <NavLink className={active ? "menu-active" : ""} to="#">{item.text}</NavLink>
        <ul className="child-menu">
          {item.child.map((one, i) => (
            <li key={i} style={{display: visible ? 'block' : 'none'}}>
              <NavLink activeClassName="menu-active" isActive={(match, location) => isActiveWithChild(match, location, one)} exact to={one.url}>{one.text}</NavLink>
            </li>
          ))}
        </ul>
      </li>
    )
  } 
  
  return (
    <li><NavLink activeClassName="menu-active" isActive={isActive} exact to={item.url}>{item.text}</NavLink></li>
  )
})



const TopMenu = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <Header>
        <div>
          <ul className="menu">
            {menu.map(item => <MenuItem key={item.text} item={item} />)}
          </ul>
        </div>
        <div>
          <div className="brand-name">
            <NavLink to="/">React Template</NavLink>
          </div>
        </div>
        <div>
          <Button className="btn-none" onClick={() => setOpen(true)}>LOGIN</Button>
        </div>
      </Header>
      {open && <LoginContainer handleClose={() => setOpen(false)} />}
    </>
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
  z-index: 10;
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
    a {
      opacity: 0.6;
    }
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
      cursor: pointer;
    }
    >li:hover {
      >a {
        opacity: 1 !important;
        font-weight: 550;
      }
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
      background-color: #fff;
      padding: 0.8rem;
      &:first-child {
        box-shadow: 0px 3px 2px -2px #888888 inset;
      }
      &:last-child {
        border-radius: 0px 0px 3px 3px;
      }
    }
    >li>a {
      padding: 0.8rem;
    }
    >li:hover {
      >a {
        opacity: 1 !important;
        font-weight: 550;
      }
    }
  }
  a.menu-active {
    opacity: 1 !important;
    font-weight: 550;
  }
`

export default memo(TopMenu)