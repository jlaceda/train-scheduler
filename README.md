# train-scheduler
UW Coding Bootcamp Homework - Train Scheduler
## Spec
* When adding trains, administrators should be able to submit the following:
	* Train Name
	* Destination 
	* First Train Time -- in military time
	* Frequency -- in minutes
* Code this app to calculate when the next train will arrive; this should be relative to the current time.
* Users from many different machines must be able to view same train times.
* Styling and theme are completely up to you. Get Creative!
---
* Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attempt this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).
* Try adding `update` and `remove` buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).
* As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.
## Plan
- [X] basic layout with bootstrap
- [X] make firebase rtdb
- [X] add click handler to submit button to make a record in firebase
- [X] use firebase event child_added to add schedules on table
- [X] add calculations for when the next train will arrive
- [ ] add an auto update times feature
- [ ] able to delete a schedule from ui
- [ ] able to update a schedule from ui
- [ ] firebase auth
