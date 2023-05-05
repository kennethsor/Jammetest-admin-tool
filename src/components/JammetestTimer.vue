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
    <div class="card">
        <div class="card-header">
            Date and time
        </div>
        <div class="card-body">
            <h4>{{ getDayOfWeek(datetime) }}</h4>
            <h4>{{ getDateString(datetime) }}</h4>
            <h5>{{ getTimeString(datetime) }}</h5>
        </div><br>
    </div>
</template>
