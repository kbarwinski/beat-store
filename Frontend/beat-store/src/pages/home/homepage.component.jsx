import { useEffect, useState } from "react";
import { HomePageContainer } from "./homepage.styles";
import AudioList from "../../components/audio-list/audio-list.component";
import { Spacer } from "../../components/spacer/spacer.styles";
import AppUserRequest from "../../requests/AppUser/app-user-requests";
import { AudioItemRequest } from "../../requests/AudioItem/audio-item-requests";
const HomePage = (props) => {
  const [authors, setAuthors] = useState([]);
  const [minMaxBpm, setMinMaxBpm] = useState({ min: 0, max: 1000 });
  const [minMaxPrice, setMinMaxPrice] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    const fetchData = async () => {
      const authors = await AppUserRequest.GetAppUsers();
      setAuthors(authors);

      const minMaxBpm = await AudioItemRequest.getMinMaxBpm();
      setMinMaxBpm(minMaxBpm);

      const minMaxPrice = await AudioItemRequest.getMinMaxPrice();
      setMinMaxPrice(minMaxPrice);
    };

    fetchData();
  }, []);

  return (
    <HomePageContainer>
      <Spacer height="6vmax" />
      <AudioList
        onlyBookmarked={props.onlyBookmarked}
        minMaxData={{ bpm: minMaxBpm, price: minMaxPrice }}
        authors={authors}
      />
      <Spacer height="6vmax" />
    </HomePageContainer>
  );
};

export default HomePage;
