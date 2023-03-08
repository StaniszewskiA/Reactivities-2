import { observer } from 'mobx-react-lite';
import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import React, { Fragment } from 'react';
import ActivityListItem from './ActivityListItem';

export default observer(function ActivityList(){
    
    const {activityStore} = useStore();
    const {groupedActivities} = activityStore;

    return(
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color ='teal'>
                    <Segment>
                        <Item.Group divided>
                        {activities.map(activity => (
                            <ActivityListItem key={activity.id} activity={activity} />
                        ))}
                        </Item.Group>
                    </Segment>
                    </Header>
                </Fragment>
            ))}
        </>
    )
})
