import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.onSubmit}>
        <InputSearch
          onChange={e =>
            this.setState({ query: e.target.value.trim().toLowerCase() })
          }
        />
        <FormBtn>
          <FiSearch />
        </FormBtn>
      </SearchFormStyled>
    );
  }
}
