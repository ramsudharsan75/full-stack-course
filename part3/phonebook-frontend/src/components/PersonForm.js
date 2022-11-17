const PersonForm = ({ addNewPerson, newNameHandler, newName, newPhone, newPhoneHandler }) => (
    <form onSubmit={addNewPerson}>
        <div>name: <input value={newName} onChange={newNameHandler} /></div>
        <div>number: <input value={newPhone} onChange={newPhoneHandler} /></div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
);

export default PersonForm;