import React from 'react'
import UserMsg from '../BasicComponents/\bUserMsg'
import ResultBasic from './ResultBasic'

function MessageList() {
  return (
    <div style={{ height: '100vh', overflowY: 'auto' }}>
        <div style={{ textAlign: 'right' }}>
            <UserMsg text='user message가 들어갑니다.' />
        </div>
        <div style={{ textAlign: 'left' }}>
            <ResultBasic title = "dkdk" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumt" />
        </div>
    </div>
  )
}

export default MessageList
