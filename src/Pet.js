import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pet-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }
  return (
    <Link to={`/details/${id}`} className="bg-slate-100">
      <div id="pet-image-container" className="image-container">
        <input type="hidden" value={name} id={`hidden-${id}`} />
        <img id={`pet-image-` + id} src={hero} alt={name} />
      </div>
      <div id="pet-info-container" className="text-center">
        <h1 id={`pet-name` + id} className="font-bold"> {name}</h1>
        <h2 id={`pet-info` + id}>
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
