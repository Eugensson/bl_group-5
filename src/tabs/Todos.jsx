import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  onHandleSubmit = qwery => {
    const todo = {
      id: nanoid(),
      text: qwery,
    };

    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
  };

  handleDeleteTodo = id => {
    this.setState({ todos: this.state.todos.filter(item => item.id !== id) });
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />
        <Grid>
          {todos.length > 0 &&
            todos.map(({ id, text }, index) => (
              <GridItem key={id}>
                <Todo
                  id={id}
                  text={text}
                  counter={index + 1}
                  onClick={this.handleDeleteTodo}
                />
              </GridItem>
            ))}
        </Grid>
      </>
    );
  }
}
