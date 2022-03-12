let app = new Vue ({
    el: '#app',

    // variables
    data : {
        shifts: shift,
        payslip: 0,
        totalWorkedHours: 0
    },
    
    // functions
    methods: {
        calculateSum: function() {
            this.shifts.forEach(e => {
                this.payslip = this.payslip + e.shiftSum 
                this.totalWorkedHours = this.totalWorkedHours + e.hours
            });
        },
        addNewShift: function() {
            
        }

    },

    beforeMount(){
        this.calculateSum()
    },


    computed: {


        // calculate the total number of hours worked with additional bonuses of crew chief, night shift and out of bounds 
        // calculateTotalHours: function() {
        //     let sum = 0;
        //     this.shifts.forEach(e => {
        //         if (e.bonus_crewChief == true) {
        //             sum += 10
        //         }
        //         if (e.bonus_nightShift == true) {
        //             sum += 15
        //         }
        //         if (e.bonus_outOfBounds == true) {
        //             sum += 10
        //         }
        //         sum = sum + (e.hours * this.hourlyRate);
        //         this.shifts.shiftSum = sum
        //         sum = 0;
        //     });
        // }
    }
})