'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from './src/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {


  const [pantryList, setPantry] = useState([])
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [itemName, setItemName] = useState('')

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() })
    })
    setPantry(pantryList)
  }

  useEffect(() => {

    updatePantry()
  }, [])

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { count } = docSnap.data()
      await setDoc(docRef, { count: count + 1 })
    } else {
      await setDoc(docRef, { count: 1 })
    }
    await updatePantry()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { count } = docSnap.data()
      if (count === 1) {
        await deleteDoc(docRef)
      }
      else {
        await setDoc(docRef, { count: count - 1 })
      }
    }
    await updatePantry()
  }


  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      width="100vw"
      height="100vh"
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Items
          </Typography>
          <Stack direction={'row'} spacing={2}>
            <TextField id="outlined-basic" label="item" variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button variant="contained" onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}>Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>Add</Button>
      <Box width="800px" height="100px" bgcolor={'#ADD8E6'} display={'flex'} alignItems={'center'}
        justifyContent={'center'} border={'1px solid #333'}>
        <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
          Pantry items
        </Typography>

      </Box>
      <Box border={'1px solid #333'}>

        <Stack height="200px" width="800px" overflow={'auto'} spacing={2}>

          {
            pantryList.map(({ name, count }) => (
              <Box
                key={name}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                bgcolor={'#f0f0f0'}
                width="100%"
                height="100px"
                paddingX={2}
              >
                <Typography
                  variant={'h3'}
                  color={'#333'}
                >
                  {
                    name.charAt(0).toUpperCase() + name.slice(1)
                  }
                </Typography>
                <Typography variant="h3" color={'#333'} textAlign={'center'}>
                  Quantity: {count}
                </Typography>

                <Button variant="contained" onClick={() => removeItem(name)}>Remove</Button>
              </Box>
            ))}
        </Stack>
      </Box>
    </Box>
  );
}
