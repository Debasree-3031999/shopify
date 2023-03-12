import React from 'react'
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import Users from '../components/Users';

export default function UserList({users}) {
    return (
        <div>
            <AppProvider i18n={en}>
                <Users data={users} />
            </AppProvider>
        </div>
    )
}
