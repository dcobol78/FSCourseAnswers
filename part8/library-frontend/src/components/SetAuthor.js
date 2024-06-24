import React, { useState } from 'react';
import Select from 'react-select';
import { CHANGE_YEAR, ALL_AUTHORS } from '../queries';
import { useMutation } from '@apollo/client';

const SetAuthor = ({ authors }) => {
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState(0);
  const [changeYear] = useMutation(CHANGE_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log('error.graphQLErrors[0].message', error);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('year', year);
    changeYear({ variables: { name: author, setBornTo: Number(year) } });
    setYear('');
  };

  const options = authors.map((a) => {
    return { value: a.name, label: a.name };
  });

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <Select
          options={options}
          onChange={(selected) => setAuthor(selected.value)}
        />
        born{' '}
        <input
          type="number"
          value={year}
          onChange={({ target }) => setYear(target.value)}
        />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetAuthor;
