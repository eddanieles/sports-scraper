<template>
  <div class="about">
    <h1>This is an about page</h1>
    <b-tabs 
      active-nav-item-class="font-weight-bold text-uppercase text-danger"
      active-tab-class="font-weight-bold text-success"
      content-class="mt-3"
      vertical>
      <b-tab title="First" active><p>I'm the first tab</p></b-tab>
      <b-tab title="Second">
        <div class="h-96 bg-purple-100 flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-10 w-10 text-black animate-spin">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
        </div>
      </b-tab>
      <b-tab title="Row and Columns" active>
        <form action="" @submit="createTable()">
          <p>Rows: <input type="text" v-model="rows"></p> 
          <p>Columns: <input type="text" v-model="columns"></p>
          <button>Submit</button>
        </form>

        <v-simple-table>
          <template v-slot:default>
            <!-- <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Calories
                </th>
              </tr>
            </thead> -->
            <tbody>
              <tr
                v-for="row in matrix"
                :key="row+index"
              >
                <td v-for="column in row" :key="column+index">{{column}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </b-tab>
      <b-tab title="Swim" active>
        <div>
          {{times.women}}
        </div>
        <div>
          {{times.men}}
        </div>
        <br>
        <div v-for="time in bestTimes()" :key="time.time">
          <h3>Time: {{time.time}}</h3>
          <p>{{time.strokes}}</p>
          <p v-for="swimmer in time.swimmers" :key="swimmer.time">{{swimmer}}</p>
        </div>
      </b-tab>
      <b-tab title="Walk Matrix" active>
        <div>
          {{walkMatrix()}}
        </div>
      </b-tab>
      <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
    </b-tabs>
    
    <!-- <div class="container" :style="{ background: gradient }">
      <div class="circle" :style="{ background: gradient2 }"></div>
    </div> -->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
        ],
        offset: true,
        xPosition: '',
        yPosition: '',
        rows: 0,
        columns: 0,
        times: {
          women: [
            {
              swimmer: "Torri Huske",
              time: 55.73,
              stroke: "fly"  
            },
            {
              swimmer: "Abbey Weitzeil",
              time: 53.23,
              stroke: "free"  
            },
            {
              swimmer: "Jacoby Lydia",
              time: 64.95,
              stroke: "breast"
            },
            {
              swimmer: "Regan Smith",
              time: 58.05,
              stroke: "back"
            }
          ],
          men: [
            {
              swimmer: "Calaeb Dressel",
              time: 49.45,
              stroke: "fly"
            },
            {
              swimmer: "Calaeb Dressel",
              time: 47.02,
              stroke: "free" 
            },
            {
              swimmer: "Micheal Andrew",
              time: 58.84,
              stroke: "breast"
            },
            {
              swimmer: "Ryan Murphy",
              time: 52.19,
              stroke: "back"
            }
          ]
        }
      }
    },
    computed: {
      gradient() {
        return `linear-gradient(to right, #61b${this.xPosition}, #a34${this.yPosition})`
      },
      gradient2() {
        return `linear-gradient(to right, #a34${this.yPosition}, #61b${this.xPosition})`
      }
    },
    methods: {
      mousemove(event) {
        this.xPosition = event.clientX;
        this.yPosition = event.clientY;
      },
      bestTimes() {
        const wTimes = this.times.women;
        const mTimes = this.times.men;
        let combos = [];
        for(let i=0; i<wTimes.length; i++) {
          
          for(let j=0; j<wTimes.length; j++) {
            let strokes = [];
            if(j>i) {
              
              strokes.push(wTimes[i].stroke)
              strokes.push(wTimes[j].stroke)
              
              let time = wTimes[i].time + wTimes[j].time
              let swimmers = [wTimes[i], wTimes[j]]
              combos.push({time, strokes, swimmers})
            }
          }
        }

        for(let k=0; k<combos.length; k++) {
          for (let m=0; m<mTimes.length; m++) {
            if(!combos[k].strokes.includes(mTimes[m].stroke)) {
                combos[k].time += mTimes[m].time
                combos[k].strokes.push(mTimes[m].stroke)
                combos[k].swimmers.push(mTimes[m])
            }           
          }
        }

        return combos.sort((a,b) => a.time - b.time);
      },
      createTable() {
        const that = this;
        for (let rowIndex = 0; rowIndex < that.rows; rowIndex++) {
          let currentRow = []

          for (let columnIndex = 0; columnIndex < that.columns; columnIndex++) {

            if (columnIndex == 0) {
              // calculate values for first row
              currentRow.push(rowIndex + 1);
            } else if (rowIndex == 0) {
              // calculate columns for the first row
              if (columnIndex % 2 == 0) {
                currentRow.push(that.rows * columnIndex + 1)
              } else {
                currentRow.push(that.rows * (columnIndex + 1))
              }
            } else {
              // calculate rest of the cells
              if (columnIndex % 2 == 0) {
                currentRow.push(that.matrix[rowIndex - 1][columnIndex] + 1)
              } else {
                currentRow.push(that.matrix[rowIndex - 1][columnIndex] - 1)
              }
            }
            
          }
          that.matrix.push(currentRow)
        }
      },
      walkMatrix() {
        const matrix = [
          [0, 1, 2, 3],
          [11, 12, 13, 4],
          [10, 15, 14, 5],
          [9, 8, 7, 6],
        ];

        const result = [];
        const rowCount = matrix.length;
        const columnCount = matrix[0].length;
        let startRow = 0;
        let endRow = rowCount - 1;
        let startColumn = 0;
        let endColumn = columnCount - 1;

        while(endRow >= startRow && endColumn >= startColumn) {
           for (let column = startColumn; column <= endColumn; column++) {
              // Add the item to result in order
              result.push(matrix[startRow][column]);
            }

            startRow++

            for (let row=startRow; row <= endRow; row++) {
              result.push(matrix[row][endColumn])
            }

            endColumn--

            if (endRow >= startRow) {
              for (let column = endColumn; column >= startColumn; column--) {
                result.push(matrix[endRow][column])
              }
            }
            
            endRow--

            if (endColumn >= startColumn) {
              for (let row=endRow; row >= startRow; row--)
              result.push(matrix[row][startColumn])
            }

            startColumn++

        }

        return result

        // (0, 0)
        // (0, 1)
        // (0, 2)
        // (0, 3)
        // // startRow++
        // (1, 3)
        // (2, 3)
        // (3, 3)
        // // endColumn--
        // (3, 2)
        // (3, 1)
        // (3, 0)
        // // endRow--
        // (2, 0)
        // (1, 0)

        // (1, 1)
        // (1, 2)

        // (2, 2)
        // (2, 1)
      }
    },
    mounted() {
      window.addEventListener('mousemove', this.mousemove)
    }
  }
</script>

<style scoped>
.container {
  width: 50em;
  height: 50em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  width: 20em;
  height: 20em;
  /* background: linear-gradient(to right, #a345bb, #61b4d4); */
  border-radius: 100%;
}
</style>