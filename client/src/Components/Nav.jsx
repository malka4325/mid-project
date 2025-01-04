import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
// import { useRouter } from 'next/router';
import { Link, Outlet } from 'react-router-dom';
const Nav =() =>{

  const items = [
    {
        label: <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>בית</Link>,
        icon: 'pi pi-home',
    },
    {
        label: <Link to="/nav/posts" style={{ textDecoration: 'none', color: 'inherit' }}>מאמרים</Link>,
        icon: 'pi pi-book',
    },
    {
      label: <Link to="/nav/users" style={{ textDecoration: 'none', color: 'inherit' }}>משתמשים</Link>,
      icon: 'pi pi-users',
  } ,
   {
    label: <Link to="/nav/todos" style={{ textDecoration: 'none', color: 'inherit' }}>משימות</Link>,
    icon: 'pi pi-check-square ',
}
];

  return (<>
      <div style={{marginBottom:"0"}} className="card">
          <TabMenu model={items} />

      </div>
   
      <Outlet />  
</>
  )
}

export default Nav








