import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
// import { useRouter } from 'next/router';
import { Link, Outlet } from 'react-router-dom';
const HomePage =() =>{

  const items = [
    {
        label: <Link to="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>בית</Link>,
        icon: 'pi pi-home',
    },
    {
        label: <Link to="/posts" style={{ textDecoration: 'none', color: 'inherit' }}>מאמרים</Link>,
        icon: 'pi pi-book',
    },
    {
      label: <Link to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>משתמשים</Link>,
      icon: 'pi pi-users',
  } ,
   {
    label: <Link to="/todos" style={{ textDecoration: 'none', color: 'inherit' }}>משימות</Link>,
    icon: 'pi pi-check-square ',
}
];

  return (<>
      <div className="card">
          <TabMenu model={items} />

      </div>
   
      <Outlet />  
</>
  )
}

export default HomePage








