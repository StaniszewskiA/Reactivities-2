import React from 'react';
import { Calendar } from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function ActivityFilters(){
    return (
        <>
            <Menu vertical size='large' style={{width: '100%'}}>
                <Header icon='filter' attached colr='teal' content='Filters'/>
                <Menu.Item content='All Activities' />
                <Menu.Item content="I'm going" />
                <Menu.Item content="I'm hsting" />
            </Menu>
            <Header />
            <Calendar />
            
        </>
    )
}