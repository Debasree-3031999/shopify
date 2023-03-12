import { Page, Badge, LegacyCard, AlphaCard, Text, Thumbnail,Button,  Modal,  LegacyStack,  TextContainer,  TextField } from '@shopify/polaris';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {NoteMinor} from '@shopify/polaris-icons';
import axios from "axios"

function User({details}) {
  const [user, setUser] = useState([])
  const [loading,setLoading] = useState(true)
  // console.log("details: ",details);
  let { id } = useParams()
  console.log(id);
  // let user=details
  useEffect(()=>{
    setUser([details])
    setTimeout(()=>{
      setLoading(false)
    },3000)
  },[details])
  // details.find((el)=> el.id==id)
  console.log("user: ",user);
  const [addr, setAddr] = useState(false)
  const [fValue, setFvalue] = useState('');
  const [lValue, setLvalue] = useState('');

  const fNameValue = useCallback((value) => setFvalue(value), []);

  const lNameValue = useCallback((value) => setLvalue(value), []);
  




  const [active, setActive] = useState(false);

  const toggleModal = useCallback(() => setActive((active) => !active), []);

  const activator = <Button onClick={toggleModal}>Edit Customer Details</Button>;

  const modifyUser=()=>{
    let fname=document.getElementById("fn").value
    let lname=document.getElementById("ln").value
    let obj={
      first_name:fname,
      last_name:lname
    }
    console.log(fname,lname);
    axios.put(`http://localhost:8080/customers/${id}`,obj).then((res)=>{
      console.log("put resp:",res);
    }).catch((err)=>{
      console.log("put err:",err);
    })
    // toggleModal()
  }

  return (
    <div>

      {loading?<div>Loading...</div>:<Page
        breadcrumbs={[{ content: 'consumers', url: '/' }]}
        title={`${user[0].first_name} ${user[0].last_name}`}
        subtitle={addr ? `${user[0].addresses[0].city}, ${user[0].addresses[0].country}` : "Guest User"}
        compactTitle
        
      >
        <LegacyCard sectioned>
          <LegacyCard.Section title="Amount Spent">
            <p>{user[0].total_spent}</p>
          </LegacyCard.Section>
  
          <LegacyCard.Section title="Total Orders">
            <p>{user[0].orders_count}</p>
          </LegacyCard.Section>
        </LegacyCard>
        <LegacyCard>
          <LegacyCard.Header title="Last Order Placed">
          </LegacyCard.Header>
            <LegacyCard.Section>
            <LegacyCard.Section title={user[0].last_order_name}>
              <Thumbnail source={NoteMinor} size="large" alt="Small document" >
  
              </Thumbnail>
            <p>{user[0].last_order_id}</p>
          </LegacyCard.Section>
  
            </LegacyCard.Section>
        </LegacyCard>
  
      <div style={{height: '500px'}}>
        <Modal
          activator={activator}
          open={active}
          onClose={toggleModal}
          title={`${user[0].first_name} ${user[0].last_name}`}
          primaryAction={{
            content: 'Save',
            onAction: modifyUser,
          }}
        >
          <Modal.Section>
            <LegacyStack vertical>
              <LegacyStack.Item>
                <TextContainer>
                  <p>
                    You can change the initials of this customer.
                  </p>
                </TextContainer>
              </LegacyStack.Item>
              <LegacyStack.Item fill>
                <TextField
                  label="First Name"
                  onChange={fNameValue}
                  id='fn'
                  value={fValue}
                />
                <TextField
                  label="Last Name"
                  onChange={lNameValue}
                  id='ln'
                  value={lValue}
                />
              </LegacyStack.Item>
            </LegacyStack>
          </Modal.Section>
        </Modal>
      </div>
      </Page>}
    </div>
    // <div></div>
  );
}


export default User;