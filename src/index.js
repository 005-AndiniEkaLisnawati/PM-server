import express from 'express';
const app = express();
const port = 3000;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello Kambing!');
});

app.get('/users', (req, res) => {
  res.json({
    id: 1,
    name: 'Andin',
    email: 'andiniekalisnawati@gmail.com'
  });
});
 
app.post('/users', (req, res) => {
  const {name, email} = req.body;
  const user = {
    id: 2,
    name,
    email
  };
  res.status(201).json(user);
});


app.put('/users/:id', (req, res) => {
  const {id} = req.params;
  const {name, email} = req.body;
  const user = {
    id: parseInt(id),
    name,
    email
  };
  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const {id} = req.params;
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
