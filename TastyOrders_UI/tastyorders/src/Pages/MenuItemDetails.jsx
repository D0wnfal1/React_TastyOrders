import React from 'react';

function MenuItemDetails() {
  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        <div className="col-md-7 col-12">
          <h2 className="text-dark">NAME</h2>
          <div className="mb-3">
            <span className="badge bg-primary text-white me-2" style={{ fontSize: "16px", padding: "10px" }}>
              CATEGORY
            </span>
            <span className="badge bg-warning text-dark" style={{ fontSize: "16px", padding: "10px" }}>
              SPECIAL TAG
            </span>
          </div>
          <p className="text-muted" style={{ fontSize: "18px" }}>
            DESCRIPTION
          </p>
          <div className="d-flex align-items-center mb-4">
            <span className="h4 text-success me-4">$10</span>
            <div className="d-inline-flex align-items-center border rounded-pill px-3 py-2">
              <i className="bi bi-dash-circle text-danger fs-4" style={{ cursor: "pointer" }}></i>
              <span className="h4 mx-3">XX</span>
              <i className="bi bi-plus-circle text-success fs-4" style={{ cursor: "pointer" }}></i>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-12 mb-2">
              <button className="btn btn-primary w-100">Add to Cart</button>
            </div>
            <div className="col-md-5 col-12 mb-2">
              <button className="btn btn-outline-secondary w-100">Back to Home</button>
            </div>
          </div>
        </div>
        <div className="col-md-5 col-12">
          <img
            src="https://via.placeholder.com/300"
            className="img-fluid rounded"
            alt="No content"
          />
        </div>
      </div>
    </div>
  );
}

export default MenuItemDetails;
