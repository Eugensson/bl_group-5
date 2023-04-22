import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    isShowButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      ImageService.getImages(this.state.query, this.state.page).then(response =>
        this.setState(prevState => ({
          photos: [...prevState.photos, ...response.data.photos],
          isShowButton:
            response.data.page <
            Math.ceil(response.data.total_results / response.data.per_page),
        }))
      );
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onHandleSubmit = query => {
    this.setState({ query, photos: [], isShowButton: false, page: 1 });
  };

  render() {
    const { photos, isShowButton } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />
        <Grid>
          {photos.length > 0 &&
            photos.map(({ id, avg_color, alt, src: { large } }) => (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={large} alt={alt} />
                </CardItem>
              </GridItem>
            ))}
        </Grid>
        {isShowButton && <Button onClick={this.loadMore} />}

        {photos.length === 0 && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
      </>
    );
  }
}
