import "./publish.css";
import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  console.log("le token", token);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("picture", picture);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err) {
      if (err.response.status === 500) {
        console.error("An error occured");
      } else {
        console.error(err.response.data.msg);
      }
    }
  };
  return (
    <div className="publishContainer">
      <form className="publishForm" onSubmit={handleSubmit}>
        <label>
          Photo
          <input
            name="picture"
            type="file"
            onChange={(event) => {
              const value = event.target.files[0];
              setPicture(value);
            }}
          />
        </label>

        <label>
          Titre
          <input
            name="title"
            type="text"
            onChange={(event) => {
              const value = event.target.value;
              setTitle(value);
            }}
            value={title}
          />
        </label>
        <label>
          Décris ton article
          <input
            name="description"
            type="textarea"
            onChange={(event) => {
              const value = event.target.value;
              setDescription(value);
            }}
            value={description}
          />
        </label>
        <label>
          Marque
          <input
            name="brand"
            type="text"
            onChange={(event) => {
              const value = event.target.value;
              setBrand(value);
            }}
            value={brand}
          />
        </label>
        <label>
          Taille
          <input
            name="size"
            type="text"
            onChange={(event) => {
              const value = event.target.value;
              setSize(value);
            }}
            value={size}
          />
        </label>
        <label>
          Couleur
          <input
            name="color"
            type="text"
            onChange={(event) => {
              const value = event.target.value;
              setColor(value);
            }}
            value={color}
          />
        </label>
        <label>
          Etat
          <input
            name="condition"
            type="text"
            onChange={(event) => {
              const value = event.target.value;
              setCondition(value);
            }}
            value={condition}
          />
        </label>
        <label>
          Lieu
          <input
            name="city"
            type="text"
            onChange={(event) => {
              const value = event.target.value;
              setCity(value);
            }}
            value={city}
          />
        </label>
        <label>
          Prix
          <input
            name="price"
            type="text"
            onChange={(event) => {
              const value = event.target.value;
              setPrice(value);
            }}
            value={price}
          />
        </label>
        <label>
          Jes suis intéressé(e) par les échanges
          <input name="agreeToexchange" type="checkbox" />
        </label>
        <input type="submit" value="Publier" />
      </form>
      salut je suis la page publish
    </div>
  );
};
export default Publish;