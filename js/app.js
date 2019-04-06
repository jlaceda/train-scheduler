/// <reference path="jquery.js"/>
/// <reference path="firebase-app.js"/>
/// <reference path="firebase-database.js"/>
/// <reference path="moment.js"/>

// Initialize Firebase
const config = {
	apiKey: "AIzaSyCmoEjZSolqq7cct3T1_E6k1YA5YoTqoV0",
	authDomain: "trains-ddf4e.firebaseapp.com",
	databaseURL: "https://trains-ddf4e.firebaseio.com",
	projectId: "trains-ddf4e",
	storageBucket: "trains-ddf4e.appspot.com",
	messagingSenderId: "547577775317"
};
firebase.initializeApp(config);

let databaseRef = firebase.database().ref();

const scheduleTemplate = ({trainName, destination, frequency, nextArrival, minutesAway}) => `
<td>${trainName}</td>
<td>${destination}</td>
<td>${frequency}</td>
<td>${nextArrival}</td>
<td>${minutesAway}</td>
`;

// on document ready
$(()=>{

	// for every entry in db
	databaseRef.on("child_added", (childSnapshot) =>
	{
		var schedule = childSnapshot.val();
		//do time calculations
		let nextArrival = null;
		let minutesAway = null;

		// find the first train today time
		let todayAtMidnight = moment().startOf('day');
		let firstTrainTimeDuration = moment.duration(schedule.firstTrainTime);
		let firstTrainToday = todayAtMidnight.add(firstTrainTimeDuration);

		// if the first train hasn't departed yet, use that time for cals
		if (moment() < firstTrainToday)
		{
			nextArrival = firstTrainToday.format("HH:mm");
			minutesAway = firstTrainToday.diff(moment(), 'minutes');
		}
		// if the first train has departed today use the formula:
		// frequencyInMinutes - ( (now - firstTrainToday) % frequencyInMinutes )
		// thanks greg!
		else
		{
			let diffInMins = moment().diff(firstTrainToday, 'minutes');
			let frequencyInMinutes = parseInt(schedule.frequency)
			minutesAway = frequencyInMinutes - (diffInMins % frequencyInMinutes);
			nextArrival = moment().add(minutesAway, 'minutes').format("HH:mm");
		}

		// put data in the object
		schedule.minutesAway = minutesAway;
		schedule.nextArrival = nextArrival;

		// make a new table entry
		let scheduleTr = $("<tr>").html([schedule].map(scheduleTemplate).join(''));
		$("#schedules").append(scheduleTr);
	});

	$("#submitButton").click((event) =>
	{
		// don't refresh the page
		event.preventDefault();

		// get values from inputs
		const trainName = $("#trainName-input").val().trim();
		const destination = $("#destination-input").val().trim();
		const firstTrainTime = $("#firstTrainTime-input").val().trim();
		const frequency = $("#frequency-input").val().trim();

		// push values into the db
		databaseRef.push(
		{
			trainName: trainName,
			destination: destination,
			firstTrainTime: firstTrainTime,
			frequency: frequency
		});

		// clear inputs
		$("#trainName-input").val('');
		$("#destination-input").val('');
		$("#firstTrainTime-input").val('');
		$("#frequency-input").val('');
	});

});