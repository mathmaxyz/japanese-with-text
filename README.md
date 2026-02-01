# Language Learning App

A language learning web app for learning and practicing Japanese with text, built with python and nextjs.

Currently in progress.

# The Vision

When I set out to learn Japanese in around 2014, I found myself in an online Japanese language learning community that was tightly in communion with the open source community. Thanks to the people on the many forums at the time (rip the rtk forum) I was introduced to github for the first time and used many open source language learning software tools in my journey.

This is a love letter to that scene.

# Progress pics

<img width="832" height="794" alt="Screenshot 2025-10-24 184137" src="https://github.com/user-attachments/assets/20ac40e3-891f-4735-b34f-2b0a8ef74bf7" />
<img width="992" height="682" alt="Screenshot 2025-10-31 205926" src="https://github.com/user-attachments/assets/7dd83fdf-36cf-425b-a1f8-27a6e5795b97" />


# Feature progress

- [x] [Custom Japanese-English dictionary psql database](https://github.com/helboi4/japanese-dict-db) with indexing for kanji and kana words for quick lookup
- [x] API endpoint that parses large blocks of Japanese text into individual words and sends back json containing each word and its possible definitions from the db
- [x] ~~[ML model made with TensorFlow](https://github.com/helboi4/tensorflow-translation-model/tree/main) that understands how to translate Japanese into English~~ (This had to be replaced with meta nllb because of superior training
- [x] API endpoint that calls the model and retruns English text
- [x] Frontend textbox form that calls the above two endpoints on submit and displays the data
- [x] Frontend interactive display of the original Japanese text that shows definitions on click of the word, side by side with english translation
- [ ] UI and UX optimisation
- [ ] API endpoint that takes a list of saved words and creates an anki deck from them and download button on frontend
- [ ] Login functionality (user db, endpoints, UI)
- [ ] Functionality to keep saved words for later
- [ ] Ensure that words can be grouped with example sentences they came from
- [ ] Proprietary SRS algorithm that saves users progress to the db
- [ ] Flashcard UI on new frontend page
- [ ] Implementation of smart flashcard ordering a la [morphman](https://github.com/kaegi/MorphMan)
