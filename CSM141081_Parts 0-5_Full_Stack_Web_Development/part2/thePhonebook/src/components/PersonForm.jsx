export const PersonForm = ({ newName, handleInputChange, newNumber, handleNumberChange, addPerson }) => {
    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInputChange} /><br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  }
  