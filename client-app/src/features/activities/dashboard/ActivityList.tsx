import { group } from 'console';
import { observer } from 'mobx-react-lite';
import React, { Fragment, SyntheticEvent, useState } from 'react';
import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';


export default observer(function ActivityList(){

    const {activityStore} = useStore();
    const {groupedActivities} = activityStore;

    return(
        <>
            {groupedActivities.map(([group, activties]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    <Segment>
                        <Item.Group>
                            {activties.map(activity => (
                                <ActivityListItem key={activity.id} activity={activity} />
                            ))}
                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </>      
    )
})
