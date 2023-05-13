<script>

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default {
    props: {
        datetime: Date
    },
    methods: {
        getDayOfWeek(datetime) {
            return DAYS[datetime.getDay()-1]
        },
        getDateString(datetime) {
            return datetime.getDate().toString().padStart(2, '0') + 
                ' ' + MONTHS[datetime.getMonth()] + ' ' + 
                datetime.getFullYear() ;
        },
        getTimeString(datetime) {
            return datetime.getHours().toString().padStart(2, '0') +
                ':' + datetime.getMinutes().toString().padStart(2,'0') +
                ':' + datetime.getSeconds().toString().padStart(2,'0');
        }
    }
}
</script>

<template>
    <div class="card text-center border-dark">
        <div class="card-header bg-light">
            Date and time
        </div>
        <div class="card-body">
            <h4>{{ getDayOfWeek(datetime) }} {{ getDateString(datetime) }} {{ getTimeString(datetime) }}</h4>
        </div><br>
    </div>
</template>
