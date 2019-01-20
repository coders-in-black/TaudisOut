<template>
  <v-ons-page shown>
    <v-ons-list>

      <v-ons-list-header>Démarche</v-ons-list-header>
      <v-ons-list-item expandable :expanded.sync="isExpanded">
        Tap to expand
        <div class="expandable-content">
          Expandable content
        </div>
      </v-ons-list-item>

      <v-ons-list-header>Contacts</v-ons-list-header>
      <v-ons-list-item v-for="(contact, idx) in contacts" :key="idx" expandable :expanded.sync="contact.expanded">
        {{contact.name}}
        <div class="expandable-content">
          <div v-if="contact.url"><v-ons-icon icon="link"></v-ons-icon>
            <a :href="contact.url" target="_blank">{{contact.url}}</a>
          </div>
          <div v-if="contact.address"><v-ons-icon icon="map-pin"></v-ons-icon> {{contact.address}}</div>
          <div v-if="contact.phone"><v-ons-icon icon="phone"></v-ons-icon>
            <a :href="'tel:'+contact.phone">{{contact.phone}}</a>
          </div>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>

import contacts from '../data/contacts'

export default {
  data() {
    contacts.forEach(contact => contact.expanded = false)
    return {
      contacts,
      isExpanded: false
    }
  }
}
</script>
