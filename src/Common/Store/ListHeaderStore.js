class ListHeaderStore{
    constructor(setFilter){
        this.setFilter = setFilter;
    }
    setSortFilter(value){
        this.setFilter(value);
    }
}
export default ListHeaderStore;