class Seat {
    #isAvailable
    constructor(position) {
      this.#isAvailable = true;
      this.position = position;
    }
  
    reserve() {
      this.#isAvailable = false;
    }
  
    isAvailable() {
      return this.#isAvailable;
    }
  
    toString() {
      return this.#isAvailable ? `${this.position} (O)` : `${this.position}(X)`;
    }
  }   
  
  class Cinema {
    constructor(columns, rows) {
      this.columns = columns;
      this.rows = rows;
      this.seats = [];
      const alphabet = "ABCDE";
  
      for(let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < columns; j++) {
            const position = `${alphabet[i]}${j + 1}`;
          row.push(new Seat(position));
        }
        this.seats.push(row);
      }
    }
  
    reserve(column, row) {
      if(column >= 0 && column < this.columns && row >= 0 && row < this.rows) {
        const seat = this.seats[row][column];
        if (seat.isAvailable()) {
          seat.reserve();
          console.log(`Asiento ${seat.position} reservado`)
        } else {
          console.log(`El asiento ${seat.position} ya esta reservado`)
        }
      } else {
        console.log(`Coordenadas fuera los limites`)
      }
  
    }
    showCine() {
      for (let row of this.seats) {
        console.log(row.map(seat => seat.toString()).join(' '));
      }
    }
  }
  
  const cine = new Cinema(3, 3);
  cine.showCine()
  cine.reserve(1,2);
  cine.showCine()
  cine.reserve(1,2);