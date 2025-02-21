const KELAS_X = 'x';
const KELAS_O = 'o';
const KOMBINASI_MENANG = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
const elemenSel = document.querySelectorAll('[data-sel]');
const papan = document.getElementById('papan');
const elemenPesanMenang = document.getElementById('pesanMenang');
const teksPesanMenang = document.querySelector('[data-pesan-menang-teks]');
const tombolUlangi = document.getElementById('tombolUlangi');
let giliranO;

mulaiPermainan();

tombolUlangi.addEventListener('click', mulaiPermainan);

function mulaiPermainan() {
	giliranO = false;
	elemenSel.forEach(sel => {
		sel.classList.remove(KELAS_X);
		sel.classList.remove(KELAS_O);
		sel.removeEventListener('click', handleClick);
		sel.addEventListener('click', handleClick, { once: true });
	});
	setPapanHoverClass();
	elemenPesanMenang.classList.remove('show');
}

function handleClick(e) {
	const sel = e.target;
	const kelasSaatIni = giliranO ? KELAS_O : KELAS_X;
	tempatkanTanda(sel, kelasSaatIni);
	if (cekMenang(kelasSaatIni)) {
		akhiriPermainan(false);
	} else if (adalahSeri()) {
		akhiriPermainan(true);
	} else {
		gantiGiliran();
		setPapanHoverClass();
		langkahKomputer();
	}
}

function langkahKomputer() {
    const kotakKosong = [...elemenSel].filter(sel => 
        !sel.classList.contains(KELAS_X) && !sel.classList.contains(KELAS_O)
    );
    const langkahAcak = kotakKosong[Math.floor(Math.random() * kotakKosong.length)];
    tempatkanTanda(langkahAcak, KELAS_O);
    if (cekMenang(KELAS_O)) {
        akhiriPermainan(false);
    } else if (adalahSeri()) {
        akhiriPermainan(true);
    } else {
        gantiGiliran();
        setPapanHoverClass();
    }
}

function akhiriPermainan(seri) {
	if (seri) {
		teksPesanMenang.innerText = 'seri!';
	} else {
		teksPesanMenang.innerText = `${giliranO ? "O" : "X"} Menang!`;
	}
	elemenPesanMenang.classList.add('show');
}

function adalahSeri() {
	return [...elemenSel].every(sel => {
		return sel.classList.contains(KELAS_X) || sel.classList.contains(KELAS_O);
	});
}

function tempatkanTanda(sel, kelasSaatIni) {
	sel.classList.add(kelasSaatIni);
}

function gantiGiliran() {
	giliranO = !giliranO;
}

function setPapanHoverClass() {
	papan.classList.remove(KELAS_X);
	papan.classList.remove(KELAS_O);
	if (giliranO) {
		papan.classList.add(KELAS_O);
	} else {
		papan.classList.add(KELAS_X);
	}
}

function cekMenang(kelasSaatIni) {
	return KOMBINASI_MENANG.some(kombinasi => {
		return kombinasi.every(index => {
			return elemenSel[index].classList.contains(kelasSaatIni);
		});
	});
}