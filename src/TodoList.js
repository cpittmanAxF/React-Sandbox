import React from 'react'
import styled, { css } from 'styled-components'
import { Flex, Box, Input, OrangeButton, OutlineButton } from 'webapps-components'

const Wrapper = Box.extend.attrs({
    p: 1,
}) ``

const Header = Box.extend`
    display: flex;
`

const TodoBody = Box.extend`
    flex-grow: 1;
`

const TodoWrapper = Flex.extend`
    ${props =>
        props.completed &&
        css`
            opacity: 0.75;

            ${CompletedButton} {
                background-color: #ccc;
            }

            ${TodoBody} {
                text-decoration: line-through;
            }
        `};
`



const Todo = ({ id, completed, body, handleComplete, handleDelete }) => (
    <TodoWrapper completed={completed} my={1} align="center" justify="space-between">
        <CompletedButton onClick={() => handleComplete(id)} />
        <TodoBody ml={1}>{body}</TodoBody>
        <OutlineButton color="#ccc" onClick={() => handleDelete(id)}>Delete</OutlineButton>
    </TodoWrapper>
)

const Body = Box.extend``

const Footer = Box.extend``

const CompletedButton = styled.div`
border-radius: 50%;
border: 1px solid #333;
width: 20px;
height: 20px;

${props => props.completed && 'background-color: #333;'};

    &:hover {
        cursor:  pointer
    }
`


const TodoList = ({ todos, handleSubmit, handleComplete, handleDelete }) => (
    <Wrapper bg="white">

        <Header p={1} my={1}>
            <Input onKeyPress={e => {
                if (e.key === 'Enter') {
                    handleSubmit(this.input.value);
                    this.input.value = ''
                }
            }} id="todo-content" innerRef={input => this.input = input} />
            <OrangeButton ml={1} onClick={() => {
                handleSubmit(this.input.value); this.input.value = ''
            }}>Submit</OrangeButton>
        </Header>
        <Body p={1}>
            {
                todos.map((todo, i) =>
                    <Todo
                        key={todo.id}
                        {...todo}
                        handleComplete={handleComplete}
                        handleDelete={handleDelete} />)
            }
        </Body>
        <Footer p={1}>{todos.length} Todo(s)</Footer>
    </Wrapper >
)

export default TodoList;