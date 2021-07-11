writeCode

Create an event management website using express & mongoDB where users visiting the site can

1. Add Events
2. View list of all events
3. Add remarks to each events listed
4. Delete events
5. Like events/remarks added by other users
6. Filter events based on category

7. Each events can have fields like:-

- title
- summary(brief explanation of events)
- host(could be a person or an organization)
- start_date
- end_date
- event_category like programming, sports, trekking
- there can be multiple categories for a single event
- location
- likes(default to 0)
- timestamps
- multiple remarks made on that event (ONE - MANY assocs)

8. Each remark can have fields

- title
- author
- timestamps
- likes(default -> 0)
- will be associated to one of the events(use ONE-MANY association)

9. Templates available on the website will be -

- Each page should have a header & footer

- Home page

  - Introduction & details about the website(put whatever you deem appropriate )

- Events page

  - list all the events
  - should contain a side bar listing all categories
  - a filter where user can filter events based on
    - category
    - latest/oldest based on start_date of event
    - location

- Event details page(when I click on event in list page)
  - list all details of the event
  - implement likes for events as well as categories
  - once like button is clicked, it should increment likes
  - implement edit/delete events
  - display all categories present for that event, when clicked, should take to list of events based on category page
  - all the remarks made on that event
  - implement edit/delete for each remarks available for apecific event

##### Note:-

1. Choose your own design & style it properly so that it can be deployed at a later period of time

2. Use ONE - MANY association to assicoate events with their remarks

3. Cross reference events and their remarks

4. Use mongoose populate method to populate remarks on the event details page
