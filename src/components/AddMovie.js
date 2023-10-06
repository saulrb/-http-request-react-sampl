import { useRef } from 'react'
import React from 'react'

import classess from './AddMovie.module.css'

function AddMovie(props) {
  const titleRef = useRef('')
  const openingTextRef = useRef('')
  const releaseDateRef = useRef('')

  function submitHandler(event) {
    event.preventDefault()
    // could add validation here...
    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value
    }
    props.onAddMovie(movie)
  }

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <div className={classess.control}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" ref={titleRef} />
        </div>
        <div className={classess.control}>
          <label htmlFor="opening-text">Opening Text</label>
          <textarea rows="5" id="opening-title" ref={openingTextRef}></textarea>
        </div>
        <div className={classess.control}>
          <label htmlFor="date">Release Date</label>
          <input type="text" id="date" ref={releaseDateRef} />
        </div>
        <button>Add Movie</button>
      </form>
    </React.Fragment>
  )
}

export default AddMovie
