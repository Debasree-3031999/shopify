import {LegacyCard, ResourceList, Avatar, ResourceItem, Text} from '@shopify/polaris';
import React from 'react';

function Users({data}) {
    console.log("==",data);
  return (
    <LegacyCard>
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={data}
        renderItem={(item) => {
          const {id, email, first_name,last_name, phone} = item;
          const media = <Avatar customer size="medium" first_name={first_name} />;
          // let param=`${id}&${first_name}&${email}&${phone}`;
          return (
            <ResourceItem
              id={id}
              email={email}
              media={media}
              url={`/customers/${id}`}
              accessibilityLabel={`View details for ${first_name}`}
            >
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                {first_name} {last_name}
              </Text>
              <div>Ph: {phone}</div>
              <div>{email}</div>
              <div></div>
            </ResourceItem>
          );
        }}
      />
    </LegacyCard>
  );
}


export default Users;