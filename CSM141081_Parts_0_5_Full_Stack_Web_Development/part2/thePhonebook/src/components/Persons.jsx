
import { UserEntry } from "./UserEntry";
import { DeleteBtn } from "./Button";

export const Persons = ({ persons, filter, deletePerson }) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => (
          <div key={person.id}>
            <UserEntry entry={person} />
            <DeleteBtn btnText="Delete" onClick={() => deletePerson(person)} />
          </div>
        ))}
    </div>
  );
}