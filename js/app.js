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

// on document ready
$(()=>{

	// for every entry in db
	databaseRef.on("child_added", (childSnapshot) =>
	{
		var schedule = childSnapshot.val();
		console.log(schedule);
		// TODO: do calculations
		// TODO: make a new table entry
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

		// TODO: clear inputs
	});

});