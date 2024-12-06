# STOCK MANAGEMENT API

### ERD:

![ERD](./erdStockAPI.png)

### ERD-2 (snake_case):

![ERD](./erdStockAPI2.png)

### Folder/File Structure:

```
    .env
    .gitignore
    index.js
    package.json
    readme.md
    src/
        config/
            dbConnection.js
            swagger.json
        controllers/
            auth.js
            brand.js
            category.js
            firm.js
            product.js
            purchase.js
            sale.js
            token.js
            user.js
        helpers/
            passwordEncrypt.js
            sendMail.js
        middlewares/
            authentication.js
            errorHandler.js
            findSearchSortPage.js
            logger.js
            permissions.js
            upload.js
        models/
            brand.js
            category.js
            firm.js
            product.js
            purchase.js
            sale.js
            token.js
            user.js
        routes/
            auth.js
            brand.js
            category.js
            document.js
            firm.js
            index.js
            product.js
            purchase.js
            sale.js
            token.js
            user.js
```

## StockAPP'e USERS tablosu ekleyebilirsiniz.

1-ilk kullanıcı oluşturulurken default:active ve admin olmaması gerek bu yüzden isAdmin:true gelse bile bodyden silinmesi gerek, aynı şekilde staff'da olamamalı.
2- Frontend panelde users diye bi tablo eklersiniz . Bu tablo'nun tüm listesini admin ya da staff görebilir diğerleri sadece kendi kullanıcı bilgisini görür. Staff ayrıca admin bilgisini göremez. Rentacar'da yapmıştık buna benzer.(Controller'da ayarlanmalı bu erişimler frontend kısmında da yapabilirsiniz benzer filtreleri)
3-Bu panelde admin kullanıcılara staff yetkisi verebilir, silebilir update edebilir. Şifre değişince kullanıcı mail adresine doğrulama linki gönderilebilir. Gerçek hayatta admin kullanıcı şifresini değiştirmez ama erişimi kısıtlayabilir.
4-Normal kullanıcı sadece kendi bilgilerini değiştirebilir ama silemez(Normal kullanıcının Controller'da silme yetkisi olmadığı için frontend kısmında silme butonunu gösterilmez. Hangi işlemleri yapabiliyorsa sadece o butonlar gösterilir daha kullanıcı dostu olur.)

## Client tarafında yapılacak değişiklikler

- "rename": "mv build ../public",
  "rename1": "mkdir -p ../public && mv build/\* ../public/"
- baseURL: "/api/v1",

## backend tarfında yapılacak değişiklikler

- const path = require("node:path");
- app.use(express.static(path.resolve(\_\_dirname, "./public")));
- app.all("/api/v1", (req, res) => {
  res.send({
  error: false,
  message: "Welcome to Stock Management API",
  documents: {
  swagger: "/api/v1/documents/swagger",
  redoc: "/api/v1/documents/redoc",
  json: "/api/v1/documents/json",
  },
  user: req.user,
  });
  });
- app.use("/api/v1", require("./src/routes"));
- app.get("/", (req, res) => {
  /_
  #swagger.ignore = true
  _/
  res.sendFile(path.resolve(\_\_dirname, "./public", "index.html"));
  });

- "setup-production": "npm i && node swaggerAutogen && cd client && npm i && npm run build && npm run rename1",
- build komutu= "npm run setup-production"
  const mongoose = require("mongoose");

## kullanıcı kendi hesabını silemeyecek ama admin'e istek gönderecek

# Model

const DeleteRequestSchema = new mongoose.Schema(
{
userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},
requestedBy: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},
reason: {
type: String,
default: "",
},
status: {
type: String,
enum: ["Pending", "Approved", "Rejected"],
default: "Pending",
},
createdAt: {
type: Date,
default: Date.now,
},
},
{
collection: "deleteRequests",
}
);

module.exports = mongoose.model("DeleteRequest", DeleteRequestSchema);

## Controller-1 Kullanıcılar için

const DeleteRequest = require("../models/DeleteRequest");

app.post("/request-delete", async (req, res) => {
if (req.user.isAdmin) {
return res.status(403).json({ message: "Admins cannot send delete requests." });
}

const { reason } = req.body;

const deleteRequest = new DeleteRequest({
userId: req.user.\_id,
requestedBy: req.user.\_id,
reason: reason || "No reason provided",
});

await deleteRequest.save();

res.status(201).json({ message: "Delete request sent to admin for approval." });
});

# Controller Admin için

app.post("/admin/delete-user/:id", async (req, res) => {
if (!req.user.isAdmin) {
return res.status(403).json({ message: "Not authorized" });
}

const { id } = req.params;

const deleteRequest = await DeleteRequest.findById(id);

if (!deleteRequest) {
return res.status(404).json({ message: "Delete request not found" });
}

if (deleteRequest.status !== "Pending") {
return res.status(400).json({ message: "This request has already been processed" });
}

const user = await User.findById(deleteRequest.userId);
if (!user) {
return res.status(404).json({ message: "User not found" });
}

// Delete the user
await User.findByIdAndDelete(user.\_id);

// Update the request status
deleteRequest.status = "Approved";
await deleteRequest.save();

// Notify the user
// Implement notification logic here (e.g., email notification)

res.status(200).json({ message: "User account deleted and admin notified." });
});
