/*target ile hangi div alanına click yaptığı bilgisine ulaşırız
classlist ile bir div içindeki tüm classlara ulaşılır
contains fonksiyonu da classların içinde geçen kelimeleri döndürür
toggle bir classa ekleme yapmak için kullanılır*/

const container = document.querySelector('.container');
const seat = document.querySelector('.seat');
const count = document.getElementById('count');
const amout = document.getElementById('amount');
const selectMovie = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();



container.addEventListener('click', function (e) {

    //target ile hangi div alanına click yaptığı bilgisine ulaşırız
   //console.log(e.target);
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal()
    }

    e.preventDefault();
});

selectMovie.addEventListener('change', function (e) {
    calculateTotal();
})

function calculateTotal() {
    let selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [];//seçilen tüm koltukları diziye atamak için
    const seatsArr = []; //tüm koltukları diziye atamk için

    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat); //forech dongusu ile seçilen koltukları seat değişkenine atayıp diziye ekliyorz
    })

    seats.forEach(function (seat) {
        seatsArr.push(seat);
    })

    let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat); //secilen koltuklar dizisinin içindeki elemanların
        // tüm koltuklar dizisinde kaçıncı indexte olduklarını bulmak için map fonksiyonunu kullandık
    })

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amout.innerText = selectedSeatCount*selectMovie.value;

    saveLocalStorage(selectedSeatIndexs);

}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectMovie'));

    if (selectedMovieIndex != null){
        selectMovie.selectedIndex = selectedMovieIndex;
    }
}

function saveLocalStorage(indexs) { //seçilen koltuk ve film indekslerini local stroage'e kaydediyoruz
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectMovie', JSON.stringify(selectMovie.selectedIndex));
    console.log(12);
}