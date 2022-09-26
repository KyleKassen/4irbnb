### 4irBnb Store Shape

```js
store = {
  session: {},
  spots: {
    allSpots: {
      [spotId]: {
        spotData,
      },
      order: [],
    },
    singleSpot: {
      spotData,
      SpotImages: [imagesData],
      Owner: {
        ownerData,
      },
    },
  },
  reviews: {
    spot: {
      [reviewId]: {
        reviewData,
        User: {
          userData,
        },
        ReviewImages: [imagesData],
      }
    },
    user: {
      [reviewId]: {
        reviewData,
        User: {
          userData,
        },
        Spot: {
          spotData,
        },
        ReviewImages: [imagesData],
      }
    },
  }}
  ```
