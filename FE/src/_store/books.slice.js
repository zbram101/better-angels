import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '_helpers';

// create slice

const name = 'books';
const initialState = createInitialState();
const extraActions = createExtraActions();
const reducers = createReducers();
const slice = createSlice({ name, initialState, reducers });

// exports

export const bookActions = { ...slice.actions, ...extraActions };
export const booksReducer = slice.reducer;

// implementation

function createInitialState() {
    return {
        list: null
    }
}

function createReducers() {
  return {
      setBooks
  };

  function setBooks(state, action) {
      state.list = action.payload;
  }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;

    return {
        getAll: getAll(),
        getById: getById(),
        add: add(),
        update: update(),
        delete: deleteBook(),
        reserve: reserve(),
        filteredSearch: filteredSearch(),
    };

    function reserve() {
      return createAsyncThunk(
          `${name}/reserve`,
          async (id) => fetchWrapper.post(`${baseUrl}/books/${id}/reserve`)
      );
    }

    function deleteBook() {
        return createAsyncThunk(
            `${name}/delete`,
            async (id) => fetchWrapper.delete(`${baseUrl}/books/${id}`)
        );
      }

    function filteredSearch() {
        return createAsyncThunk(
            `${name}/filteredSearch`,
            async function (searchText, { dispatch }) {
                const books = await fetchWrapper.post(`${baseUrl}/books/search`,{'query':searchText})
                dispatch(bookActions.setBooks(books.data.books));
            },
        );
      }

    function update() {
      return createAsyncThunk(
          `${name}/update`,
          async ({id, data}) => fetchWrapper.put(`${baseUrl}/books/${id}`, data)
      );
    }
    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async function (user, { dispatch }) {
                const books = await fetchWrapper.get(`${baseUrl}/books`);
                // set books in redux state 
                dispatch(bookActions.setBooks(books.data));
            },
        );
    }

    function getById() {
      return createAsyncThunk(
          `${name}/getById`,
          async (id) => await fetchWrapper.get(`${baseUrl}/books/${id}`)
      );
    }

    function add() {
      return createAsyncThunk(
          `${name}/add`,
          async (book) => await fetchWrapper.post(`${baseUrl}/books`, book)
      );
  }


}

