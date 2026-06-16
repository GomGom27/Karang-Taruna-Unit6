document.getElementById("loginForm")
.addEventListener("submit", function(e){

e.preventDefault();

let username =
document.getElementById("username").value;

let password =
document.getElementById("password").value;

if(username==="admin" && password==="12345"){

document.getElementById("loginPage")
.style.display="none";

document.getElementById("dashboard")
.style.display="flex";

}else{

alert("Username atau Password Salah!");

}

});

function showPage(id){

let pages =
document.querySelectorAll(".page");

pages.forEach(page=>{
page.classList.add("hidden");
});

document.getElementById(id)
.classList.remove("hidden");

}

function searchMember(){

let input =
document.getElementById("search")
.value.toUpperCase();

let table =
document.getElementById("memberTable");

let tr =
table.getElementsByTagName("tr");

for(let i=1;i<tr.length;i++){

let td = tr[i].getElementsByTagName("td")[1];

if(td){

let txt =
td.textContent || td.innerText;

if(txt.toUpperCase().indexOf(input)>-1){

tr[i].style.display="";

}else{

tr[i].style.display="none";

}

}

}

}

function exportPDF() {
    window.print();
}

function showDivision(divisi){

    const data = {

        pendidikan: [
            ["1", "Arya Putra D", "Koordinator"],
            ["2", "Rina", "Anggota"],
            ["3", "Andi", "Anggota"]
        ],

        rohani: [
            ["1", "Hamzah", "Koordinator"],
            ["2", "Ahmad", "Anggota"],
            ["3", "Nabila", "Anggota"]
        ],

        olahraga: [
            ["1", "Gilang Ramadhan", "Koordinator"],
            ["2", "Budi", "Anggota"],
            ["3", "Fajar", "Anggota"]
        ],

        kesenian: [
            ["1", "Sasi", "Koordinator"],
            ["2", "Ayu", "Anggota"],
            ["3", "Raka", "Anggota"]
        ],

        kewirausahaan: [
            ["1", "Salwa Khaerunisa R", "Koordinator"],
            ["2", "Dina", "Anggota"],
            ["3", "Rizky", "Anggota"]
        ],

        pdd: [
            ["1", "Arya Putra D", "Koordinator"],
            ["2", "Rendi", "Anggota"],
            ["3", "Fikri", "Anggota"]
        ]

    };

    document.getElementById("divisionDetail").style.display = "block";

    document.getElementById("divisionTitle").innerHTML =
        "Divisi " + divisi.toUpperCase();

    let body = document.getElementById("divisionBody");

    body.innerHTML = "";

    data[divisi].forEach(function(item){

        body.innerHTML += `
            <tr>
                <td>${item[0]}</td>
                <td>${item[1]}</td>
                <td>${item[2]}</td>
            </tr>
        `;

    });

}

function logout(){

    if(confirm("Apakah Anda yakin ingin logout?")){

        document.getElementById("dashboard")
        .style.display = "none";

        document.getElementById("loginPage")
        .style.display = "flex";

        document.getElementById("username").value = "";
        document.getElementById("password").value = "";

        let pages =
        document.querySelectorAll(".page");

        pages.forEach(page=>{
            page.classList.add("hidden");
        });

        document.getElementById("home")
        .classList.remove("hidden");

    }

}

function tambahKegiatan() {

    let tanggal = document.getElementById("tglKegiatan").value;
    let kegiatan = document.getElementById("namaKegiatan").value;
    let lokasi = document.getElementById("lokasiKegiatan").value;

    if (tanggal === "" || kegiatan === "" || lokasi === "") {
        alert("Lengkapi semua data!");
        return;
    }

    let tbody = document.querySelector("#tabelKegiatan tbody");

    let row = tbody.insertRow();

    row.innerHTML = `
        <td>${tanggal}</td>
        <td>${kegiatan}</td>
        <td>${lokasi}</td>
        <td>
            <button onclick="hapusKegiatan(this)">
                Hapus
            </button>
        </td>
    `;

    document.getElementById("tglKegiatan").value = "";
    document.getElementById("namaKegiatan").value = "";
    document.getElementById("lokasiKegiatan").value = "";
}

function hapusKegiatan(button) {
    let row = button.parentNode.parentNode;
    row.remove();
}

// =======================
// DATA AGENDA KEGIATAN
// =======================

let kegiatanList = JSON.parse(localStorage.getItem("kegiatanList")) || [];

// Saat halaman dibuka
window.onload = function () {
    tampilkanKegiatan();
};

// Tambah kegiatan
function tambahKegiatan() {

    let tanggal = document.getElementById("tglKegiatan").value;
    let kegiatan = document.getElementById("namaKegiatan").value;
    let lokasi = document.getElementById("lokasiKegiatan").value;

    if (tanggal === "" || kegiatan === "" || lokasi === "") {
        alert("Lengkapi semua data terlebih dahulu!");
        return;
    }

    let data = {
        tanggal: tanggal,
        kegiatan: kegiatan,
        lokasi: lokasi
    };

    kegiatanList.push(data);

    localStorage.setItem(
        "kegiatanList",
        JSON.stringify(kegiatanList)
    );

    tampilkanKegiatan();

    document.getElementById("tglKegiatan").value = "";
    document.getElementById("namaKegiatan").value = "";
    document.getElementById("lokasiKegiatan").value = "";
}

// Menampilkan data
function tampilkanKegiatan() {

    let tbody = document.getElementById("tbodyKegiatan");

    tbody.innerHTML = "";

    kegiatanList.forEach((item, index) => {

        tbody.innerHTML += `
            <tr>
                <td>${item.tanggal}</td>
                <td>${item.kegiatan}</td>
                <td>${item.lokasi}</td>
                <td>
                    <button onclick="hapusKegiatan(${index})">
                        Hapus
                    </button>
                </td>
            </tr>
        `;
    });
}

// Hapus kegiatan
function hapusKegiatan(index) {

    if (confirm("Yakin ingin menghapus agenda ini?")) {

        kegiatanList.splice(index, 1);

        localStorage.setItem(
            "kegiatanList",
            JSON.stringify(kegiatanList)
        );

        tampilkanKegiatan();
    }
}