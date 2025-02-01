const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Dummy movie data
let movies = [
    { id: 1, title: 'Inception', director: 'Christopher Nolan', genre: 'Sci-Fi', releasedYear: 2010 },
    { id: 2, title: 'Titanic', director: 'James Cameron', genre: 'Romance', releasedYear: 1997 },
    { id: 3, title: 'The Godfather', director: 'Francis Ford Coppola', genre: 'Crime', releasedYear: 1972 },
    { id: 4, title: 'Pulp Fiction', director: 'Quentin Tarantino', genre: 'Crime', releasedYear: 1994 },
    { id: 5, title: 'The Shawshank Redemption', director: 'Frank Darabont', genre: 'Drama', releasedYear: 1994 },
    { id: 6, title: 'The Dark Knight', director: 'Christopher Nolan', genre: 'Action', releasedYear: 2008 },
    { id: 7, title: 'Forrest Gump', director: 'Robert Zemeckis', genre: 'Drama', releasedYear: 1994 },
    { id: 8, title: 'Gladiator', director: 'Ridley Scott', genre: 'Action', releasedYear: 2000 },
    { id: 9, title: 'Interstellar', director: 'Christopher Nolan', genre: 'Sci-Fi', releasedYear: 2014 },
    { id: 10, title: 'Avatar', director: 'James Cameron', genre: 'Fantasy', releasedYear: 2009 },
];

// Routes

// GET: Retrieve all movies
app.get('/movies', (req, res) => {
    res.json(movies);
});

// GET: Search movies by genre
app.get('/movies/genre/:genre', (req, res) => {
    const genre = req.params.genre.toLowerCase();
    const moviesByGenre = movies.filter(movie => movie.genre.toLowerCase() === genre);
    if (moviesByGenre.length > 0) {
        res.json(moviesByGenre);
    } else {
        res.status(404).send('No movies found in this genre');
    }
});

// POST: Add a new movie
app.post('/movies', (req, res) => {
    const { title, director, genre, releasedYear } = req.body;

    // Validation
    if (!title || !director) {
        return res.status(400).send('Title and director are required');
    }

    const newMovie = {
        id: movies.length + 1,
        title,
        director,
        genre,
        releasedYear,
    };

    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// PUT: Update a movie by ID
app.put('/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const { title, director, genre, releasedYear } = req.body;

    const movieIndex = movies.findIndex(movie => movie.id === movieId);
    if (movieIndex === -1) {
        return res.status(404).send('Movie not found');
    }

    // Update movie properties
    movies[movieIndex] = {
        ...movies[movieIndex],
        title: title || movies[movieIndex].title,
        director: director || movies[movieIndex].director,
        genre: genre || movies[movieIndex].genre,
        releasedYear: releasedYear || movies[movieIndex].releasedYear,
    };

    res.json(movies[movieIndex]);
});

// DELETE: Delete a movie by ID
app.delete('/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movieIndex = movies.findIndex(movie => movie.id === movieId);

    if (movieIndex === -1) {
        return res.status(404).send('Movie not found');
    }

    const deletedMovie = movies.splice(movieIndex, 1);
    res.json(deletedMovie);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});