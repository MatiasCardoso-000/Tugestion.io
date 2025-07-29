import express from 'express';

const app = express();
app.listen(3312, () => {
  console.info(`Server is running on port ${3312}`);
});
