
const express = require('express');
const app = express();
app.use(express.json())
const port = process.env.PORT || 3004;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.json({ message: 'alive' });
});

app.get('/user/:id', async (req, res) => {

  console.log(req.body);
  console.log(req.params);
  const { cognitoId } = req.params;

  const user = await prisma.Users.findFirst({
    where: { cognitoId: cognitoId }
  });
  console.log(user);

  res.json({
    data: user
  });
});

app.get('/users', async (req, res) => {

  const users = await prisma.Users.findMany();
  res.json({
    data: users
  });

  await prisma.Users.create({
    data: {
      cognitoId: "absc12345efgh",
      dateOfBirth: new Date("2022-03-03"),
      fullName: 'Chris George',
      email: 'chris@gmail.com',
      gender: 'Male',
      mobileCountryCode: '94',
      mobileNumber: '777123456',
      occupation: 'SE',
      userProcessStatus: '',
      userQuestions: '',
    },
  });
});

app.post('/user', async (req, res) => {

  console.log(req.body);
  const { cognitoId, dateOfBirth, fullName, email, gender, mobileCountryCode, mobileNumber, occupation, userProcessStatus, userQuestions } = req.body;

  const user = await prisma.Users.create({
    data: {
      cognitoId: cognitoId,
      dateOfBirth: new Date(dateOfBirth),
      fullName: fullName,
      email: email,
      gender: gender,
      mobileCountryCode: mobileCountryCode,
      mobileNumber: mobileNumber,
      occupation: occupation,
      userProcessStatus: '{"status":"Active"}',
      userQuestions: userQuestions,
    },
  });
  console.log(JSON.parse(user.userProcessStatus));
  res.json({
    data: user
  });
});

app.put('/user/:cognitoId', async (req, res) => {
  const { cognitoId } = req.params;
  const { dateOfBirth, fullName } = req.body;

  const user = await prisma.Users.update({
    where: { cognitoId: cognitoId },
    data: { dateOfBirth: new Date(dateOfBirth), fullName: fullName },
  })

  res.json({
    data: user
  });
});

app.delete(`/user/:cognitoId`, async (req, res) => {
  const { cognitoId } = req.params
  const user = await prisma.Users.delete({
    where: { cognitoId: cognitoId },
  })
  res.json({
    success: true,
    payload: user,
  })
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});