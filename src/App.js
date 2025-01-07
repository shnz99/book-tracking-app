import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import ReadingGoals from './components/ReadingGoals';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={BookList} />
          <Route path="/book/:id" component={BookDetails} />
          <Route path="/add-book" component={AddBook} />
          <Route path="/edit-book/:id" component={EditBook} />
          <Route path="/reading-goals" component={ReadingGoals} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
