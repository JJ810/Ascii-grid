## Ascii Products Grid



### Available Features
- Ascii Products are displayed on a Table Grid.
- Users can sort products "size", "id" and "price" in ascending order. 
- Each product has:
    - a "size" column, which is the font-size (in pixels). Which should display the faces in their correct size, to give customers a realistic impression of what they're buying.
    - a "price" column, in cents. Which should be formatted as dollars like `$3.51`.
    - a "date" field, which is the date the product was added to the catalog. Dates should be displayed in relative time (eg. "3 days ago") unless they are older than 1 week, in which case the full date should be displayed. 
- The products automatically gets updated as you scroll down
- A animated Loader is added as while users wait for data to load.
- Pre-emptively fetch the next batch of results in advance, making use of idle-time.  But they still should not be displayed until the user has scrolled to the bottom of the product grid.
- When the user reaches the end and there are no more products to display, show the message "~ end of catalogue ~".
- After every 20 products we insert an advertisement from one of our sponsors. Using the same markup as the advertisement in the header shown in `public/index/html`, but making sure the `?r` query param is randomly generated each time an ad is displayed.
- Ads are randomly selected, but a user can never see the same ad twice in a row.

### Launch App
- Run  `npm install` 
- Run `npm start` to see the app at `http://localhost:3000`

### Libraries/Frameworks
- React
- WebPack
- Babel