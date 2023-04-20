import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react'
import { Button, Grid } from 'semantic-ui-react'
import Loadingcomponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import ActivityFilters from './ActivityFilters';
import ActivityList from './ActivityList';
import { PagingParams } from '../../../app/models/pagination';

export default observer(function ActivityDashboard(){

    const {activityStore} = useStore();
    const {loadActivities, activityRegistry, setPagingParams, pagination} = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities])

    if(activityStore.loadingInitial && !loadingNext) return <Loadingcomponent content='Loading activities...'/>

    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
                <Button
                    floated='right'
                    content='More...'
                    positive
                    onClick={handleGetNext}
                    loading={loadingNext}
                    disabled={pagination?.totalPages === pagination?.currentPage}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})