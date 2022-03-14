let app = new Vue ({
    el: '#app',

    // variables
    data : {
        crewChief_icon: "../img/crewChief-icon.png",
        nightShift_icon: "../img/nightShift-icon.png",
        outOfBounds_icon: "../img/outOfBounds-icon.png",
        shifts: [],
        payslip: 0,
        totalWorkedHours: 0,
        totalCrewChiefJobs: 0,
        totalNightShiftJobs: 0,
        totalOutOfBoundsJobs: 0,
        hourlyRate: 12.5,
        crewChief_rate: 10,
        nightShift_rate: 15,
        outOfBounds_rate: 10,
        editShift: false,
        shiftDetails: {
            date: 0,
            shiftNumber: 0,
            hours: 0,
        }
    },
    
    // functions
    methods: {
        // fetch all shifts
        fetchShifts() {
            fetch("https://timesheet-project.herokuapp.com/collection/shifts").then((response) => {
                response.json().then((data) => {
                    //calculate the total number of hours worked with additional bonuses of crew chief, night shift and out of bounds 
                    let sum = 0;

                    data.forEach(e => {
                        let shift = {
                            date: '',
                            hours: 0,
                            shiftNumber: "",
                            crewChief_bonus: 0,
                            nightShift_bonus: 0,
                            outOfBounds_bonus: 0, 
                            shiftSum: 0          
                        }
                        
                        if(e.crewChief_bonus == true) { 
                            sum = + this.crewChief_rate 
                            shift.crewChief_bonus = + 10
                            this.totalCrewChiefJobs++
                        }
                        if(e.nightShift_bonus == true) { 
                            sum = + this.nightShift_rate
                            shift.nightShift_bonus = + 15
                            this.totalNightShiftJobs++
                        }
                        if(e.outOfBounds_bonus == true ) { 
                            sum = + this.outOfBounds_rate 
                            shift.outOfBounds_bonus = + 18
                            this.totalOutOfBoundsJobs++ 
                        }
                        if (e.crewChief_bonus == false) { shift.crewChief_bonus == 0 }
                        if (e.nightShift_bonus == false) { shift.nightShift_bonus == 0 }
                        if (e.outOfBounds_bonus == false) { shift.outOfBounds_bonus == 0 }

                        shift.shiftSum = this.hourlyRate * e.hours + sum
                        this.totalWorkedHours = this.totalWorkedHours + e.hours
                        this.payslip = this.payslip + shift.shiftSum 

                        shift.date = e.date
                        shift.hours = e.hours
                        shift.shiftNumber = e.shiftNumber

                        this.shifts.push(shift)
                    });
                });
            })
        },
        
        editDetails: function(jobDetails) {
            this.shiftDetails.date = jobDetails.date
            this.shiftDetails.shiftNumber = jobDetails.shiftNumber
            this.shiftDetails.hours = jobDetails.hours
        },
         
        // gets current date (year, month, day)
        currentDate: function() {
            const current = new Date();
            const date = current.getDate()+' / '+(current.getMonth()+1)+' / '+current.getFullYear()
            return date
        }

    },

    beforeMount(){
        this.fetchShifts()
        this.currentDate()
    },
    
    computed: {

    }
})