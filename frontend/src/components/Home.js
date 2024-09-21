import React from 'react'
import Notes from './Notes';

const Home = () => {
  return (
    <div className='container my-3'>
      <h1>Add Your Note</h1>

      <form className="row g-3">
        <div className="col-auto">
          <label for="staticEmail2" className="visually-hidden">Email</label>
          <input type="text"  className="form-control" id="staticEmail2" placeholder='' />
        </div>
        <div className="col-auto">
          <label for="inputPassword2" className="visually-hidden">Password</label>
          <input type="password" className="form-control" id="inputPassword2" placeholder="Password" />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">Confirm identity</button>
        </div>
      </form>

      <h1>
        Your Notes
      </h1>
      <Notes/>
    </div>
  )
}

export default Home;