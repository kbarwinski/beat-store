import { useState, useEffect } from "react";

import { CrudListContainer } from "./crud-list.styles";

import CrudItem from "../crud-item/crud-item.component";

import { AudioItemRequest } from "../../requests/AudioItem/audio-item-requests";

import { useSelector } from "react-redux";

import EmptyNotice from "../empty-notice/empty-notice.component";

const CrudList = (props) => {
  const [filteredData, setFilteredData] = useState([]);

  const shouldRefresh = useSelector((state) => state.refresh.shouldRefresh);

  useEffect(() => {
    const fetchData = async (queryParams) => {
      let filteredData = await AudioItemRequest.getAll(queryParams);
      console.log(filteredData);
      setFilteredData(filteredData);
    };

    var paramsObject = {
      author: props.author,
    };

    fetchData(paramsObject);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRefresh]);

  return (
    <CrudListContainer>
      {filteredData.length !== 0 ? (
        filteredData.map((item) => {
          return <CrudItem key={item.id} crudItem={item} />;
        })
      ) : (
        <EmptyNotice message="No content found 😵" />
      )}
    </CrudListContainer>
  );
};

export default CrudList;
