import React, { useEffect } from "react"

import styled from "styled-components"
import baseStyle from "../../lib/style/base"


const Alarm = ({ title = 'title', desc = 'desc', level = 'warn', timeout = 5000 }) => {

  useEffect(() => {

  }, [])

  return (
    <AlarmContent>
      <div className={`alarm-container alarm-${level}`}>
        <div className="alarm-header">
          <span>{title}</span>
          <span className="alarm-close">×</span>
        </div>
        <div className="alarm-desc">{desc}</div>
      </div>
    </AlarmContent>
  )
}


const AlarmContent = styled.div`
  position: fixed;
  top: 60px;
  width: 100%;
  z-index: 11;
  .alarm-container {
    background-color: #ddd;
    width: 250px;
    margin: 0 auto;
    border-radius: 3px;
    .alarm-header {
      padding: 0.3rem 0.6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      font-size: 1.2rem;
      .alarm-close {
        font-size: 1.4rem;
        cursor: pointer;
        &:hover {
          color: #555;
        }
      }
    }
    .alarm-desc {
      padding: 0.3rem 0.6rem;
    }
    &.alarm-success {
      background-color: ${baseStyle.color.success.normal};
      color: ${baseStyle.color.success.font.normal};
    }
    &.alarm-warn {
      background-color: ${baseStyle.color.warn.normal};
      color: ${baseStyle.color.warn.font.normal};
    }
    &.alarm-danger {
      background-color: ${baseStyle.color.danger.normal};
      color: ${baseStyle.color.danger.font.normal};
    }
  }
`

export default Alarm