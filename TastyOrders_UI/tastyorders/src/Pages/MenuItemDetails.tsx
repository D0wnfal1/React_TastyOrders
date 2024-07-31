import React from 'react';
import { useParams } from 'react-router-dom';
import {useGetMenuItemByIdQuery} from "../Apis/menuItemApi.ts"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function MenuItemDetails() {
  const {menuItemId} = useParams();
  const {data, isLoading} = useGetMenuItemByIdQuery(menuItemId);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  console.log(data);

  const handleQuantity = (counter: number)=> {
    let newQuantity = quantity + counter;
    if(newQuantity == 0){
      newQuantity = 1;
    }
    setQuantity(newQuantity);
    return;
  }
  return (
    <div className="container pt-4 pt-md-5">

    {!isLoading? (  <div className="row">
        <div className="col-md-7 col-12">
          <h2 className="text-dark">{data.result?.name}</h2>
          <div className="mb-3">
            <span className="badge bg-primary text-white me-2" style={{ fontSize: "16px", padding: "10px" }}>
              {data.result?.category}
            </span>
            <span className="badge bg-warning text-dark" style={{ fontSize: "16px", padding: "10px" }}>
            {data.result?.specialTag}
            </span>
          </div>
          <p className="text-muted" style={{ fontSize: "18px" }}>
            {data.result.description}
          </p>
          <div className="d-flex align-items-center mb-4">
            <span className="h4 text-success me-4">{data.result?.price}</span>
            <div className="d-inline-flex align-items-center border rounded-pill px-3 py-2">
              <i onClick={()=>handleQuantity(-1)} className="bi bi-dash-circle text-danger fs-4" style={{ cursor: "pointer" }}></i>
              <span className="h4 mx-3">{quantity}</span>
              <i onClick={()=>handleQuantity(+1)} className="bi bi-plus-circle text-success fs-4" style={{ cursor: "pointer" }}></i>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-12 mb-2">
              <button className="btn btn-primary w-100">Add to Cart</button>
            </div>
            <div className="col-md-5 col-12 mb-2">
              <button className="btn btn-outline-secondary w-100" onClick={()=> navigate(-1)}>Back to Home</button>
            </div>
          </div>
        </div>
        <div className="col-md-5 col-12">
          <img
            src={data.result.image}
            className="img-fluid rounded"
            alt="No content"
          />
        </div>
      </div>):(
      <div className="d-flex justify-content-center" style={{width: "100%"}}>
      <div>Loading</div>
      </div>
    )}


    
    </div>
  );
}

export default MenuItemDetails;
