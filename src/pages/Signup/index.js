import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./signup.css";
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  const handleEmailchange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handleNewsletter = () => {
    setNewsletter(!newsletter);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      console.log("response axios: ", response);
      const token = response.data.token;

      Cookies.set("token_signup", token, { expires: 60 });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signupModal">
      <h2>S'inscrire</h2>
      <form label="signUpForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailchange}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="checkingBoxContainer">
          <input
            type="checkbox"
            id="newLetter"
            value={newsletter}
            onChange={handleNewsletter}
          />
          <label htmlFor="newsLetter">S'inscrire à notre newsletter</label>
        </div>
        <p id="CGU">
          En vous inscrivant sur Vinted, vous attestez être majeur et
          reconnaissez avoir pris connaissance et acceptez les
          <span>conditions générales d'utilisation</span> ainsi que notre
          <span>politique de confidentialité des données</span> de notre
          plateforme. Ces conditions régissent l'utilisation de nos services et
          sont importantes pour garantir une expérience utilisateur sûre et
          agréable pour tous les membres de notre communauté. Nous vous
          encourageons à les lire attentivement afin de comprendre vos droits et
          responsabilités en tant qu'utilisateur de Vinted, ainsi que la manière
          dont nous protégeons vos données personnelles.
        </p>
        <input
          type="submit"
          value="S'inscrire"
          accessKey="
          "
        />
        <span onClick={() => navigate("/login")}>
          Tu as déjà un compte ? connecte-toi!
        </span>
      </form>
    </div>
  );
};
export default Signup;