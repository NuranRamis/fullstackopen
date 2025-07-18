import Person from "./Person";

const Persons = ({ personsToShow, handleDelete }) => {
    return (
        <ul>
      {personsToShow.map(person => 
      <Person 
      key={person.id} 
      person={person}
      handleDelete={handleDelete}
      />     
      )}
      
      </ul>
    )
}

export default Persons