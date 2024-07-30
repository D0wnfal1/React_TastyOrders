import React from 'react';
import menuItemModel from '../../../Interfaces/menuItemModel';
import { Link } from 'react-router-dom';
interface Props {
    menuItem: menuItemModel;
}

function MenuItemCard(props: Props) {
  const { menuItem } = props;

  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          transition: "0.3s",
          borderRadius: "10px"
        }}
      >
        <div className="card-body p-0">
            <Link to={`/menuItemDetails/${props.menuItem.id}`}>
          <img
            src={menuItem.image || "https://via.placeholder.com/150"}
            alt={menuItem.name}
            style={{
              width: "100%",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px"
            }}
          />
          </Link>
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-warning text-dark">SPECIAL</span>
              <button className="btn btn-outline-primary btn-sm">
                <i className="bi bi-bag-plus"></i>
              </button>
            </div>
            <Link to={`/menuItemDetails/${props.menuItem.id}`} style={{textDecoration:"none", color:"green"}}>
            <h5 className="card-title text-dark">{menuItem.name}</h5>
            </Link>
            <p className="text-muted" style={{ fontSize: "14px" }}>{menuItem.category}</p>
            <p className="card-text" style={{ textAlign: "justify" }}>
              {menuItem.description}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="text-dark">${menuItem.price}</h4>
              <button className="btn btn-success btn-sm">Order Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;
