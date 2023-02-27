import { useState, useEffect } from "react";
import EditDirection from "../../components/ProfileComponents/EditDirection/EditDirection";
import EditPassword from "../../components/ProfileComponents/EditPassword/EditPassword";
import EditProfile from "../../components/ProfileComponents/EditProfile/EditProfile";

export default function Profile() {
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [editDirection, setEditDirection] = useState<boolean>(false);

  const [country, setCountry] = useState<string>("Argentina");
  const [state, setState] = useState<string>("Buenos Aires");
  const [city, setcity] = useState<string>("Lomas de Zamora");
  const [street, setStreet] = useState<string>("Hipolito Yrigoyen");
  const [number, setNumber] = useState<number>(9201);
  const [zipCode, setZipCode] = useState<number>(1832);

  useEffect(() => {
    const profile: HTMLElement | null = document.getElementById("profile");
    if (profile) {
      if (!editProfile && !editDirection) {
        if (profile) {
          profile.className = "profile__closed";
        }
      } else {
        profile.className = "profile";
      }
    }
  }, [editProfile, editDirection]);

  return (
    <div id="profile">
      <div className="profile__buttons">
        <button
          onClick={(): void => {
            setEditProfile(!editProfile);
            setEditDirection(false);
          }}
          className="profile__buttons__button"
        >
          Editar perfil
        </button>
        <button className="profile__buttons__button">Mis compras</button>
        <button
          onClick={(): void => {
            setEditProfile(false);
            setEditDirection(!editDirection);
          }}
          className="profile__buttons__button"
        >
          Mi dirección
        </button>
        <button className="profile__buttons__button">Mi lista de deseados</button>
        <button className="profile__buttons__button">Mis valoraciones</button>
      </div>
      <div className="profile_info">
        {editProfile && (
          <>
            <EditProfile mode="profile" />
            <EditPassword />
          </>
        )}
        {editDirection && (
          <EditDirection
            country={country}
            state={state}
            city={city}
            street={street}
            number={number}
            zipCode={zipCode}
          />
        )}
      </div>
    </div>
  );
}
