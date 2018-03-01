import React from 'react'
// import styled from 'styled-components'
import { Box } from 'webapps-components'

const Wrapper = Box.extend`
    display: flex;`

const Tab = Box.extend.attrs({
    p: 2,
    mr: 1,
    bg: 'white',
}) `
    ${props => props.active && 'font-weight: 900;'};

    &:hover {
        cursor: pointer;
    }
`


const Tabs = ({ filters, activeFilter, handleChange }) => (
    <Wrapper>
        {filters.map((filter, i) =>
            <Tab key={i} active={filter === activeFilter} onClick={() => handleChange(filter)}>{filter}</Tab>
        )}
    </Wrapper>

)

export default Tabs