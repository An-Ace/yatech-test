
# Dokumentasi Yatech Back End Test




## Penginstalan

To install app

```bash
  npm install
```
#### App ini menggunakan ORM prisma dan sqlite, Untuk mengulang db maka perlu dijalankan 
#### *Opsional
##### Hapus folder migrations didalam folder prisma, Kemudian:
```bash
  prisma run migrate
```

## Halaman Utama
```http
  GET http:localhost:3333
```
## Soal No 1

#### Pencarian Jumlah Penjumlahan Array Sesuai Rumus

```http
  GET http:localhost:3333/logic -#Halaman Logic#-
```

| Langkah | Field     | Deskripsi                |
| :-------- | :------- | :------------------------- |
| `1` | `a` | **Wajib**. Sesuai Contoh dengan pemisah tanda "," (Comma) |
| `2` | `m` | **Wajib**. Jumlah Panjang Pemisah Perhitungan |
| `3` | `k` | **Wajib**. Hasil Penambahan Dari Setiap Angka Dari Sesi Yg Dipisah |

#### Get item

### Contoh:

| a | m  | k | **Hasil** |
| :-------- | :------- |  :------- | :-------------------------------- |
| `[2,4,7,5,3,5,8,5,1,7]`      | `4` | `10` | **5** |
| `[15,8,8,2,6,4,1,7]`      | `2` | `8` | **2** |
| `[2,5,7,9,8,2,1,4,5,6]`      | `4` | `11` | **4** |

### Formula
```typescript
function solution(a: number[], m: any, k: any) {
  let hashWindow: any = {};
  let initSwitch: any = false;
  let currentPair: any = [];
  
  for (let i = 0; i < m; i++) {
    if (k - a[i] in hashWindow) {
      currentPair = [a[i], k - a[i]];
      initSwitch = true;
    }
    hashWindow[a[i]] = (hashWindow[a[i]] || 0) + 1;
  }
  
  let counter = 0;
  let toReturn = initSwitch ? 1 : 0;
  
  for (let i = m; i < a.length; i++) {
    hashWindow[a[counter]] -= 1;
    if (hashWindow[a[counter]] === 0) {
      delete hashWindow[a[counter]];
    }
    if (k - a[i] in hashWindow) {
      currentPair = [a[i], k - a[i]];
      toReturn += 1;
    } else if (
      currentPair.length > 1 &&
      currentPair[0] !== currentPair[1] &&
      currentPair[0] in hashWindow &&
      currentPair[1] in hashWindow
    ) {
      toReturn += 1;
    } else if (
      currentPair.length > 1 &&
      currentPair[0] === currentPair[1] &&
      hashWindow[currentPair[0]] >= 2
    ) {
      toReturn += 1;
    }
    hashWindow[a[i]] = (hashWindow[a[i]] || 0) + 1;
    counter += 1;
  }
  
  return toReturn;
}
```

*Soal ada pada halaman logic.


## Soal No 2

#### Autentikasi: Access Token dan Refresh Token

```http
  GET http:localhost:3333/auth -#Halaman Auth#-
```

### Fitur

- Login
- Register
- View Data Api
- Middleware

### Langkah:
- Coba setiap link pada tombol dibawah, untuk tombol dengan awalan **Need Login** akan mengarahkan halaman dimana  harus login dan mendapatkan **Akses Token** untuk mengaksesnya, tombol dengan awalan **Need Admin** akan mengarahkan halaman dimana harus login dan mendapatkan **Role: Admin**, pada **Akses Token** untuk mengaksesnya
- Login menggunakan username: **admin** atau **user** dengan password default: **test123**
- Setelah login akan terdapat papan response dari login yang mana **Refresh Token** akan tersimpan di **localStorage** dengan Exp **7 Hari**, dan **Access Token** akan tersimpan sebagai **Cookie** dengan Exp **12 Jam**
- Apabila login menggunakan **user** coba tekan pada tombol berawalan **Need Admin**, maka akan diarahkan ke halaman dengan pesan penolakan.
- Untuk mengecek apabila **Akses Token kadaluarsa** atau **Secret Salah** maka tekan tombol **Rusak Akses Token**, kemudian klik **tombol** dibawah.
- Pengguna dapat mendaftar menggunakan **Tab Register** disamping, dengan role **User** secara default.

### Kegunaan Tombol:
- **Rusak Access Token**: Untuk Merusak **Access Token** yang kemudian digunakan untuk tes **Middleware API**.
- **Need Login: Lihat User**: Untuk Melihat **User & Profile & Postingan dari User yang login** yang kemudian middleware mengambil data dari verify Access Token dan akan dicari **ID User** tersebut pada **Database**.
- **Need Login: Lihat Profile**: Untuk Melihat **Profile dari User yang login** yang kemudian middleware mengambil data dari verify Access Token dan akan dicari **ID User** tersebut pada **Database**.
- **Need Admin: Lihat Semua User**: Untuk Melihat keseluruhan **User & Profile & Postingan dari User yang login** tersebut pada **Database** dengan syarat role tersebut adalah **Admin** yang diverifikasi dari **Access Token**.
- **Need Admin: Lihat Semua Profile**: Untuk Melihat keseluruhan **Profile** tersebut pada **Database** dengan syarat role tersebut adalah **Admin** yang diverifikasi dari **Access Token**.
- **Logout**: Untuk menghapus keseluruhan data Login pada **Cookie(Access Token)** dan **localStorage(Refresh Token)**.

### Routing
#### Untuk Api dibungkus dengan path **/api**
```javascript
  app.use("/api", router)
  // Contoh: http://localhost:3333/api/user
```
#### Pada Routing API, untuk halaman yang memerlukan Login akan routing akan dibungkus array Middleware dengan menaruh **isi access token** pada **req.session** sebagai **Data dari Access Token**, 
```javascript
  router.get("/profile", [checkSession, getProfiles])
```
#### Pada Routing API, untuk halaman yang memerlukan Role Admin akan routing akan dibungkus array Middleware dengan **reqAdmin** untuk mengecek data sebelumnya, sebagai **role admin** atau bukan jika bukan maka data **akan ditolak**, 
```javascript
  router.get("/profiles", [checkSession, reqAdmin, getProfiles]))
```
## Tech Stack

**Server:** Node, Express.JS, Prisma (ORM), jsonwebtoken, bcrypt


# Note
- ### Screenshoot Percobaan ada pada folder **screenshoot**.
- ### My Favorite Framework But Not Include: NEXT. JS & Next-Auth, React JS.
- ### Untuk membuat web dengn autentikasi secara cepat saya biasa menggunakan NEXT JS dengan library Next-Auth sebagai session handler.
