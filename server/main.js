import { Meteor } from 'meteor/meteor'
import { loadInitialData } from '../imports/infra/initial-data'

function insertLink({ title, url }) {
  LinksCollection.insert({ title, url, createdAt: new Date() })
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  loadInitialData()
})
