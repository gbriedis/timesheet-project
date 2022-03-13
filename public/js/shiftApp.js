let addShiftApp = new Vue ({
    el: '#addShiftApp',

    // variables
    data : {
        shiftData: {
            date: 0,
            shiftNumber: "",
            hours: "",
            crewChief_bonus: false,
            nightShift_bonus: false,
            outOfBounds_bonus: false
        },
    },
    
    // functions
    methods: {
        submitShift: function() {
            this.shiftData = {
                'date': this.shiftData.date,
                'shiftNumber': this.shiftData.shiftNumber,
                'hours': this.shiftData.hours,
                'crewChief_bonus': this.shiftData.crewChief_bonus,
                'nightShift_bonus': this.shiftData.nightShift_bonus,
                'outOfBounds_bonus': this.shiftData.outOfBounds_bonus,
            }


            console.log(this.shiftData)

            fetch("http://localhost:3000/collection/shifts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.shiftData),
            })
        }
    },


    computed: {

    }
})