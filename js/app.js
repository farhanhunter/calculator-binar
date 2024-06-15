// Menghapus koma dari string angka dan mengubahnya ke tipe number
function reverseNumberFormat(num) {
  if (typeof num !== "string") {
    throw new Error("Input harus berupa string");
  }
  return Number(num.replace(/,/g, ""));
}

// Mengambil nilai input saat ini
function getInput() {
  return document.getElementById("input-value").innerText || "0";
}

// Memformat angka menjadi string dengan koma sebagai pemisah ribuan
function getFormattedNumber(num) {
  if (num === "-") {
    return " ";
  }
  let n = Number(num);
  if (isNaN(n)) {
    return "0";
  }
  return n.toLocaleString("en");
}

// Menampilkan nilai input di layar kalkulator
function printInput(num) {
  if (num === "-") {
    document.getElementById("input-value").innerText = num;
  } else {
    document.getElementById("input-value").innerText = getFormattedNumber(num);
  }
}

// Menampilkan riwayat di layar kalkulator
function printHistory(num) {
  document.getElementById("history-value").innerText = num;
}

// Mendapatkan elemen tombol operator dan menambahkan event listener
let operators = document.getElementsByClassName("operator");
for (let operator of operators) {
  operator.addEventListener("click", function () {
    if (this.id == "clear") {
      document.getElementById("input-value").innerText = "";
      document.getElementById("history-value").innerText = "";
      console.log("clear");
    } else if (this.id == "backspace") {
      let input = getInput();
      if (input) {
        input = input.substr(0, input.length - 1);
        printInput(input);
      }
      console.log("backspace");
    } else {
      let input = getInput();
      let history = document.getElementById("history-value").innerText;
      if (input !== "" || history !== "") {
        input = reverseNumberFormat(input);
        history += input + " " + this.id + " ";
        if (this.id === "=") {
          try {
            let result = eval(history.replace(/[^0-9/*+\-%.]/g, ""));
            printInput(result);
            printHistory("");
          } catch (error) {
            printInput("Error");
            printHistory("");
          }
        } else {
          printHistory(history);
          printInput("");
        }
      }
      console.log(this.id);
    }
  });
}

// Mendapatkan elemen tombol angka dan menambahkan event listener
let numbers = document.getElementsByClassName("number");
for (let number of numbers) {
  number.addEventListener("click", function () {
    try {
      let input = getInput();
      let numberInput = reverseNumberFormat(input);
      if (!isNaN(numberInput)) {
        numberInput += number.innerText;
        printInput(numberInput);
      }
      console.log(number.innerText);
    } catch (e) {
      console.error(e.message);
    }
  });
}
