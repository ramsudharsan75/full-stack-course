const Filter = ({ personFilter, personFilterHandler }) => (
    <div>
        filter shown with: <input value={personFilter} onChange={personFilterHandler} />
    </div>
);

export default Filter;