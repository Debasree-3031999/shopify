import React from 'react';
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import User from '../components/User';
import { useParams } from 'react-router-dom';

export default function UserDetails({users}) {
  console.log("UserDetails",users);
  let { id } = useParams()
  console.log(id);
  let user=users.find((el)=> el.id==id)
  console.log("user: ",user);
  return (
    <div>
        <AppProvider i18n={en}>
            {<User details={user}/>}
        </AppProvider>
    </div>
  )
}
