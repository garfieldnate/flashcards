export default class DummyUserData {
    constructor() {
        // contains just the ID's
        this.studySources = [];
    }

    addNewStudySource = (sourceId) => {
        this.studySources.push(sourceId);
        // console.log(this.studySources);
    }

    getStudySources = () => {
        return this.studySources;
    }
}
