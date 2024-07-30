import React, { useEffect, useState } from 'react'
import menuItemModel  from '../../../Interfaces/menuItemModel.ts';
import MenuItemCard from './MenuItemCard.tsx';

function MenuItemList() {

    const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

    useEffect(()=>{
      fetch("https://localhost:7157/api/MenuItem").then((response)=> response.json()).then((data)=>{
        console.log(data);
        setMenuItems(data.result);
      })
    }, [])
    
  return (
    <div className='container row'>
      {menuItems.length> 0 && menuItems.map((menuItem, index)=>(
        <MenuItemCard menuItem={menuItem} key = {index}/>
      ))}
    </div>
  )
}

export default MenuItemList
