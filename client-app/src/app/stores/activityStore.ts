import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { Activity } from "../models/activity";

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    loadActivities = () => {
        this.loadingInitial = true;
    }

}