import styles from "./CountryList.module.css";
import Spinner from "./Spinner.jsx";
import CountryItem from "./CountryItem.jsx";
import Message from "./Message.jsx";
import { useCities } from "../contexts/CitiesContexts.jsx";

function CountriesList() {
  const { isLoading, cities } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message={"Add your first city by clicking on the city map"} />
    );

  console.log(cities);

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map(function (country) {
        return <CountryItem country={country} key={country.country} />;
      })}
    </ul>
  );
}

export default CountriesList;
