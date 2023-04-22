import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      ImageService.getImages(this.state.query, this.state.page).then(response =>
        this.setState(prevState => ({
          photos: [...prevState.photos, ...response.data.photos],
        }))
      );
    }
  }

  onHandleSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
