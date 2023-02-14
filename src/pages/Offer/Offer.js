import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import "./offer.css";
import { useNavigate } from "react-router-dom";

const Offer = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id; //j'aurais pu faire un destructuring

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]); //on met id ici car l'id de l'offre ne changera pas de valeur dans l'url (sur la même page)
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="offerContainer">
      <img src={data.product_image.secure_url} alt="product" />
      <p>{data.product_price + " €"}</p>
      {data.product_details.map((detail, index) => {
        const key = Object.keys(detail)[0];
        return (
          <div key={index}>
            <span>{key}:</span>
            <span style={{ color: "red" }}>{detail[key]}</span>
          </div>
        );
      })}
      <button onClick={() => navigate("/payment")}>Acheter</button>
    </div>
  );
};

export default Offer;
