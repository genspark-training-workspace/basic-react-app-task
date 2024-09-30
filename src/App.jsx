import React, { useState } from 'react' // (5) Importing React and useState
import './App.css'
// (1) Multiple Function Components in a Single File
const MovieForm = ({ addMovie }) => {
    // (2) Nested Function Component
    const [title, setTitle] = useState('') // (7) Using state (string)
    const [rating, setRating] = useState(0) // (7) Using state (number)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title) {
            addMovie({ id: Date.now(), title, rating, watched: false }) // (7) Creating movie object (object) and adding it to state
            setTitle('') // Resetting input
            setRating(0) // Resetting input
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Movie Title'
                required
            />
            <input
                type='number'
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                placeholder='Rating (1-5)'
                min='1'
                max='5'
                required
            />
            <button type='submit'>Add Movie</button>
        </form>
    )
}

// (1) Multiple Function Components in a Single File
const MovieCard = ({ movie, removeMovie, toggleWatched }) => {
    // (2) Nested Function Component
    return (
        <div className='result'>
            <h2>
                {movie.title} ({movie.watched ? 'Watched' : 'Not Watched'})
            </h2>{' '}
            {/* (10) Conditional rendering */}
            <p>Rating: {movie.rating}</p>{' '}
            {/* (7) Displaying variable (number) */}
            <div className='action-buttons'>
                <button onClick={() => toggleWatched(movie.id)}>
                    Mark as {movie.watched ? 'Unwatched' : 'Watched'}{' '}
                    {/* (10) Conditional rendering */}
                </button>
                <button onClick={() => removeMovie(movie.id)}>Remove</button>
            </div>
        </div>
    )
}

// (1) Multiple Function Components in a Single File
const MovieList = ({ movies, removeMovie, toggleWatched }) => {
    // (2) Nested Function Component
    return (
        <div>
            {movies.length === 0 ? ( // (10) Conditional rendering for empty list
                <p>No movies in your watchlist!</p>
            ) : (
                movies.map(
                    (
                        movie // (8) Rendering by looping (array)
                    ) => (
                        <MovieCard
                            key={movie.id} // (9) React lists and keys
                            movie={movie}
                            removeMovie={removeMovie}
                            toggleWatched={toggleWatched}
                        />
                    )
                )
            )}
        </div>
    )
}

// (1) Multiple Function Components in a Single File
const App = () => {
    const [movies, setMovies] = useState([]) // (7) Using state (array)

    const addMovie = (movie) => {
        setMovies([...movies, movie]) // (7) Adding a movie to the state
    }

    const removeMovie = (id) => {
        setMovies(movies.filter((movie) => movie.id !== id)) // (7) Removing a movie from the state
    }

    const toggleWatched = (id) => {
        setMovies(
            movies.map(
                (movie) =>
                    movie.id === id
                        ? { ...movie, watched: !movie.watched }
                        : movie // (7) Toggling the watched status of a movie (object)
            )
        )
    }

    return (
        <div>
            <h1>Movie Watchlist</h1>
            <MovieForm addMovie={addMovie} />
            {/* (11) Passing function as a prop */}
            <MovieList
                movies={movies}
                removeMovie={removeMovie}
                toggleWatched={toggleWatched}
            />
            {/* (11) Passing data and functions as props */}
        </div>
    )
}

export default App // (4) Default export of the App component
