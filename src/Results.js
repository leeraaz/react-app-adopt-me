import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div>
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        
        <div className="h-56 grid grid-cols-4 gap-4 content-between bg-grey-200">
          {pets.map((pet) => (
              <Pet
                name={pet.name}
                animal={pet.animal}
                breed={pet.breed}
                key={pet.id}
                images={pet.images}
                location={`${pet.city}, ${pet.state}`}
                id={pet.id}
                className=""
              />
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
