const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage() 
calculateTotal()

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected"); // seçince sarı oluyor
    calculateTotal();
  }
});

// Her film için ayrı fiyat hesapnması;
select.addEventListener("change", function (e) {
  calculateTotal();
});

// Hepsinde kullanabilmemiz için function adı alında yazıyoruz

function calculateTotal() {
  // seçtiğimiz koltukları saymak için ;
  const selectedSeats = container.querySelectorAll(".seat.selected");

  const selectedSeatsArr = [];
  const seatsArr = [];

  selectedSeats.forEach(function (seat) {
    selectedSeatsArr.push(seat);
  });

  seats.forEach(function (seat) {
    seatsArr.push(seat);
  });
  // kaçıncı index numarası olduğunu bulmak için ;
  let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
    return seatsArr.indexOf(seat);
  });

  console.log(selectedSeatIndexs);

  let selectedSeatCount = selectedSeats.length;

  // seçtiğimiz filmin fiyatını almak için
  amount.textContent = selectedSeatCount * select.value;
  // seçtiğimiz koltuk sayısının aşağıda yazması için

  count.textContent = selectedSeatCount;

  saveToLocalStorage(selectedSeatIndexs);
}

// Sayfayı yenilediğimizde girdiğimiz bilgiler orada kalsın; (Tekrardan bir izle)
function getFromLocalStorage() {
    // seçili koltuk için
    const selectedSeats =JSON.parse(localStorage.getItem('selectedSeats'));
   if(selectedSeats != null && selectedSeats.length > 0 ) {
    seats.forEach(function(seat, index) {
        if(selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected');
        }
    })
   }
    
    
    // seçili film için
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if(selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

// Seçtiğimiz bilgilerin kayıtlı kalması için
function saveToLocalStorage(indexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexs));
  localStorage.setItem('selectedMovieIndex' , select.selectedIndex)
}



















/* bu da aynısı ilk yaptığımız
function calculateTotal() {
 // seçtiğimiz koltukları saymak için ; 

 let selectedSeatCount = container.querySelectorAll('.seat.selected').length;

 // seçtiğimiz filmin fiyatını almak için 
 let price = select.value;
 amount.textContent = selectedSeatCount * price;
 // seçtiğimiz koltuk sayısının aşağıda yazması için

 count.textContent = selectedSeatCount
} 
*/
