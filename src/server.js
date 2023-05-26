// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const app = express();

// // Middleware для обработки JSON данных
// app.use(express.json());
// app.put("/clubs.json/:itemId", (req, res) => {
//   const itemId = req.params.itemId;
//   const newData = req.body;
//   const dbData = JSON.parse(fs.readFileSync("public/clubs.json"));

//   // Найти элемент с заданным itemId и обновить его значения
//   dbData[itemId] = newData;
//   fs.writeFileSync("/public/clubs.json", JSON.stringify({ items: dbData }));
//   res.send("Data updated successfully");
// });

// // Запуск сервера
// app.listen(3001, () => {
//   console.log("Server is running on port 3001");
// });
