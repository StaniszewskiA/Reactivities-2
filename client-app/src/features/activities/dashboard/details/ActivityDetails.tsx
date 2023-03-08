import { Button, Card, Image } from 'semantic-ui-react';
import Loadingcomponent from '../../../../app/layout/LoadingComponents';
import { useStore } from '../../../../app/stores/store';

export default function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity} = activityStore;

    if(!activity) return <Loadingcomponent/>;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' content='Edit'/>
                    <Button basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}