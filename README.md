This game has no formal name yet, but it's called typefall for fun right now.  Words fall from the top to the bottom of the screen.  For every word you successfully type, the next word falls faster!

To set up for local development, you must have Node (version 7 or greater) and postgres installed.

If this is your first time starting the app, you will need a .env file and the environmental config values (contact project owner).  To make set up as easy as possible, pull the code into your local machine and

1) pass a force sync option into the initialization function in server.js.

```
models.sequelize.sync({force: true}).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
```

Make sure to only do that the first time, and remove the force option after that.  This solution isn't ideal, but the app currently has no data in the database so it won't be harmful at this current stage.

2) `npm install`

3) `npm start`
