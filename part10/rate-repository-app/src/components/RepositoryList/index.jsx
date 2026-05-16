import { useState } from 'react';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import useDebounce from '../../hooks/useDebounce';
import { useNavigate } from 'react-router-native';

const ORDER_VARIABLES = {
  latest: {
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  highest: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  lowest: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');

  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  let navigate = useNavigate();

  const variables = {
    ...ORDER_VARIABLES[selectedOrder],
    searchKeyword: debouncedSearchKeyword,
    first: 10,
  };

  const { repositories, fetchMore } = useRepositories(variables);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onRepositoryPress={(id) => navigate(`/${id}`)}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;