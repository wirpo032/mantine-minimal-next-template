import { useForm, showNotification } from '@mantine/form';
import { createStyles, Title, Autocomplete, HueSlider, TextInput, Switch, Group, ActionIcon, Box, Text, Button, Checkbox } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { IconTrash, IconCheck, IconX } from '@tabler/icons';
import { useState } from 'react';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 80,

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  dots: {
    position: 'absolute',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },

  description: {
    textAlign: 'center',

    '@media (max-width: 520px)': {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      height: 42,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export function FormCars() {

  const [mailcomplete, setMailcomplete] = useState('');
  const mailData =
  mailcomplete.trim().length > 0 && !mailcomplete.includes('@')
      ? ['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${mailcomplete}@${provider}`)
      : [];

  const form = useForm({
    initialValues: {
      user: {FirstName: '', LastName: '', PhoneNumber: '', Email: ''},
      cars: [{Make: '', Model: '', Km: '', Color: '170', active: true, key: randomId() }],
    },
   /* validate: {
    'user.Email': (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }, */
  });

  const fields = form.values.cars.map((item, index) => (
    <Group key={item.key} mt="xs">
      <Autocomplete
      placeholder="Brand"
      required
      sx={{ flex: 1 }}
      {...form.getInputProps(`cars.${index}.Make`)}
      data={['Toyota','Volkswagen','Hyundai','General Motors','Ford','Nissan','Honda','FCA','Renault','Peugeot','Suzuki','SAIC','Daimler','BMW','Geely','Changan','Mazda','Mitsubishi','Kia','Tesla','Subaru']}
      />
      <TextInput
        placeholder="Doe"
        required
        sx={{ flex: 1 }}
        {...form.getInputProps(`cars.${index}.Model`)}
      />
      <TextInput
        placeholder="23789"
        required
        sx={{ flex: 1 }}
        {...form.getInputProps(`cars.${index}.Km`)}
      />
      <HueSlider
        required
        {...form.getInputProps(`cars.${index}.Color`)} 
        sx={{ flex: 1 }}
      />
      <Switch
        label="Active"
        {...form.getInputProps(`cars.${index}.active`, { type: 'checkbox' })}
      />
      <ActionIcon color="red" onClick={() => form.removeListItem('cars', index)}>
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  ));


  const handleError = (errors: typeof form.errors) => {
    if (errors.name) {
      showNotification({ message: 'Please fill name field', color: 'red' });
    } else if (errors.email) {
      showNotification({ message: 'Please provide a valid email', color: 'red' });
    }
  };

  const handleSubmit = (values: typeof form.values) => {

    console.log(form.values);
      
    await axios.post("https://backend-core.admin.luxadmin.lu/stickers-310722-s", {
          FirstName: form.values.user.FirstName,  
          LastName: form.values.user.LastName,  
          PhoneNumber: form.values.user.PhoneNumber,  
          Email: form.values.user.Email,  
          cars: form.values.cars,    

  });
  }

  return (  
    <>
    <Box sx={{ maxWidth: 900 }} mx="auto">
    <Title order={2}>
        Signup now
     </Title>
    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <Group mb="xs">
      <TextInput
        label="First name"
        placeholder="Jane"
        mt="md"
        {...form.getInputProps('user.FirstName')}
        sx={{ flex: 1 }}
      />
      <TextInput
        label="Last name"
        placeholder="Doe"
        mt="md"
        {...form.getInputProps('user.LastName')}
        size="sm" sx={{ flex: 1 }}
      />
      <TextInput
        label="Phone number"
        placeholder="Phone number"
        mt="md"
        {...form.getInputProps('user.PhoneNumber')}
        size="sm" sx={{ flex: 1 }}
      />
      <Autocomplete
        value={mailcomplete}
        onChange={setMailcomplete}
        label="Email"
        placeholder="jane@doe.com"
        mt="md"
        data={mailData}
        size="sm" sx={{ flex: 1 }}
        {...form.getInputProps('user.Email')}
       />
      </Group>

      {fields.length > 0 ? (
        <Group mb="xs">
          <Text weight={500} size="sm" sx={{ flex: 1 }}>
            Brand
          </Text>
          <Text weight={500} size="sm" sx={{ flex: 1 }}>
            Make
          </Text>
          <Text weight={500} size="sm" sx={{ flex: 1 }}>
            KM
          </Text>
          <Text weight={500} size="sm" sx={{ flex: 1 }}>
            Color
            </Text>
          <Text weight={500} size="sm" pr={90}>
            Status
          </Text>
        </Group>
      ) : (
        <Text color="dimmed" align="center">
          No one here...
        </Text>
      )}

      {fields}

      <Group mt="md">
        <Button
          onClick={() =>
            form.insertListItem('cars', {Make: '',  Model: '', Km: '', Color: '', active: true, key: randomId() })
          }
        >
          Add another car
        </Button>
      </Group>
    <Group mb="xs">
      <Checkbox
        label="I accept the terms & conditions"
        mt="sm"
        {...form.getInputProps('terms', { type: 'checkbox' })}
      />
    </Group>
      <Button>Submit</Button>
      </form>
    </Box>
    </>
  );
}