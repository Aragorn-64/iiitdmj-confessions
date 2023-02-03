import React from 'react'
import AddConfession from './addConfession';

export const CreateModal = ({url, count, setCount}) => {
  return (
    <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Post your confession .. </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <AddConfession url={url} count={count} setCount={setCount} />
            </div>
        </div>
    </div>
    </div>
  )
}
